"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function Notifications() {
  const channelRef = useRef<any>(null);

  useEffect(() => {
    const supabase = createClient();

    console.log("Setting up notifications channel...");

    const notificationsChannel = supabase
      .channel("notifications")
      .on("broadcast", { event: "notification" }, ({ payload }) => {
        console.log("Received notification:", payload);
        toast(payload.message || "New notification");
      })
      .subscribe((status) => {
        console.log("Channel subscription status:", status);
        if (status === "SUBSCRIBED") {
          console.log("Successfully subscribed to notifications channel");
        } else if (status === "CLOSED") {
          console.log("Channel closed");
        } else if (status === "CHANNEL_ERROR") {
          console.error("Channel error");
        }
      });

    channelRef.current = notificationsChannel;

    return () => {
      console.log("Cleaning up notifications channel");
      supabase.removeChannel(notificationsChannel);
    };
  }, []);

  const sendTestNotification = async () => {
    console.log("Attempting to send test notification...");
    if (!channelRef.current) {
      console.error("Channel not available");
      toast.error("Channel not ready yet");
      return;
    }

    try {
      console.log("Sending broadcast to channel...");
      const result = await channelRef.current.send({
        type: "broadcast",
        event: "notification",
        payload: {
          message:
            "Test notification from frontend at " + new Date().toISOString(),
        },
      });
      console.log("Broadcast result:", result);
      toast.success("Test notification sent!");
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <Button onClick={sendTestNotification} variant="outline" size="sm">
        Test Notification
      </Button>
    </div>
  );
}
