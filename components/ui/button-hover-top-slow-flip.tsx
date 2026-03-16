'use client';

const ButtonHoverTopSlowFlip = ({text}: {text: string}) => {
  return (
    <>
      <button className='group relative inline-flex h-10 items-center justify-center overflow-hidden font-medium cursor-pointer bg-primary/80 text-white'>
        <div className='inline-flex h-10 translate-y-0 items-center justify-center px-6 bg-linear-to-r dark:from-primary dark:to-primary/80  transition duration-500 group-hover:-translate-y-[150%]'>
          {text}
        </div>
        <div className='absolute inline-flex h-10 w-full translate-y-full items-center justify-center text-neutral-50 transition duration-500 group-hover:translate-y-0'>
          <span className='absolute h-full w-full translate-y-full skew-y-12 scale-y-0 bg-primary dark:bg-primary/80 transition duration-500 group-hover:translate-y-0 group-hover:scale-150'></span>
          <span className='z-10'>{text}</span>
        </div>
      </button> 
    </>
  );
};

export default ButtonHoverTopSlowFlip;
