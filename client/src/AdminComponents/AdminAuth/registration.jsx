import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { adminRegister } from "../../Redux/Admin/Auth/action";
import AdminNabar from "../adminNabar";


const AdminRegistration = () => {
  const initialData = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signData, setSignData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSignData((prev) => ({ ...prev, [name]: value }));

    // Inline validation for each field
    switch (name) {
      case "userName":
        if (!value) {
          setErrors((prev) => ({ ...prev, userName: "Username is required." }));
        } else {
          setErrors((prev) => ({ ...prev, userName: "" }));
        }
        break;
      case "email":
        if (!value) {
          setErrors((prev) => ({ ...prev, email: "Email is required." }));
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            email: "Email address is invalid.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, email: "" }));
        }
        break;
      case "password":
        if (!value) {
          setErrors((prev) => ({ ...prev, password: "Password is required." }));
        } else if (value.length < 6) {
          setErrors((prev) => ({
            ...prev,
            password: "Password must be at least 6 characters.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, password: "" }));
        }
        break;
      case "confirmPassword":
        if (!value) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Confirm Password is required.",
          }));
        } else if (value !== signData.password) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: "Passwords do not match.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signData.userName ||
      !signData.email ||
      !signData.password ||
      !signData.confirmPassword
      
    ) {
      toast.error("Please enter all required fields.");
      return;
    }

    if (signData.password !== signData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const user = {
      userName: signData.userName,
      email: signData.email,
      password: signData.password,
    };
console.log(user)
    try {
      const response = await dispatch(adminRegister(user));

      if (response.msg === "Admin Registration Successfully") {
        navigate("/admin_login");
        toast.success("Admin Registration Successfully");
      } else {
        const errorMessage = response.msg;
        toast.error(
          errorMessage || "An error occurred during registration. Please try again."
        );
      }

    } catch (error) {
      const errorMessage = error.msg;
      console.error("Registration error:", error);
      toast.error(
        errorMessage ||
          "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <>
    <AdminNabar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600  to-red-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-10 rounded-lg shadow-lg">
          <div className="flex justify-center mb-4"></div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-6">
                <label
                  htmlFor="userName"
                  className="block text-lg font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  value={signData.userName}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                    errors.userName ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg`}
                  placeholder="Username"
                />
                {errors.userName && (
                  <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={signData.email}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="mb-6">
                <label
             
                  className="block text-lg font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={signData.password}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-lg font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={signData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`appearance-none rounded-md relative block w-full px-4 py-3 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg`}
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-4 text-center text-md text-gray-600">
            Already have an account?{" "}
            <Link
              to="/admin_login"
              className="font-medium text-teal-600 hover:text-teal-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminRegistration;
