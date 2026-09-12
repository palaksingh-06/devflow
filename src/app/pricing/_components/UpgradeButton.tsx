
"use client";

import { Zap } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function UpgradeButton() {
  const { user } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const userId = user?.id;

  const params = new URLSearchParams({
    "checkout[email]": email ?? "",
    "checkout[custom][user_id]": userId ?? "",
  });

  const CHECKOUT_URL =
    `https://devflow.lemonsqueezy.com/checkout/buy/3c5df4a6-037b-4841-9955-cacafb21b211?${params.toString()}`;

  return (
    <Link
      href={CHECKOUT_URL}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      Upgrade to Pro
    </Link>
  );
}
