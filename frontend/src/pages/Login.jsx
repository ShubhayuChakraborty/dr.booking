import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextValue";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { registerUser, loginUser } = useContext(AppContext) || {};

  useEffect(() => {
    if (typeof window !== "undefined" && window.scrollTo) window.scrollTo(0, 0);
  }, []);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        // Register
        const result = await registerUser(name, email, password);
        if (result.success) {
          navigate("/");
        }
      } else {
        // Login
        const result = await loginUser(email, password);
        if (result.success) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-start pt-24 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="
          w-full max-w-md 
          bg-white/70 backdrop-blur-xl 
          p-10 rounded-2xl shadow-xl 
          border border-gray-200
          animate-fadeIn
        "
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          {state === "Sign Up" ? (
            <>
              Create your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#8A92FF]">
                account
              </span>
            </>
          ) : (
            <>
              Welcome{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#5F6FFF] to-[#8A92FF]">
                Back
              </span>
            </>
          )}
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Please {state === "Sign Up" ? "sign up" : "login"} to book your
          appointments
        </p>

        {/* FULL NAME */}
        {state === "Sign Up" && (
          <div className="mb-5">
            <p className="text-gray-700 mb-1">Full Name</p>
            <input
              type="text"
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="
                w-full px-4 py-3 
                border border-gray-300 
                rounded-xl outline-none 
                focus:ring-2 focus:ring-[#5F6FFF] 
                transition
              "
            />
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <p className="text-gray-700 mb-1">Email</p>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="
              w-full px-4 py-3 
              border border-gray-300 
              rounded-xl outline-none 
              focus:ring-2 focus:ring-[#5F6FFF] 
              transition
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">
          <p className="text-gray-700 mb-1">Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="
              w-full px-4 py-3 
              border border-gray-300 
              rounded-xl outline-none 
              focus:ring-2 focus:ring-[#5F6FFF] 
              transition
            "
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="
            w-full py-3 mt-4 
            bg-[#5F6FFF] text-white 
            rounded-xl font-semibold
            hover:bg-[#4e5fe8] transition shadow-md
          "
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* SWITCH MODE */}
        <p className="text-center mt-6 text-gray-700">
          {state === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[#5F6FFF] font-semibold cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setState("Sign Up")}
                className="text-[#5F6FFF] font-semibold cursor-pointer"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
