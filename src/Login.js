import React, { useEffect, useState } from "react";
import loginImg from "../src/images/login.png";
import { createUser, login } from "./api/todoApi";
import { useNavigate } from "react-router-dom";

const Login = (props = {}) => {
  const {setLoggedIn} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    resetForm();
  }, []);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  }

  const loginUser = async () => {
    if (!email || !password) {
      alert('Email/Password empty!');
      return;
    }
    setLoading(true);
    const payload = {
      username: email,
      password
    };
  
    await login(payload, handleRes);
  };

  const signupUser = async () => {
    if (!email || !password) {
      alert('Email/Password empty!');
      return;
    }
    setLoading(true);
    const payload = {
      email,
      password
    };
    await createUser(payload, createUserCallback)
  }

  const handleRes = (success, msg = '') => {
    if (success) {
      setLoggedIn(true);
      navigate("/");
    } else {
      alert(msg);
    }
    setLoading(false);
  }

  const createUserCallback = (success, msg = '') => {
    if (success) {
      setLoggedIn(true);
      resetForm();
      setLoginMode(true);
      alert('User created. Login now!');
    } else {
      alert(msg);
    }
    setLoading(false);
  }

  return (
    <div className="w-full h-screen pt-52">
      <div
        className="flex m-auto h-[30rem] w-[60rem]"
        style={{
          borderRadius: "50px",
          background: "#ffffff",
          boxShadow: "5px 5px 80px #f5f5f5, -5px -5px 80px #ffffff",
        }}
      >
        <div className="w-full flex flex-col flex-1 justify-center items-center bg-slate-100 rounded-3xl m-8">
          <div className="flex flex-col mx-auto">
            <h1 className="font-extrabold text-3xl text-center mb-8 tracking-widest">Login</h1>
            <label className="text-gray-400 mb-1" htmlFor="Email">
              Email
            </label>
            <input
              id="Email"
              className="w-[20rem] outline-none h-10 rounded-xl pl-2 border-b"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-gray-400 mt-3 mb-1" htmlFor="Password">
              Password
            </label>
            <input
              id="Password"
              className="w-[20rem] outline-none h-10 rounded-xl pl-2 border-b"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="h-10 rounded-xl font-bold text-lg w-[20rem] text-white bg-sky-600 mt-8 tracking-wider" onClick={loginMode ? loginUser : signupUser} disabled={loading} >
            {loginMode ? 'Login' : 'Sign Up'}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-8">
            {loginMode ? 'New to Todo?' : 'Already a customer?'} <span onClick={() => setLoginMode(!loginMode)} className="underline-offset-1 hover:underline decoration-solid cursor-pointer">{loginMode ? 'Signup' : 'Login'}</span>
          </div>
        </div>
        <div className="flex relative flex-1">
          <img
            className="z-10 absolute -left-4 top-1/2 -translate-y-1/2"
            src={loginImg}
            alt="login_img"
          />
          <div className="w-1/2 h-full bg-blue-300 absolute rounded-3xl right-0"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
