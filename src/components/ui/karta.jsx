import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({
 i,
  activeCard,
  obrazok,
  cotoje,
  cotoje2,

  podmienka2,
  otovrim,
  zatvorim,
  rok,
  rozhoduje,
  textotom,
  podmienka3,

}) {


  return (
    <motion.div
      onMouseEnter={otovrim}
      onMouseLeave={zatvorim}
    
      // variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full relative"
    >
      <div
        className="w-full h-full absolute inset-x-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--background) / 0.4) 70%, hsl(var(--background) / 0.7) 100%)",
        }}
      />

      <Link
        // to={odkaz}
        className="block relative rounded-xl overflow-hidden"
        style={{ aspectRatio: "4/3" }}
        // onClick={() => setServicesOpen(false)}
      >
        {/* Image */}
        <motion.img
          src={obrazok}
          className="w-full h-full object-cover"
          animate={{
            scale: rozhoduje ? 1.04 : 1,
          }}
          transition={{
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 w-full h-full flex items-end z-20">
          {/*  */}

          {/* Bottom content */}
          <motion.div
          
            animate={{
        
              height: rozhoduje ? "fit-content" : "fit-content",
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full flex flex-col     gap-2"
          >
            <motion.div
             transition={{ duration: 0.3 }}
             className="text-foreground font-semibold tracking-tight flex flex-col  p-4 ">
              <span className="text-2xl  font-bold tracking-tight">{cotoje}</span>
              {podmienka2 === "ano" && (
                <span className="text-foreground  text-[11px] font-semibold tracking-widest uppercase mb-1.5">{rok}</span>
              )}

              <motion.div 
         

            animate={{
        
              height: rozhoduje ? "fit-content" : "0px",
              
                opacity: rozhoduje ? 1 : 0
          
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}

              className="text-muted-foreground text-sm leading-relaxed max-w-md font-normal ">{textotom}</motion.div>


            </motion.div >

          

            {/* <motion.div
              animate={{
                opacity: rozhoduje ? 1 : 0,
                y: rozhoduje ? 0 : 10,
              }}
              transition={{ duration: 0.25 }}
              className="text-white/45 text-xs"
            >
              {malytext}
            </motion.div> */}

          </motion.div>
        </div>

{podmienka3 === "ano" && <div
         className="
         absolute top-3 left-3
         text-xs font-medium text-white/70 bg-black/35 backdrop-blur-sm px-2.5 py-1.5 rounded-full border border-white/10">{cotoje2}</div> }

        


        {/* Arrow */}
        <motion.div
          animate={{
            opacity: rozhoduje ? 1 : 0,
            scale: rozhoduje ? 1 : 0.8,
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3"
        >
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-3.5 h-3.5 text-black" />
          </div>
        </motion.div>

        
      </Link>
    </motion.div>
  );
}