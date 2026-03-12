'use client';

import { ReactNode } from "react";

interface ButtonTextChangeProps {
  text: string;
  className?: string;
  icon?: ReactNode;
}

const ButtonTextChange = ({ text, className, icon }: ButtonTextChangeProps) => {
  return (
    <button className={`group ${className}`}>
      <span className='relative inline-flex overflow-hidden py-1'>
        <div className='translate-y-0 skew-y-0 transition duration-500 group-hover:-translate-y-[175%] group-hover:skew-y-12 flex items-center justify-center gap-2.5'>
          {text}
          {icon}
        </div>
        <div className='absolute top-0 left-0 w-full h-full translate-y-[175%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0 flex items-center justify-center gap-2.5'>
          {text}
          {icon}
        </div>
      </span>
    </button>
  );
};


export default ButtonTextChange;

