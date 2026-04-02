import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProfile } from "../actions";
import EditProfileClient from "./_components/EditProfileClient";

export const metadata: Metadata = {
  title: "Edit Profile | SUEDE",
  description: "Update your personal information and style preferences.",
};

export default async function EditProfilePage() {
  const profile = await getProfile();

  if (!profile) {
    redirect("/auth/login");
  }

  return <EditProfileClient initialData={profile} />;
}
