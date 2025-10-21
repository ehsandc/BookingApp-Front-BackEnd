import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import PropertyDetail from "./pages/PropertyDetail";
import LoginPage from "./pages/LoginPage";
import UserDashboard from "./pages/UserDashboard";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyDetail />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
