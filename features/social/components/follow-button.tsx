"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FollowButton({
  targetId,
  initialFollowing = false,
  small = false
}: {
  targetId: string,
  initialFollowing?: boolean,
  small?: boolean
}) {
  const [following, setFollowing] = useState(initialFollowing);

  const handleFollow = () => {
    // In real app, call /api/proxy/follow
    setFollowing(!following);
  };

  return (
    <Button
      variant={following ? "outline" : "default"}
      size={small ? "sm" : "default"}
      className={`!rounded-2xl font-bold transition-all ${small ? "h-8 px-4 text-[10px]" : "h-11 px-8"} ${following ? "border-primary text-primary hover:bg-primary/5" : "bg-ios-gradient shadow-lg shadow-primary/20"}`}
      onClick={handleFollow}
    >
      {following ? "دنبال می‌کنید" : "دنبال کردن"}
    </Button>
  );
}
