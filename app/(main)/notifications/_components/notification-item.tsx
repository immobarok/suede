"use client";

import { Avatar, AvatarImage, AvatarFallback, AvatarBadge } from "@/components/ui/avatar";
import { Heart, UserPlus, MessageSquare, Mail, ThumbsUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type NotificationType = "like" | "follow" | "comment" | "inquiry";

interface NotificationItemProps {
  user: {
    name: string;
    avatar: string;
    handle?: string;
  };
  action: string;
  description?: string;
  time: string;
  type: NotificationType;
  isUnread?: boolean;
}

const actionIcons = {
  like: <ThumbsUp className="size-2 text-red-500 fill-red-500" />,
  follow: <UserPlus className="size-2 text-blue-500" />,
  comment: <MessageSquare className="size-2 text-green-500 fill-green-500" />,
  inquiry: <Mail className="size-2 text-amber-500" />,
};

const actionBadgeBg = {
  like: "bg-white border-red-100",
  follow: "bg-white border-blue-100",
  comment: "bg-white border-green-100",
  inquiry: "bg-white border-amber-100",
};

export function NotificationItem({
  user,
  action,
  description,
  time,
  type,
  isUnread = false,
}: NotificationItemProps) {
  return (
    <div
      className={cn(
        "group flex items-start gap-4 border-b border-black/5 p-6 transition-colors hover:bg-black/[0.02]",
        isUnread && "bg-black/[0.01]"
      )}
    >
      <div className="relative">
        <Avatar size="lg" className="border border-black/5">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
        <AvatarBadge 
          className={cn(
            "p-1 border border-black/5 shadow-sm translate-x-1 translate-y-1",
            actionBadgeBg[type]
          )}
        >
          {actionIcons[type]}
        </AvatarBadge>
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[14px] text-black">
            <span className="font-bold">{user.name}</span>{" "}
            <span className="text-black/60">{action}</span>
          </p>
          <span className="text-[10px] text-black/40 uppercase tracking-wider">{time}</span>
        </div>
        {description && (
          <p className="text-[12px] text-black/50 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
