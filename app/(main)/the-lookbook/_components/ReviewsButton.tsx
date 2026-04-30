'use client';

import ButtonTextChange from "@/components/ui/button-textchange";
import { useQueryModal } from "@/hooks";
import { useSearchParams } from "next/navigation";

const ReviewsButton = () => {
    const searchParams = useSearchParams();
    const { isOpen, open } = useQueryModal('view', 'reviews');
    const isActive = isOpen || !searchParams.get("view");

    return (
        <ButtonTextChange
            text="Reviews"
            isActive={isActive}
            onClick={open}
            className={`hover:text-primary cursor-pointer transition-colors duration-300 font-medium text-sm flex items-center gap-2 ${isActive ? 'text-primary' : ''}`}
        />
    );
};

export default ReviewsButton;
