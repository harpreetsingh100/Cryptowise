import React from "react";
import Link from "next/link";
import Logo from "@/svg/Logo";
import HomeIcon from "@/svg/HomeIcon";
import PortfolioIcon from "@/svg/PortfolioIcon";
const Navbar = () => {
  return (
        <div className="flex justify-between items-center px-20 border-2 border-red-500 h-[10vh] bg-black text-white">
            {/* left div  */}
            <div className="flex gap-6">
                <div><Logo/></div>
                <div>CryptoWise</div>
                <div className="flex gap-4"> 
                    <div className="flex gap-3">  
                        <span><HomeIcon/></span>
                        <Link href='/'>Home</Link>
                    </div>
                    <div className="flex gap-3">
                        <span><PortfolioIcon/></span>
                        <Link href='/portfolio'>Portfolio</Link>
                    </div>
                </div>
            </div>
            {/* // right div */}
            <div className="flex gap-6">
                <div>
                    <input type="text" />
                </div>
                <div>
                    <select className="bg-black">
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                </div>
                <div>
                    <button>Dark/Light</button>
                </div>
            </div>
        </div>
  );
};

export default Navbar;