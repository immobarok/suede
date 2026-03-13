'use client';

import ButtonTextChange from "@/components/ui/button-textchange";
import { useQueryModal } from "@/hooks";

const OpenInquiriesButton = () => {
    const { isOpen, open } = useQueryModal('view', 'open-inquiries');

    return (
        <ButtonTextChange
            text="Open Inquiries"
            isActive={isOpen}
            onClick={open}
            className={`hover:text-primary cursor-pointer transition-colors duration-300 font-medium text-sm flex items-center gap-2 ${isOpen ? 'text-primary' : ''}`}
        />
    );
};

export default OpenInquiriesButton;
