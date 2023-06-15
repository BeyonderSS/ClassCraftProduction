"use client";
import { AnimatePresence, motion, useCycle } from "framer-motion";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import ProfileDropdown from "../ProfileDropdown";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const { data: session } = useSession();
  const role = "Admin";
  const currentPath = usePathname();
  console.log(currentPath);
  return (
    <nav>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            key="sidebar"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed left-0 z-50 md:hidden "
          >
            <SideBar role={role} />
          </motion.section>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {session && (
          <motion.section
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 1 }}
            className="hidden fixed left-0 z-50 md:block"
          >
            <SideBar role={role} />
          </motion.section>
        )}
      </AnimatePresence>
      {currentPath != "/dashboard" && (
        <nav className="fixed top-0 md:pl-24 w-full py-6 backdrop-blur-sm">
          <AnimatePresence>
            {session && (
              <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between items-center mx-10"
              >
                {isOpen ? (
                  <button onClick={() => toggleOpen()} className="  md:hidden">
                    <RxCross2 className=" text-gray-600 text-2xl" />
                  </button>
                ) : (
                  <button className=" md:hidden" onClick={() => toggleOpen()}>
                    <HiOutlineMenuAlt2 className=" text-gray-600 text-3xl" />
                  </button>
                )}
                <h1 className="hidden md:block text-3xl font-normal text-gray-800">
                  Welcome, {session?.user?.name.split(" ")[0]}!
                </h1>

                <h1 className="text-2xl font-semibold text-gray-900 md:hidden">
                  ClassCraft
                </h1>
                <div>
                  <ProfileDropdown user={session?.user} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      )}
    </nav>
  );
};

export default Header;
