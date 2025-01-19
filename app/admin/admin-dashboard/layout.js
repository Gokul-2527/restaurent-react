"use client";

import { SideNav } from "@/app/src/components/Sidebar/SideNav";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [show, setshow] = useState(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  return (
    <div className={inter.className}>
      <div className="flex flex-row max-w-[100%]">
        <div
          className={`bg-black p-4 rounded-r-md gap-5 flex flex-col border-r-2 border-white min-h-screen ${
            show ? "w-[18%]" : "w-[5%]"
          }`}
        >
          <div className="flex flex-row justify-between items-center">
            <div
              onClick={() => {
                setshow(!show);
              }}
              className="cursor-pointer"
            >
              <IoMenu className="text-xl text-white" />
            </div>
            {show && (
              <div
                onClick={() => router.push("/admin/admin-dashboard")}
                className="text-white cursor-pointer"
              >
                DEVA Foods
              </div>
            )}
          </div>
          {SideNav.map((item) => (
            <div
              onClick={() => {
                if (item.value === "logout") {
                  window.location.href = "/";
                } else {
                  router.push(item.routePath);
                }
              }}
              key={item.value}
              className={`p-2 rounded-md flex flex-row gap-5 cursor-pointer justify-start items-center ${
                pathname === item.routePath ? "bg-red-500 text-white" : "bg-[#222222] text-white"
              } ${
                !show &&
                "hover:scale-125 hover:translate-x-2 transition-all ease-in-out"
              }`}
            >
              <FontAwesomeIcon
                icon={item.icon}
                style={{ marginRight: "8px", color: "#fff" }}
              />
              {show && <div>{item.label}</div>}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200">{children}</div>
      </div>
    </div>
  );
}
