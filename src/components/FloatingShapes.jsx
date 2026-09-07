export default function FloatingShapes() {
  return (
    <>
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-primary/20 rounded-full blur-[120px] -z-10 animate-[floaty_9s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 -left-40 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[120px] -z-10 animate-[floaty_11s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-1/2 w-[22rem] h-[22rem] bg-violet/10 rounded-full blur-[110px] -z-10 animate-[floaty_13s_ease-in-out_infinite]" />
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-24px) translateX(12px); }
        }
      `}</style>
    </>
  );
}
