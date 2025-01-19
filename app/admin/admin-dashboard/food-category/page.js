"use client";
import { Modal, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd } from "react-icons/md";

const Foodcategory = () => {
  const [show, setShow] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const restaurantId = "2"; // Hardcoded for now, can be dynamic later

  const handleSave = () => {
    if (inputCategory.trim()) {
      const newCategory = {
        name: inputCategory.trim(),
        restaurantId :categories.length+1,
      };

      setCategories([...categories, newCategory]); // Add the new category to the list
      setInputCategory(""); // Clear input field
      setShow(false); // Close the modal
    } else {
      toast.error("Category name cannot be empty."); // Handle empty input
    }
  };

  return (
    <>
      <div className="bg-black flex flex-col w-full min-h-screen">
        <Toaster />
        <div className="flex flex-col w-full p-5">
          <div className="flex flex-row justify-between p-2 items-center w-full">
            <div className="text-3xl text-white">Categories</div>
            <div>
              <Tooltip
                onClick={() => setShow(!show)}
                className="cursor-pointer p-2 bg-white rounded-full"
                arrow
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [4, -14],
                        },
                      },
                    ],
                  },
                }}
                title="Add Category"
              >
                <div className="flex flex-row gap-1 items-center">
                  <MdAdd size={28} className="text-black font-semibold" />
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
        {/* Modal */}
        {show && (
          <Modal  open={show}
          onClose={() => setShow(false)} className="flex flex-row justify-center items-center  backdrop-blur-sm w-full">
            <div className="bg-gray-400 w-[30%] p-5 rounded-md  gap-5 flex flex-col justify-center items-start">
              <div className="w-full text-center text-xl">Create Category</div>
              <div className="w-full">
                <TextField
                  value={inputCategory}
                  onChange={(e) => setInputCategory(e.target.value)}
                  label="Enter Category"
                  variant="standard"
                  className="w-full"
                />
              </div>
              <div className="flex flex-row gap-4 w-full mt-5 justify-around">
                <button
                  onClick={() => setShow(false)}
                  className="px-4 py-1 bg-red-500 text-white rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Display Saved Categories */}
        <div className="m-5 text-white bg-gray-800 w-[98%] rounded-md">
          <div className="w-full flex flex-row p-2 ">
          <div className="w-[25%]"><strong className="text-xl">ID</strong></div>
          <div className="w-[75%]"><strong className="text-xl">Category Name</strong></div>
          </div>
          {categories.length > 0 ? (
            <div className="flex flex-col p-2">
              {categories.map((category, index) => (
                 <div key={index} className="w-full flex flex-row hover:cursor-pointer hover:bg-gray-300 hover:text-black hover:transition-all ease-in-out rounded-md p-2 ">
                 <div className="w-[25%]">{category.restaurantId}</div>
                 <div className="w-[75%]">{category.name}</div>
                 </div>
                
              ))}
            </div>
          ) : (
            <div className="w-full text-center mt-5 p-5">No categories added yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Foodcategory;
