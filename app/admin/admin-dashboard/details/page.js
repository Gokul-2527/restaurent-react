"use client";
import React from "react";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
      ...(theme.palette.mode === "dark" && {
        color: theme.palette.grey[600],
      }),
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
      ...(theme.palette.mode === "dark" && {
        opacity: 0.3,
      }),
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    ...(theme.palette.mode === "dark" && {
      backgroundColor: "#39393D",
    }),
  },
}));

const DetailsPage = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="bg-black min-h-screen flex flex-col w-full">
        <div className="flex flex-col gap-10 justify-center items-center">
          <div className="flex flex-row justify-center gap-10 items-center">
            <div className="text-7xl font-bold text-white  p-5">
              Deva Foods Restaurant
            </div>
            <div className="flex justify-center gap-5 items-center ">
              <IOSSwitch checked={checked} onChange={handleChange} className="text-3xl"/>
              <div className="w-[150px] text-white text-lg">
                {checked ? "OPEN" : "CLOSED"}
              </div>
            </div>
          </div>
          <div className="bg-gray-700 w-[80%] p-5 gap-5 flex flex-col rounded-md">
            <div className="text-3xl text-white">Restaurant</div>
            <div className="flex flex-row w-full gap-5">
              <div className="w-[20%] text-[#DCD6E3] text-lg">Owner</div>
              <div className="w-[80%] text-[#8B98A5] text-lg">Deva Foods</div>
            </div>
            <div className="flex flex-row w-full gap-5">
              <div className="w-[20%] text-[#DCD6E3] text-lg">
                Restaurent Name
              </div>
              <div className="w-[80%] text-[#8B98A5] text-lg">Devaprakash</div>
            </div>
            <div className="flex flex-row w-full gap-5">
              <div className="w-[20%] text-[#DCD6E3] text-lg">Cuisine Type</div>
              <div className="w-[80%] text-[#8B98A5] text-lg">Tamil Nadu</div>
            </div>
            <div className="flex flex-row w-full gap-5">
              <div className="w-[20%] text-[#DCD6E3] text-lg">
                Opening Hours
              </div>
              <div className="w-[80%] text-[#8B98A5] text-lg">
                Mon- Sun : 10:00 AM - 10:00 PM
              </div>
            </div>
            <div className="flex flex-row w-full gap-5">
              <div className="w-[20%] text-[#DCD6E3] text-lg">Status</div>
              <div className="w-[80%] text-[#8B98A5] text-lg">
                <div
                  className={`w-[100px] p-1 text-center rounded-xl ${
                    checked ? "bg-green-500" : "bg-red-500"
                  }  text-white text-lg`}
                >
                  {checked ? "OPEN" : "CLOSED"}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[80%]  gap-5 flex flex-row rounded-md">
            <div className="bg-gray-700 w-[40%] p-5 gap-5 flex flex-col rounded-md">
              <div className="text-3xl text-white">Address</div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">Country</div>
                <div className="w-[70%] text-[#8B98A5] text-lg">India</div>
              </div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">City</div>
                <div className="w-[70%] text-[#8B98A5] text-lg">Coimbatore</div>
              </div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">
                  Postal Code
                </div>
                <div className="w-[70%] text-[#8B98A5] text-lg">638402</div>
              </div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">
                  Street Address
                </div>
                <div className="w-[70%] text-[#8B98A5] text-lg">
                  Saravanapatti, Sathy Main Road, Signal opposite
                </div>
              </div>
            </div>
            <div className="bg-gray-700 w-[60%] p-5 gap-5 flex flex-col rounded-md">
            <div className="text-3xl text-white">Contact</div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">Email</div>
                <div className="w-[70%] text-[#8B98A5] text-lg">devaprakash@gmail.com</div>
              </div>
              <div className="flex flex-row w-full gap-5">
                <div className="w-[30%] text-[#DCD6E3] text-lg">Mobile</div>
                <div className="w-[70%] text-[#8B98A5] text-lg">+919500593141</div>
              </div>
              <div className="flex flex-row w-full gap-5">
      <div className="w-[30%] text-[#DCD6E3] text-lg">Social Media</div>
      <div className="w-[70%] text-[#8B98A5] text-lg flex gap-7">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-pink-600 text-4xl" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-blue-600 text-4xl" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="text-blue-400 text-4xl" />
        </a>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
