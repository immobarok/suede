import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonTextChangeProps {
  text: string;
  className?: string;
  icon?: ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const ButtonTextChange = ({ text, className, icon, isActive, onClick }: ButtonTextChangeProps) => {
  return (
    <button onClick={onClick} className={`group relative ${className}`}>
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
      {isActive && (
        <motion.div
          layoutId="activeUnderline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30
          }}
        />
      )}
    </button>
  );
};


export default ButtonTextChange;

