"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { LoaderAnimation } from "@/components/ui/loader-animation";

export default function PageLoaderDemo() {
  const [show, setShow] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => setShow(true), []);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={show ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full justify-center py-10"
    >
      <LoaderAnimation />
    </motion.div>
  );
}
