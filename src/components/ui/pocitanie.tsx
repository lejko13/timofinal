import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  text: string;
  maxx: number;
  specialZnak?: string | null;
  index: number;
};

const Tusucisla = ({ text, maxx, specialZnak,index }: Props) => {
  const [cislo, setCislo] = useState<number>(0);
  const started = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.6,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) return;
    if (started.current) return;

    started.current = true;

    const duration = 3000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      const value = Math.floor(progress * maxx);
      setCislo(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, maxx]);

  return (
    <div
      ref={ref}
      className=" text-foreground w-full h-fit flex flex-col gap-3 lg:gap-12 leading-none items-start pb-5"
    >
        <div className = {"border-b-1 w-full pb-3"}>

      <span className="text-[40px] md:text-[50px] lg:text-[70px] font-medium">
        {cislo}
        {specialZnak}
      </span>

      <div className="w-full bg-foreground h-[1px] mt-4 hsl(var(--border))"></div>
        </div>

      <span className = "text-muted-foreground text-sm leading-relaxed max-w-md">
        {text}
      </span>
    </div>
  );
};

export default Tusucisla;


//  <div
//                 key={i}
//                 className={`py-7 ${i < 3 ? "sm:border-r border-white/15" : ""} ${i > 0 ? "sm:pl-10" : ""} ${i < stats.length - 1 ? "pr-6" : ""}`}>
                
//                   <p
//                   className="text-4xl md:text-5xl font-normal text-white mb-3"
//                   style={{ letterSpacing: "-0.01em" }}>
                  
//                     {stat.value}
//                   </p>
//                   <p
//                   className="text-xs leading-snug font-light max-w-[180px]"
//                   style={{ color: "rgba(255,255,255,0.72)" }}>
                  
//                     {tr(stat.key)}
//                   </p>
//                 </div>