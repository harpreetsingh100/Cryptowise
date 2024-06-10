"use client";

import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div>
        <div className="flex justify-center items-center bg-[#ebebfd] dark:bg-[#191925] rounded-2xl h-10 px-[14px]">
          <FiSun onClick={() => setTheme("light")} className="cursor-pointer" />
        </div>
      </div>
    );

  if (resolvedTheme === "dark") {
    return (
      <div>
        <div className="flex justify-center items-center bg-[#ebebfd] dark:bg-[#191925] rounded-2xl h-10 px-[14px]">
          <FiSun onClick={() => setTheme("light")} className="cursor-pointer" />
        </div>
      </div>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <div className="flex justify-center items-center bg-[#ebebfd] dark:bg-[#191925] rounded-2xl h-10 px-[14px]">
        <FiMoon onClick={() => setTheme("dark")} className="cursor-pointer" />
      </div>
    );
  }
}
