import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/clerk-webhook",
  method: "POST",

  handler: httpAction(async (context, request) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

    if (!webhookSecret) {
      throw new Error(
        "Missing CLERK_WEBHOOK_SECRET environment variable"
      );
    }

    // Get Svix headers
    const svix_id = request.headers.get("svix-id");
    const svix_signature = request.headers.get("svix-signature");
    const svix_timestamp = request.headers.get("svix-timestamp");

    if (!svix_id || !svix_signature || !svix_timestamp) {
      return new Response("Error occurred - no Svix headers", {
        status: 400,
      });
    }

    // Get request body
    const payload = await request.json();
    const body = JSON.stringify(payload);

    // Verify webhook
    const wh = new Webhook(webhookSecret);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error("Webhook verification failed:", err);

      return new Response("Invalid signature", {
        status: 400,
      });
    }

    const eventType = evt.type;

    // Handle user.created
    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        first_name,
        last_name,
      } = evt.data;

      const email = email_addresses[0]?.email_address;

      const name = `${first_name || ""} ${last_name || ""}`.trim();

      if (!email) {
        return new Response("Email is missing", {
          status: 400,
        });
      }

      try {
        await context.runMutation(api.users.syncUser, {
          userId: id,
          email,
          name,
        });
      } catch (error) {
        console.error("Error creating user:", error);

        return new Response("Error creating user", {
          status: 500,
        });
      }
    }

    return new Response("Success", {
      status: 200,
    });
  }),
});

export default http;