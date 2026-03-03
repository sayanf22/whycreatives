import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { u as useToast, C as Card, B as Button, s as supabase } from "../main.mjs";
import { I as Input } from "./input-6XZgwDxx.js";
import { Lock } from "lucide-react";
import "vite-react-ssg";
import "@radix-ui/react-toast";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "next-themes";
import "sonner";
import "@radix-ui/react-tooltip";
import "@tanstack/react-query";
import "@radix-ui/react-slot";
import "framer-motion";
import "react-helmet";
import "@supabase/supabase-js";
import "react-markdown";
import "remark-gfm";
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        console.error("Supabase auth error:", error);
        throw error;
      }
      if (data.user) {
        toast({
          title: "Success!",
          description: "Logged in successfully."
        });
        navigate("/admindashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = error.message || "Failed to connect to authentication service. Please check your internet connection.";
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-6", children: /* @__PURE__ */ jsxs(Card, { className: "w-full max-w-md p-8 border-2 border-white/20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4", children: /* @__PURE__ */ jsx(Lock, { className: "w-8 h-8 text-white" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-white mb-2", children: "Admin Login" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Enter password to access dashboard" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-white text-sm font-semibold mb-2", children: "Email Address" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "email",
            placeholder: "Enter your email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
            className: "bg-background border-white/20 text-white h-12",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-white text-sm font-semibold mb-2", children: "Password" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            type: "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
            className: "bg-background border-white/20 text-white h-12",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-white text-black hover:bg-neutral-200 font-bold h-12",
          children: loading ? "Logging in..." : "Login"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "text-sm text-muted-foreground hover:text-white transition-colors",
        children: "← Back to Home"
      }
    ) })
  ] }) });
};
export {
  AdminLogin as default
};
