import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";  
import { login, register } from "../../utils/api";
import {AuthContext} from "../../context/AuthContext.jsx";
import Navbar from "./Navbar";
import "./AuthForm.css";

export default function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const {saveLogin} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await register(username, password);
      console.log("Register:", res);
      if (res.user) {
        setMessage("Registration successful!");
      } else {
        setMessage(res.error || "Registration Failed! :( Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Registration Failed! Server error.");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      console.log("Login:", res);
      if (res.token) {
        saveLogin(res.token);
        setMessage("Welcome back!");
        navigate("/");
      } else {
        setMessage(
          res.error || "Login Failed! Check username and password or register"
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Login Failed! Server error.");
    }
  };

  const BackButton = () => {
    const navigate = useNavigate();
  
    return (
<button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 px-3 py-2 text-white font-bold rounded-lg absolute top-6 left-6
                  transform transition-transform duration-200 hover:scale-110"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>
      Back
    </button>
    );
  };

  return (
    <div>
      <BackButton />
      <div className="blue-purple-background flex flex-col sm:flex-row">
        {/* col 1: login */}
        <div className="min-h-screen sm:w-[60%] flex flex-col items-center justify-center text-white">
          <div className="auth-box bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-3xl mb-8">Log in</h2>
              <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-400 bg-gray-800 text-white p-2 rounded mb-4 w-64"
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-400 bg-gray-800 text-white p-2 rounded mb-6 w-64"
              />

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Login
                </button>
              </div>
          </div>
        </div>

        {/* col2: register overlapping card */}
        <div className="flex-1 min-h-screen w-full sm:w-[40%] flex items-center justify-center ">
          <div className="bg-blue-500 h-full w-full rounded-none md:rounded-l-3xl shadow-2xl flex flex-col items-center justify-center text-white z-20 p-10">
            <h2 className="text-2xl font-bold mb-6">New here?</h2>
            <p className="mb-6 text-center">Create an account to get started</p>
            <button
              onClick={handleRegister}
              className="px-6 py-2 bg-indigo-700 rounded-lg hover:bg-indigo-800"
            >
              Register
            </button>
          </div>
        </div>

      {message && <p className="text-lg font-semibold mt-4">{message}</p>}
      </div>
    </div>
  );
}
