import React, { useState } from "react";
import "./css/login.css";
import login from "../assets/login.jpg";
import Notification from "../components/admin/Notification";
// import { staffAPI } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      setNotification({ message: "Please fill in all fields", type: "error" });
      return;
    }

    if (formData.username === "admin" && formData.password === "password123") {
      setNotification({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
      return;
    }

    // const staffList = await staffAPI.getAll();
    // const staff = staffList.find(
    //   (s) => s.phone === formData.username && s.name.toLowerCase().replace(/\s/g, "") === formData.password
    // );

    if (formData.username === "staff" && formData.password === "password123") {
      setNotification({ message: "Login successful!", type: "success" });
      setTimeout(() => {
        window.location.href = "/staff/dashboard";
      }, 1000);
    } else {
      setNotification({ message: "Invalid credentials", type: "error" });
    }
  };

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: "", type: "" })}
      />
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8 ">
          <div className="card login-card shadow-lg border-0 overflow-hidden">
            <div className="row g-0">
              <div className="col-md-6 d-none d-md-block">
                <div className="login-image">
                  <img
                    src={login}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="login-overlay d-flex flex-column justify-content-center align-items-center p-4">
                    <h2 className="text-white mb-3">Welcome!</h2>
                    <p className="text-light text-center">
                      Sign in to access your account.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card-body p-4 p-lg-5">
                  <div className="text-center mb-5"> 
                    <h6 className="text-bold">Sign in to your account</h6>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="floating-label-group">
                      <input
                        type="text"
                        className="floating-input"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label className="floating-label" htmlFor="username">
                        <i className="bi bi-person me-2"></i>
                        Username
                      </label>
                    </div>

                    <div className="floating-label-group">
                      <input
                        type="password"
                        className="floating-input"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder=" "
                      />
                      <label className="floating-label" htmlFor="password">
                        <i className="bi bi-lock me-2"></i>
                        Password
                      </label>
                    </div>

                    <button type="submit" className="btn-submit">
                      Sign In
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;