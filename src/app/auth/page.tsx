"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Log the form data to verify it's correct
    console.log("Submitting form data:", formData);
    
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });
      
      // Log the raw response
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(errorText);
      }
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Success:", data);
        router.push("/dashboard");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Full error:", error);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#1a1a1a] p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-black border border-[#333]"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          )}
          
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-black border border-[#333]"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded bg-black border border-[#333]"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          
          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-medium"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#ADD8E6] hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
        
        {error && (
          <div className="text-red-500 text-sm mt-2 text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
} 