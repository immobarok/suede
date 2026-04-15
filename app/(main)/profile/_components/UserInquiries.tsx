"use client";

import { useEffect, useState } from "react";
import { getUserInquiries } from "@/app/actions/inquiry";
import { CommunityQuestionCard } from "../../the-lookbook/_components/CommunityQuestionCard";
import { Loader2 } from "lucide-react";

export default function UserInquiries({ profile }: { profile: any }) {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadInquiries() {
            const result = await getUserInquiries();
            if (result.success && result.inquiries) {
                setInquiries(result.inquiries);
            }
            setIsLoading(false);
        }
        loadInquiries();
    }, []);

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-black/20" />
            </div>
        );
    }

    if (inquiries.length === 0) {
        return (
            <div className="flex h-64 flex-col items-center justify-center text-center">
                <p className="font-cormorant text-2xl text-black/40">No inquiries yet</p>
                <p className="mt-2 text-sm text-black/30">Your submitted inquiries will appear here.</p>
            </div>
        );
    }

    const questionUser = {
        name: profile.displayName || "Anonymous",
        handle: profile.username ? `@${profile.username.replace(/^@/, "")}` : "@user",
        avatar: profile.avatarUrl || "",
        height: profile.heightCm
            ? `${Math.floor(profile.heightCm / 30.48)}'${Math.round((profile.heightCm % 30.48) / 2.54)}"`
            : "—",
        bust: profile.bustCm ? `${profile.bustCm}` : "—",
        waist: profile.waistCm ? `${profile.waistCm}` : "—",
        hips: profile.hipsCm ? `${profile.hipsCm}` : "—",
    };

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {inquiries.map((inquiry, index) => (
                <CommunityQuestionCard
                    key={inquiry.id}
                    index={index}
                    productImage={inquiry.productImageUrl || "https://i.ibb.co/SwyPhMGM/Frame-2087328443.png"}
                    brandName={inquiry.brandName}
                    productName={inquiry.productName}
                    size={inquiry.sizeInterested || "—"}
                    questionUser={questionUser}
                    question={inquiry.specificQuestions}
                    responses={[]} // User's own view doesn't necessarily show all responses in the grid here, or can be fetched
                />
            ))}
        </div>
    );
}
