import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
