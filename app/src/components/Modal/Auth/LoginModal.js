import { Modal, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloseSharp } from 'react-icons/io5';

const LoginModal = ({ isOpen, setIsModalOpen }) => {
  const [show, setshow] = useState(true);
  const closeModal = () => {
    setIsModalOpen(false); // Close modal when triggered
  };

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [inputFields, setInputFields] = useState({
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState({});
  const [loginErrors, setLoginErrors] = useState({});

  const roleOptions = [
    { label: "Customer", value: "ROLE_CUSTOMER" },
    { label: "Admin", value: "ROLE_ADMIN" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setRegisterErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInputFields({
      ...inputFields,
      [name]: value,
    });
    setLoginErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleRoleChange = (event, newValue) => {
    setFormValues({ ...formValues, role: newValue ? newValue.value : "" });
  };

  const validateRegisterFields = () => {
    const newErrors = {};
    if (!formValues.name) newErrors.name = "Name is required";
    if (!formValues.email) newErrors.email = "Email is required";
    if (!formValues.password) newErrors.password = "Password is required";
    if (!formValues.role) {
      toast.error("Please select a role"); // Toast error for dropdown
    }
    setRegisterErrors(newErrors); // Update register-specific errors
    return Object.keys(newErrors).length === 0;
  };

  const validateLoginFields = () => {
    const newErrors = {};
    if (!inputFields.email) newErrors.email = "Email is required";
    if (!inputFields.password) newErrors.password = "Password is required";
    setLoginErrors(newErrors); // Update login-specific errors
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validate fields
    if (!validateRegisterFields()) return;
  
    // Email regex validation
    if (!emailRegex.test(formValues.email)) {
      toast.error("Invalid email format");
      return;
    }
  
    // Password length validation
    if (formValues.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
        role: formValues.role,
      });
      if (response.data.success === true) {
        toast.success("Registration successful!");
      }
      console.log("Register Response:", response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!");
      console.error("Register Error:", error);
    }
  };
  
  const handleLogin = async () => {
    if (!validateLoginFields()) return;
  
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email: inputFields.email,
        password: inputFields.password,
      });
      if (response.data.success === true) {
        const token = response.data.token;
      localStorage.setItem("token", token); // Store token locally
        toast.success("Login successful!");
        setTimeout(() => {
          // setIsModalOpen(false);
        }, 2000);
      }
      console.log("Login Response:", response.data);
  
      // Handle token or user data as needed
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      console.error("Login Error:", error);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      className="flex flex-col w-full justify-center items-center backdrop-blur-sm p-2"
    >
      {show ? (
        <div className="flex flex-col w-[25%] justify-center text-white bg-black rounded-md items-center p-5 gap-10">
          <Toaster />
          <div className="w-[80%] flex flex-row justify-between">
            <div className="text-2xl">REGISTER</div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            >
              <IoCloseSharp />
            </div>
          </div>
          <div className="flex flex-col gap-8 text-white w-[80%]">
            <TextField
              label="Full Name"
              variant="standard"
              fullWidth
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              error={!!registerErrors.name}
              // helperText={registerErrors.name}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              error={!!registerErrors.email}
              // helperText={registerErrors.email}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Password"
              variant="standard"
              fullWidth
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
              error={!!registerErrors.password}
              // helperText={registerErrors.password}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <Autocomplete
              value={roleOptions.find((option) => option.value === formValues.role) || null}
              onChange={handleRoleChange}
              options={roleOptions}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  variant="standard"
                  fullWidth
                  sx={{
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiInput-underline:before": { borderBottomColor: "white" },
                    "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                    "& .MuiInput-underline:after": { borderBottomColor: "white" },
                  }}
                />
              )}
            />
          </div>
          <div
            onClick={handleRegister}
            className="bg-red-500 p-2 cursor-pointer rounded-md w-[80%] text-center text-xl"
          >
            Register
          </div>
          <div className="gap-5">
            Already have an account?{" "}
            <span
              onClick={() => {
                setshow(false);
              }}
              className="text-red-400 font-semibold text-base cursor-pointer"
            >
              LOGIN
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-[25%] justify-center text-white bg-black rounded-md items-center p-5 gap-10">
          <Toaster />
          <div className="flex flex-row justify-between w-[80%]">
            <div className="text-2xl">LOGIN</div>
            <div
              className="text-2xl cursor-pointer"
              onClick={() => {
                closeModal();
              }}
            >
              <IoCloseSharp />
            </div>
          </div>
          <div className="flex flex-col gap-8 text-white w-[80%]">
            <TextField
              label="Email"
              variant="standard"
              fullWidth
              name="email"
              value={inputFields.email}
              onChange={handleFieldChange}
              error={!!loginErrors.email}
              // helperText={loginErrors.email}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
            <TextField
              label="Password"
              variant="standard"
              fullWidth
              name="password"
              type="password"
              value={inputFields.password}
              onChange={handleFieldChange}
              error={!!loginErrors.password}
              // helperText={loginErrors.password}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiInput-underline:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:hover:before": { borderBottomColor: "white" },
                "& .MuiInput-underline:after": { borderBottomColor: "white" },
              }}
            />
          </div>
          <div
            onClick={handleLogin}
            className="bg-red-500 p-2 cursor-pointer rounded-md w-[80%] text-center text-xl"
          >
            Login
          </div>
          <div className="gap-5">
            Don't have an account?{" "}
            <span
              onClick={() => {
                setshow(true);
              }}
              className="text-red-400 pl-2 font-semibold text-base cursor-pointer"
            >
              REGISTER
            </span>
          </div>
          <div className="text-center text-red-400 cursor-pointer">
            Forgot Password?
          </div>
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
