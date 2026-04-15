import type { Metadata } from "next";
import InquiryForm from "./_components/inquiry-form";

export const metadata: Metadata = {
  title: "Submit an Inquiry | SUEDE",
  description:
    "Looking for fit intel before you buy? Post a request and get notified when someone reviews the item in your size.",
};

export default function InquiryPage() {
  return <InquiryForm />;
}
