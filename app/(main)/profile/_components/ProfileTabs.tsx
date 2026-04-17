"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContents,
  TabsContent,
  TabsHighlight,
  TabsHighlightItem,
} from "@/components/animate-ui/primitives/animate/tabs";
import { LookBookGrid } from "../../the-lookbook/_components/LookbookGrid";
import UserInquiries from "./UserInquiries";


const ProfileTabs = ({
  activeView,
  profile,
}: {
  activeView: string;
  profile: any;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = useCallback(
    (view: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("view", view);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  return (
    <Tabs
      value={activeView}
      onValueChange={handleTabChange}
      className="w-full"
    >

      <div className="relative mt-7.25 mb-6">


        <TabsHighlight
          mode="parent"
          className="absolute inset-1 bg-white z-0"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <TabsList className="relative flex w-full bg-black/5 p-1">


            <TabsHighlightItem value="reviews" className="flex-1">
              <TabsTrigger
                value="reviews"
                className="relative z-10 w-full py-2.5 text-[13px] uppercase tracking-[0.15em] transition-colors data-[state=active]:text-black data-[state=active]:bg-white! text-black/40 hover:text-black/60 font-darker font-medium"
              >
                Reviews
              </TabsTrigger>
            </TabsHighlightItem>
            <TabsHighlightItem value="inquiries" className="flex-1">
              <TabsTrigger
                value="inquiries"
                className="relative z-10 w-full py-2.5 text-[13px] uppercase tracking-[0.15em] transition-colors data-[state=active]:text-black data-[state=active]:bg-white! text-black/40 hover:text-black/60 font-darker font-medium"
              >
                Inquiries
              </TabsTrigger>
            </TabsHighlightItem>
          </TabsList>
        </TabsHighlight>
      </div>

      <div className="mt-8">
        <TabsContents>
          <TabsContent value="reviews">
            <LookBookGrid hideUserStats={true} />
          </TabsContent>



          <TabsContent value="inquiries">
            <UserInquiries profile={profile} />
          </TabsContent>
        </TabsContents>
      </div>
    </Tabs>
  );
};

export default ProfileTabs;

