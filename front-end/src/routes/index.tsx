import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import {
  ProtectedOuterRoute,
  ProtectedRoutes,
} from "../components/protectedRoutes";
import UserPdf from "../pages/UserPdf";
export const Router = () => {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-zinc-900 to-red-900 my-font">
      <Header title="ConecteSe"></Header>
      <Routes>
        <Route element={<ProtectedOuterRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pdf" element={<UserPdf />} />
        </Route>

        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </div>
  );
};
