"use client";
import { Autocomplete, Modal, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd } from "react-icons/md";

const IngredientsPage = () => {
  const [categoryModal, setCategoryModal] = useState(false);
  const [ingredientsModal, setIngredientsModal] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [inputIngredients, setInputIngredients] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const restaurantId = "2"; // Hardcoded for now, can be dynamic later

  const handleCategorySave = () => {
    if (inputCategory.trim()) {
      const newCategory = {
        name: inputCategory.trim(),
        restaurantId :categories.length+1,
      };

      setCategories([...categories, newCategory]); // Add the new category to the list
      setInputCategory(""); // Clear input field
      setCategoryModal(false); // Close the modal
    } else {
      toast.error("Category name cannot be empty."); // Handle empty input
    }
  };
  const handleIngredientSave = () => {
    if (inputIngredients.trim() && selectedIngredient) {
      const newCategory = {
        name: inputIngredients.trim(),
        restaurantId: ingredients.length + 1,
        ingredientCategory: selectedIngredient.value, // Pass the selected ingredient value
      };
  
      setIngredients([...ingredients, newCategory]); // Add the new category to the list
      setInputIngredients(""); // Clear input field
      setSelectedIngredient(null); // Clear selected ingredient
      setIngredientsModal(false); // Close the modal
    } else {
      toast.error("Ingredient name and category cannot be empty."); // Handle empty input
    }
  };
  
  const IngredientsArray = [
    { label: "Biriyani", value: "biriyani" },
    { label: "Grill Chicken", value: "grill-chicken" },
    { label: "Chicken Rice", value: "chickenrice" },
  ];
  return (
    <>
    <div className="flex flex-row w-full gap-5 p-2 justify-between bg-black">
    <div className="bg-[#0b0b0b] flex flex-col rounded-md w-[65%] min-h-screen">
        <Toaster />
        <div className="flex flex-col w-full p-5">
          <div className="flex flex-row justify-between p-2 items-center w-full">
            <div className="text-3xl text-white">Ingredients</div>
            <div>
              <Tooltip
                onClick={() => setIngredientsModal(!ingredientsModal)}
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
        {ingredientsModal && (
          <Modal  open={ingredientsModal}
          onClose={() => setIngredientsModal(false)} className="flex flex-row justify-center items-center  backdrop-blur-sm w-full">
            <div className="bg-gray-400 w-[30%] p-5 rounded-md  gap-5 flex flex-col justify-center items-start">
              <div className="w-full text-center text-xl">Create Category</div>
              <div className="w-full flex flex-col gap-5">
                <TextField
                  value={inputIngredients}
                  onChange={(e) => setInputIngredients(e.target.value)}
                  label="Enter Category"
                  variant="standard"
                  className="w-full"
                  sx={{
                    input: { color: "black" },
                    label: { color: "black" },
                    "& .MuiInput-underline:before": { borderBottomColor: "black" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "black" },
                    "& .MuiInput-underline:after": { borderBottomColor: "black" },
                  }}
                />
                <Autocomplete
                
  value={selectedIngredient}
  onChange={(event, newValue) => setSelectedIngredient(newValue)}
  options={IngredientsArray}
  getOptionLabel={(option) => option.label}
  renderInput={(params) => (
    <TextField
      {...params}
      
      label="Select Category"
      variant="standard"
      fullWidth
      sx={{
        input: { color: "black" },
        label: { color: "black" },
        "& .MuiInput-underline:before": { borderBottomColor: "black" },
        "& .MuiInput-underline:hover:before": { borderBottomColor: "black" },
        "& .MuiInput-underline:after": { borderBottomColor: "black" },
      }}
    />
  )}
/>

              </div>
              <div className="flex flex-row gap-4 w-full mt-5 justify-around">
                <button
                  onClick={() => setIngredientsModal(false)}
                  className="px-4 py-1 bg-red-500 text-white rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleIngredientSave}
                  className="px-4 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Display Saved Categories */}
        <div className="m-5 text-white bg-gray-700 w-[90%] rounded-md">
          <div className="w-full flex flex-row p-2 ">
          <div className="w-[25%]"><strong className="text-xl">ID</strong></div>
          <div className="w-[25%]"><strong className="text-xl">Name</strong></div>
          <div className="w-[25%]"><strong className="text-xl">Category</strong></div>
          <div className="w-[25%]"><strong className="text-xl">Availability</strong></div>
          </div>
          {ingredients.length > 0 ? (
            <div className="flex flex-col p-2">
              {ingredients.map((category, index) => (
                 <div key={index} className="w-full flex flex-row hover:cursor-pointer hover:bg-gray-300 hover:text-black hover:transition-all ease-in-out rounded-md p-2 ">
                 <div className="w-[25%]">{category.restaurantId}</div>
                 <div className="w-[25%]">{category.name}</div>
                 <div className="w-[25%]">{category.ingredientCategory}</div>
                 <div className="w-[25%]">Stock Availabel</div>
                 </div>
                
              ))}
            </div>
          ) : (
            <div className="w-full text-center mt-5 p-5">No Ingredients added yet.</div>
          )}
        </div>
      </div>
      <div className="bg-[#0b0b0b] flex flex-col w-[35%] min-h-screen rounded-md">
        <Toaster />
        <div className="flex flex-col w-full p-5">
          <div className="flex flex-row justify-between p-2 items-center w-full">
            <div className="text-3xl text-white">Category</div>
            <div>
              <Tooltip
                onClick={() => setCategoryModal(!categoryModal)}
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
        {categoryModal && (
          <Modal  open={categoryModal}
          onClose={() => setCategoryModal(false)} className="flex flex-row justify-center items-center  backdrop-blur-sm w-full">
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
                  onClick={() => setCategoryModal(false)}
                  className="px-4 py-1 bg-red-500 text-white rounded"
                >
                  Close
                </button>
                <button
                  onClick={handleCategorySave}
                  className="px-4 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Display Saved Categories */}
        <div className="m-5 text-white bg-gray-700 w-[90%] rounded-md">
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
    </div>
      
    </>
  );
};

export default IngredientsPage;
