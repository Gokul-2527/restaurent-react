"use client"
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { InputAdornment, TextField } from "@mui/material";
import { IoClose, IoSearch } from "react-icons/io5";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));



const homepagecards = [
  { 
    id: "1", 
    label: "img-1", 
    img: require("../assests/img-1.jpg"), 
    description: "Delicious South Indian Meals, a perfect blend of flavors with sambar, rasam, poriyal, and freshly steamed rice." 
  },
  { 
    id: "2", 
    label: "img-2", 
    img: require("../assests/img-2.jpg"), 
    description: "Refreshing Beverage, the perfect way to cool off and complement your meal with a burst of freshness." 
  },
  { 
    id: "3", 
    label: "img-3", 
    img: require("../assests/img-3.jpg"), 
    description: "Wholesome meal with chapathi and channa masala, a classic pair that brings both nutrition and taste." 
  },
  { 
    id: "4", 
    label: "img-4", 
    img: require("../assests/img-4.jpg"), 
    description: "Rich and flavorful Mutton Curry, slow-cooked to perfection with aromatic spices for a hearty delight." 
  },
  { 
    id: "5", 
    label: "img-5", 
    img: require("../assests/img-5.jpg"), 
    description: "Buttery naan served with Chicken Ginger Garlic Curry, an irresistible combination of creamy and spicy flavors." 
  },
  { 
    id: "6", 
    label: "img-6", 
    img: require("../assests/img-6.jpg"), 
    description: "Hyderabad Special Chicken Biryani, a fragrant and spiced rice dish that’s a feast for the senses." 
  },
];


const Home = () => {
  const [textinput, settextinput] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % homepagecards.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? homepagecards.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
    <div className="bg-black min-h-screen">
      <div className="bg-[#E81E63] p-3 gap-10 flex flex-row justify-between w-full items-center">
        <div className="text-white font-serif text-xl w-[30%] ">
          ZOSH Foods
        </div>
        <div className=" flex flex-row w-[70%]  gap-20 justify-between px-5">
        <div className="w-[80%]">
        <TextField
        placeholder="Search..."
        variant="outlined"
        size="small"
        value={textinput}
        onChange={(e) => settextinput(e.target.value)}
        className="w-full bg-gray-100 border-gray-100 border-2 rounded-md"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
             {
              textinput.length >= 1 ? ( <IoSearch
                className="text-xl text-black cursor-pointer"
                onClick={() => settextinput("")}
              />) : ( <IoClose
                className="text-xl text-black cursor-pointer"
                onClick={() => settextinput("")}
              />)
             }
            </InputAdornment>
          ),
        }}
      />
        </div>
        <div className="flex w-[20%]  flex-row justify-around items-center">
        <div>
<FaUserCircle className="text-3xl text-white" />

</div>
<div>
<IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon className="text-white text-2xl"/>
        
      </StyledBadge>
    </IconButton></div>
        </div>

        </div>
      </div>
    <div className="relative ">
      {/* Carousel */}
      <div className="relative w-full h-[650px] overflow-hidden ">
        {homepagecards.map((card, index) => (
          <div
            key={card.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
  src={card.img} // Directly reference the path
  alt={card.label}
  width={1920} // Required for next/image
  height={1080} // Required for next/image
  className="w-full h-full object-cover"
/>
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-xl text-white px-4 py-2 rounded-md">
              {card.description}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 transition-all ease-in-out bg-black bg-opacity-60 text-white p-3 px-4 hover:scale-125 rounded-full hover:bg-opacity-80"
      >
        &#8592;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 transition-all ease-in-out bg-black bg-opacity-60 text-white p-3 px-4 hover:scale-125 rounded-full hover:bg-opacity-80"
      >
        &#8594;
      </button>

      {/* Dots for navigation */}
      {/* <div className="flex justify-center space-x-2 mt-4">
        {homepagecards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div> */}
    </div>
    
    </div>
    </>
    
  );
};

export default Home;
