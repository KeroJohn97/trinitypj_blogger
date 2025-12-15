"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  className?: string
  priority?: boolean // 1. New prop
}

export const RevealOnScroll = ({
  children,
  width = "100%",
  delay = 0,
  className = "",
  priority = false, // Default to false
}: RevealProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      // 2. Logic: If priority is true, animate immediately. If false, wait for scroll.
      whileInView={!priority ? "visible" : undefined}
      animate={priority ? "visible" : undefined}
      viewport={{ once: true, margin: "-75px" }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  )
}
