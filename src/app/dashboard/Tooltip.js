"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({ text, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <div
        className="inline-block"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </div>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="absolute left-1/2 mx-8 my-2  top-0 px-2 py-1 bg-[#7EA8EB] text-white text-sm rounded-md shadow-m w-auto"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
