import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import { MdDirectionsBus } from "react-icons/md";

import { useAuthController } from "../controllers/authController";
import { useToast } from "../hooks/useToast";
import type { LoginCredentials } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  onClearError: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
  onClearError,
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    userName: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (error) onClearError();
  }, [formData, error, onClearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.userName.trim()) errors.userName = "Username is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsAnimating(true);
    const success = await onSubmit(formData);
    if (!success) setIsAnimating(false);
  };

  const isFormValid = formData.userName.trim() && formData.password.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div
              className={`w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 ${
                isAnimating ? "scale-110 rotate-12" : "hover:scale-105"
              }`}
            >
              <MdDirectionsBus className="w-12 h-12 text-black animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce animation-delay-1000"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              BusTrack
            </span>
          </h1>
          <p className="text-gray-400 text-lg">School Bus Admin Dashboard</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleInputChange}
                placeholder="Username"
                className={`w-full pl-12 pr-4 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  validationErrors.userName
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600"
                }`}
              />
              {validationErrors.userName && (
                <p className="mt-2 text-sm text-red-400 animate-pulse">{validationErrors.userName}</p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full pl-12 pr-12 py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 ${
                  validationErrors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-600"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-yellow-400 transition-colors"
              >
                {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
              </button>
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-400 animate-pulse">{validationErrors.password}</p>
              )}
            </div>

            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform ${
                isFormValid && !loading
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 hover:scale-105 shadow-lg hover:shadow-yellow-500/25"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              } ${loading ? "animate-pulse" : ""}`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="mt-8 text-center text-gray-400 text-sm">
            Secure access to your bus tracking system
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {0%{transform:translate(0,0) scale(1);}33%{transform:translate(30px,-50px) scale(1.1);}66%{transform:translate(-20px,20px) scale(0.9);}100%{transform:translate(0,0) scale(1);}}
        .animate-blob {animation: blob 7s infinite;}
        .animation-delay-2000 {animation-delay: 2s;}
        .animation-delay-4000 {animation-delay: 4s;}
        .animation-delay-1000 {animation-delay: 1s;}
        .animation-delay-200 {animation-delay: 0.2s;}
        .animation-delay-400 {animation-delay: 0.4s;}
      `}</style>
    </div>
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error, clearError } = useAuthController();
  const { user, setAuthUser } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (user) navigate("/adminDashboard");
  }, [user, navigate]);

  useEffect(() => {
    showToast("info", "Welcome", "Please sign in to access the admin dashboard");
  },[]);

  const handleSubmit = async (credentials: LoginCredentials): Promise<boolean> => {
    const result = await login(credentials);
    if (result.success && result.user) {
      setAuthUser(result.user);
      setTimeout(() => navigate("/adminDashboard"), 500);
      return true;
    }
    return false;
  };

  return <LoginForm onSubmit={handleSubmit} loading={loading} error={error} onClearError={clearError} />;
};

export default Login;
