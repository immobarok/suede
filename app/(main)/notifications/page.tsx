"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { NotificationItem, type NotificationType } from "./_components/notification-item";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  action: string;
  description?: string;
  time: string;
  type: NotificationType;
  isUnread?: boolean;
}

interface NotificationGroup {
  date: string;
  items: Notification[];
}

const mockNotifications: NotificationGroup[] = [
  {
    date: "TODAY",
    items: [
      {
        id: "1",
        user: { name: "Jordan M.", avatar: "https://i.pravatar.cc/150?u=jordan" },
        action: "liked your review",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new like.",
        time: "2 MIN AGO",
        type: "like",
        isUnread: true,
      },
      {
        id: "2",
        user: { name: "Lena R.", avatar: "https://i.pravatar.cc/150?u=lena" },
        action: "started following you",
        description: "Lena shares your Minimalist and Sustainable style tags.",
        time: "1 HOUR AGO",
        type: "follow",
        isUnread: true,
      },
      {
        id: "3",
        user: { name: "Alya R.", avatar: "https://i.pravatar.cc/150?u=alya" },
        action: "commented on your review",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new comment.",
        time: "1 HOUR AGO",
        type: "comment",
        isUnread: true,
      },
      {
        id: "4",
        user: { name: "Alisha R.", avatar: "https://i.pravatar.cc/150?u=alisha" },
        action: "responded to your inquiry",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new comment.",
        time: "1 HOUR AGO",
        type: "inquiry",
        isUnread: true,
      },
    ],
  },
  {
    date: "YESTERDAY",
    items: [
      {
        id: "5",
        user: { name: "Jordan M.", avatar: "https://i.pravatar.cc/150?u=jordan2" },
        action: "liked your review",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new like.",
        time: "2 MIN AGO",
        type: "like",
      },
      {
        id: "6",
        user: { name: "Lena R.", avatar: "https://i.pravatar.cc/150?u=lena2" },
        action: "started following you",
        description: "Lena shares your Minimalist and Sustainable style tags.",
        time: "1 HOUR AGO",
        type: "follow",
      },
      {
        id: "7",
        user: { name: "Alya R.", avatar: "https://i.pravatar.cc/150?u=alya2" },
        action: "commented on your review",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new comment.",
        time: "1 HOUR AGO",
        type: "comment",
      },
      {
        id: "8",
        user: { name: "Alisha R.", avatar: "https://i.pravatar.cc/150?u=alisha2" },
        action: "responded to your inquiry",
        description: "Your review of the Nadi's Wide-Leg Trouser received a new comment.",
        time: "1 HOUR AGO",
        type: "inquiry",
      },
    ],
  },
];

export default function NotificationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F5F5F0]">
      <Image
        src="https://i.ibb.co/nsvQbBSQ/41ddd7debba1acf170f27b180927b8514ffaebd3.jpg"
        alt="Background"
        fill
        className="object-cover opacity-20 grayscale"
        priority
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/40 to-white/10" />

      <div className="relative z-10 container mx-auto px-4 md:px-0 pt-24 pb-20">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-cormorant text-[38px] md:text-[46px] text-black leading-tight">
              Notifications
            </h1>
            <p className="mt-1 text-[14px] text-black/50">
              5 unread notifications
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="h-auto p-0 text-[11px] uppercase tracking-wider text-black/40 hover:text-black hover:bg-transparent transition-colors flex items-center gap-2"
          >
            <Check className="size-3" />
            Mark all read
          </Button>
        </div>

        <div className="space-y-12">
          {mockNotifications.map((group) => (group.items.length > 0 && (
            <section key={group.date} className="space-y-4">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 px-6">
                {group.date}
              </h2>
              <div className="bg-white border border-black/5 shadow-sm overflow-hidden">
                {group.items.map((notification) => (
                  <NotificationItem key={notification.id} {...notification} />
                ))}
              </div>
            </section>
          )))}
        </div>
      </div>
    </main>
  );
}
