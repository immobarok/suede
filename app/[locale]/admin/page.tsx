import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Manage listings, users, reviews, and settings in the SUEDE admin dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

const page = () => {
  return <div>page</div>;
};

export default page;
