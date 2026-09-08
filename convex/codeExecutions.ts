import { mutate } from "swr";
import { mutation } from "./_generated/server";
import { ConvexError,v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const saveExecution=mutation(
    {
        args:{
        language:v.string(),
        output:v.optional(v.string()),
        error:v.optional(v.string()),
        },
        handler:async (ctx  args)=>{
            const identity=await ctx.auth.getUserIdentity()
            if(!identity) throw new ConvexError("not authenicated");

            const user=await ctx.db.query("users").withIndex("by_user_id").filter((q)=>q.eq(q.field("userId"),identity.subject))
            .first();
         if (!user?.isPro && args.language !== "javascript") {
      throw new ConvexError("Pro subscription required to use this language");
    }

    await ctx.db.insert("codeExecutions", {
      ...args,
      userId: identity.subject,
    });
  },
});
