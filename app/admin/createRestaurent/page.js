"use client";
import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const CreateRestaurent = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    cuisineType: "",
    email: "",
    mobileNumber: "",
    twitter: "",
    instagram: "",
    openingHours: "",
    address: "",
    city: "",
    stateProvince: "",
    postalCode: "",
    country: "",
    images: [],
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', formValues.name);
    formData.append('description', formValues.description);
    formData.append('cuisineType', formValues.cuisineType);
    formData.append('openingHours', formValues.openingHours);
    
    // Address information
    formData.append('address[address]', formValues.address);
    formData.append('address[city]', formValues.city);
    formData.append('address[stateProvince]', formValues.stateProvince);
    formData.append('address[postalCode]', formValues.postalCode);
    formData.append('address[country]', formValues.country);
  
    // Contact information
    formData.append('contactInformation[email]', formValues.email);
    formData.append('contactInformation[mobile]', formValues.mobileNumber);
    formData.append('contactInformation[twitter]', formValues.twitter);
    formData.append('contactInformation[instagram]', formValues.instagram);
  
    // Adding images
    formValues.images.forEach((file) => {
      formData.append('images', file);
    });
  
    try {
      const response = await axios.post("http://localhost:8080/api/admin/restaurants", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });
      
      if (response.data.success) {
        toast.success("Registration successful!");
      }
      console.log("Register Response:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      console.error("Register Error:", error);
    }
  
    console.log("Form Values: ", formData);
  };
  

  return (
    <>
      <div className="w-full justify-center items-center  bg-black flex flex-col">
        <Toaster/>
        <div className="w-[70%] mx-auto p-6 bg-black m-5 shadow-md rounded-md min-h-screen">
          <h2 className="text-2xl font-semibold  text-white mb-6">
            Create Restaurant
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 w-full text-white">
            {/* Image Upload and Preview Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium  text-white mb-2">
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
              label="Restaurant Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
<div className="flex flex-row justify-around gap-10 items-center w-full">
<div className="flex flex-col gap-5 w-[45%]"> 
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Description"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Cuisine Type"
              name="cuisineType"
              value={formValues.cuisineType}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            
            
            <TextField
              label="Opening Hours"
              name="openingHours"
              value={formValues.openingHours}
              onChange={handleInputChange}
              placeholder="e.g., 10:00 AM - 12:00 PM"
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Street Address"
              name="address"
              value={formValues.address}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Mobile Number"
              name="mobileNumber"
              value={formValues.mobileNumber}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            /></div>
<div className="flex flex-col gap-5 w-[45%]"> 
<TextField
              label="Twitter"
              name="twitter"
              value={formValues.twitter}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Instagram"
              name="instagram"
              value={formValues.instagram}
              onChange={handleInputChange}
              fullWidth
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            
            <TextField
              label="City"
              name="city"
              value={formValues.city}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="State/Province"
              name="stateProvince"
              value={formValues.stateProvince}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Postal Code"
              name="postalCode"
              value={formValues.postalCode}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Country"
              name="country"
              value={formValues.country}
              onChange={handleInputChange}
              fullWidth
              required
              variant="standard"
 sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            </div>
</div>
            {/* Other Form Fields */}
           
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="bg-[#aa1647] hover:bg-[#AA1647]"
            >
              Create Restaurant
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRestaurent;
