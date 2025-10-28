// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import IncidentList from "./components/IncidentList";
import IncidentForm from "./components/IncidentForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/NavBar";
import Header from "./components/Header";
import "./App.css"; // adicionaremos o CSS aqui
import Category from "./pages/Category/Category";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-layout d-flex">
          {/* Sidebar */}
          <Navbar />

          {/* Área principal */}
          <div className="main-content flex-grow-1">
            <Header />

            <div className="content p-4">
              <Routes>
                {/* <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                /> */}
                <Route path="/incidents" element={<IncidentList />} />
                <Route path="/incidents/:id" element={<IncidentForm />} />
                <Route path="/new" element={<IncidentForm />} />
                <Route path="/categories" element={<Category />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
