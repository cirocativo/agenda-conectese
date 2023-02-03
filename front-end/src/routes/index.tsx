import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { RegisterForm } from "../pages/RegisterForm";
import { LoginForm } from "../pages/LoginForm";
import { Dashboard } from "../pages/Dashboard";
export const Router = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-zinc-900 to-red-900 my-font">
      <Header title="ConecteSe"></Header>
      <Routes>
        <Route path="/" element={<LoginForm />} />

        <Route path="/register" element={<RegisterForm />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </div>
  );
};
