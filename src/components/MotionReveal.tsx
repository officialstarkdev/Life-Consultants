import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

export default function MotionReveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){
  const reduce=useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce?false:{opacity:0,y:14}}
      whileInView={reduce?undefined:{opacity:1,y:0}}
      viewport={{once:true,amount:.12}}
      transition={{duration:.42,delay,ease:[.2,.8,.2,1]}}
    >
      {children}
    </motion.div>
  );
}
