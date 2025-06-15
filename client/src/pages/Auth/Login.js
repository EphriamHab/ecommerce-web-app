import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://ecommerce-web-app-gcjn.vercel.app/api/v1/auth/login`,
        { email, password }
      );
      if (res?.data?.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - Ecommerce App"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </div>

          <button
            type="button"
            className="forgot-btn"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
