import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  forgotPasswordAdmin,
  resetPasswordAdmin,
} from "../../Redux/Admin/Auth/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../adminNabar";

const AdminForgotpassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleForgotPassword = async () => {
    try {
      await dispatch(forgotPasswordAdmin(email));
      setEmail("");
      toast.success("Reset Email Sent");
    } catch (error) {
      console.error(error);
      toast.error("Error sending reset email");
    }
  };

  const handleResetPassword = async () => {
    try {
      await dispatch(resetPasswordAdmin(token, newPassword));
      toast.success("Password Reset Successful");
      setToken("");
      setNewPassword("");
    } catch (error) {
      console.error(error);
      toast.error("Error resetting password");
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
    <AdminNavbar/>
      <div className="max-w-md mx-auto mt-20 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4"> Admin Forgot Password</h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg"
            required
          />
        </div>
        <button
          className="w-full bg-red-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          onClick={handleForgotPassword}
        >
          Send Reset Email
        </button>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Admin Reset Password</h2>
          <div className="mb-4">
            <label
              htmlFor="token"
              className="block text-lg font-medium text-gray-700"
            >
              Token
            </label>
            <input
              id="token"
              type="text"
              placeholder="Enter token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-lg font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-lg"
              required
            />
          </div>
          <button
            className="w-full bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>

        </div>
        <button
              onClick={handleBack}
              className="mt-4 block w-full text-center text-lg font-medium text-gray-700 hover:text-gray-900"
            >
              Back
            </button>
      </div>
    </>
  );
};

export default AdminForgotpassword;
