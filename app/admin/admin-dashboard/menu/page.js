"use client";
import { Autocomplete, IconButton, Modal, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import CancelIcon from "@mui/icons-material/Cancel";

const MenuPages = () => {
  const [show, setShow] = useState(false);
  const [inputMenu, setInputMenu] = useState("");
  const [menus, setMenus] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);
  const [selectedSeasonal, setSelectedSeasonal] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
  });

  const IngredientsArray = [
    { label: "Biriyani", value: "biriyani" },
    { label: "Grill Chicken", value: "grill-chicken" },
    { label: "Chicken Rice", value: "chickenrice" },
  ];

  const SelectVegeterianArray = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const ISSeasonal = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setFormValues({ ...formValues, images: [...formValues.images, ...files] });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = formValues.images.filter((_, i) => i !== index);
    setFormValues({ ...formValues, images: updatedImages });
  };
  const handleSave = () => {
    if (inputMenu.trim()) {
      const newCategory = {
        name: inputMenu.trim(),
        restaurantId :menus.length+1,
      };

      setMenus([...menus, newCategory]); // Add the new category to the list
      setInputMenu(""); // Clear input field
      setShow(false); // Close the modal
    } else {
      toast.error("menus name cannot be empty."); // Handle empty input
    }
  };

  return (
    <>
      <div className="bg-black flex flex-col w-full min-h-screen">
        <Toaster />
        <div className="flex flex-col w-full p-5">
          <div className="flex flex-row justify-between p-2 items-center w-full">
            <div className="text-3xl text-white">All Menu Items</div>
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
                title="Add Menu"
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
            <div className="bg-gray-400 w-[80%] p-5 rounded-md  gap-5 flex flex-col justify-center items-start">
              <div className="w-full text-center text-xl">Create Menu</div>
              <div className="flex flex-col gap-5 w-full">
              <div className="mb-6">
              <label className="block text-sm font-medium  text-black mb-2">
                Upload Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiInput-underline:before": { borderBottomColor: "white" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                    "& .MuiInput-underline:after": { borderBottomColor: "white" },
                  }}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-100"
              />
              {/* Image Previews */}
              <div className="mt-4 flex flex-wrap gap-4">
                {formValues.images.map((image, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={image.preview}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <IconButton
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full"
                      size="small"
                    >
                      <CancelIcon />
                    </IconButton>
                  </div>
                ))}
              </div>
            </div>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
            />
            <TextField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
            />
            <div className="flex flex-row w-full justify-between">
            <TextField
              label="Enter Price"
              name="price"
              value={formValues.price}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
              className="w-[45%]"
            />
            <Autocomplete
                              className="w-[45%]"
                value={selectedIngredient}
                onChange={(event, newValue) => setSelectedIngredient(newValue)}
                options={IngredientsArray}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    
                    label="Food Category"
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
              <Autocomplete
                
                value={selectedIngredient}
                onChange={(event, newValue) => setSelectedIngredient(newValue)}
                options={IngredientsArray}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    
                    label="Select Ingredients"
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
            <div className="flex flex-row w-full justify-between">
            <Autocomplete
                              className="w-[45%]"
                value={selectedDish}
                onChange={(event, newValue) => setSelectedDish(newValue)}
                options={SelectVegeterianArray}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    
                    label="Is Vegeterian"
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
              <Autocomplete
                              className="w-[45%]"
                value={selectedSeasonal}
                onChange={(event, newValue) => setSelectedSeasonal(newValue)}
                options={ISSeasonal}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    
                    label="Is Seasonal"
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
              </div>
              <div className="flex flex-row gap-4 w-full mt-5 justify-start">
                
                <button
                  onClick={handleSave}
                  className="px-6 py-1 bg-red-500 text-white rounded"
                >
                  Create Menu
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Display Saved menus */}
        <div className="m-5 text-white bg-gray-800 w-[98%] rounded-md">
          <div className="w-full flex flex-row p-2 ">
          <div className="w-[16%]"><strong className="text-xl">Image</strong></div>
          <div className="w-[16%]"><strong className="text-xl">Title</strong></div>
          <div className="w-[16%]"><strong className="text-xl">Ingredients</strong></div>
          <div className="w-[16%]"><strong className="text-xl">Price</strong></div>
          <div className="w-[16%]"><strong className="text-xl">Availability</strong></div>
          <div className="w-[16%]"><strong className="text-xl">Delete</strong></div>
          </div>
          {menus.length > 0 ? (
            <div className="flex flex-col p-2">
              {menus.map((category, index) => (
                 <div key={index} className="w-full flex flex-row hover:cursor-pointer hover:bg-gray-300 hover:text-black hover:transition-all ease-in-out rounded-md p-2 ">
                 <div className="w-[16%]">{category.restaurantId}</div>
                 <div className="w-[75%]">{category.name}</div>
                 </div>
                
              ))}
            </div>
          ) : (
            <div className="w-full text-center mt-5 p-5">No Menus added yet.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuPages;
