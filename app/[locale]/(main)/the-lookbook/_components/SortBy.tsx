'use client';

import * as React from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQueryModal } from '@/hooks';

const SortItem = ({ label, value }: { label: string; value: string }) => {
    const { open } = useQueryModal('sort', value);
    return (
        <DropdownMenuRadioItem value={value} onClick={open}>
            {label}
        </DropdownMenuRadioItem>
    );
};

const SortBy = () => {
    const searchParams = useSearchParams();
    const currentSort = searchParams.get('sort') || 'date_added';

    const sortOptions = [
        { label: 'DATE ADDED (DEFAULT)', value: 'date_added' },
        { label: 'BRAND A → Z', value: 'brand_a_z' },
        { label: 'HIGHEST RATING', value: 'highest_rating' },
        { label: 'LOWEST RATING', value: 'lowest_rating' },
    ];

    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort By';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button 
                  className="hover:text-primary cursor-pointer transition-colors duration-300 font-medium text-sm flex items-center gap-2 outline-none group"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="relative inline-flex overflow-hidden py-1">
                        <div className="translate-y-0 transition duration-500 group-hover:-translate-y-[175%] flex items-center gap-1">
                            Sort By: {currentLabel}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full translate-y-[175%] transition duration-500 group-hover:translate-y-0 flex items-center gap-1">
                            Sort By: {currentLabel}
                            <ChevronDown className="w-3 h-3 opacity-50" />
                        </div>
                    </span>
                    {/* Visual indicator line - matching other buttons */}
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuRadioGroup value={currentSort}>
                    {sortOptions.map((option) => (
                        <SortItem key={option.value} label={option.label} value={option.value} />
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default SortBy;
