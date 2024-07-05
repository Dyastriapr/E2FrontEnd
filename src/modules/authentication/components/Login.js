import React, { useState } from "react";
import { bgLogin, logoe2f, mail, passwordicon } from ".";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const Auth = async (e) => {
    e.preventDefault();
    setEmailError(""); // Clear previous errors
    setPasswordError("");

    try {
      const response = await axios.post(
        "https://e2f-api-production.up.railway.app/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        const { emailError, passwordError } = error.response.data;
        setEmailError(emailError || "");
        setPasswordError(passwordError || "");
      }
    }
  };

  return (
    <div className="bg-primary min-h-screen flex items-center justify-center font-sans">
      <div className="container mx-auto max-w-4xl">
        <div className="max-h-max rounded-lg overflow-hidden shadow-lg bg-bgwhite pb-5">
          <div className="px-6 py-6">
            <div className="flex">
              <div className="w-2/3 p-5 flex flex-col">
                <img src={logoe2f} alt="" className="w-40 mx-auto" />
                <p className="text-center mt-4 text-2xl">Sign In</p>
                <p className="text-center mt-2 text-sm opacity-50">
                  masuk untuk mengakses aplikasi Edufuturefund
                </p>

                <form onSubmit={Auth}>
                  <div className="mt-4 relative px-6">
                    <label htmlFor="username" className="text-lg">
                      Username
                    </label>
                    <div className="flex items-center mt-1 grow mt-2">
                      <img
                        src={mail}
                        alt="Email Icon"
                        className="absolute left-9"
                      />
                      <input
                        type="text"
                        id="username"
                        className="w-full px-10 py-3 pl-14 rounded-lg"
                        placeholder="Enter your username or email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {emailError && (
                      <p className="text-xs text-red-700">*{emailError}</p>
                    )}
                  </div>

                  <div className="mt-4 relative px-6">
                    <label htmlFor="password" className="text-lg">
                      Password
                    </label>
                    <div className="flex items-center mt-1 grow mt-2">
                      <img
                        src={passwordicon}
                        alt="password icon"
                        className="absolute left-9"
                      />
                      <input
                        type="password"
                        id="password"
                        className="w-full px-10 py-3 pl-14 rounded-lg"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    {passwordError && (
                      <p className="text-xs text-red-700">*{passwordError}</p>
                    )}
                  </div>

                  <div className="px-6 mt-5">
                    <button
                      type="submit"
                      className="bg-primary text-center w-full text-white py-3 rounded-lg"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-1/3 bg-primary rounded-lg p-5">
                <div className="text-white items-center justify-center">
                  <p className="text-center text-2xl">EDUFUTUREFUND</p>
                  <img src={bgLogin} alt="" className="mt-5" />
                  <p className="text-center text-lg mt-5">
                    membantu siswa mengelola dan menyimpan nilai akademis mereka
                    dengan tujuan untuk meningkatkan performa di masa mendatang.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
