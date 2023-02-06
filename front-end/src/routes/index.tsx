import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { ProtectedRoutes } from "../components/protectedRoutes";
export const Router = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-zinc-900 to-red-900 my-font">
      <Header title="ConecteSe"></Header>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </div>
  );
};
