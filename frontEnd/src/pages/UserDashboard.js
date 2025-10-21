import React from 'react';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h1>Please log in to view your dashboard</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p>Manage your bookings and properties</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>📅 My Bookings</h3>
            <p>View and manage your upcoming stays</p>
            <div className="card-content">
              <p>No bookings yet</p>
              <small>Book your first property to see it here</small>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>🏠 My Properties</h3>
            <p>Manage your listed properties</p>
            <div className="card-content">
              <p>No properties listed</p>
              <small>Become a host and list your property</small>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>⭐ Reviews</h3>
            <p>Reviews you've received and given</p>
            <div className="card-content">
              <p>No reviews yet</p>
              <small>Reviews will appear after your stays</small>
            </div>
          </div>

          <div className="dashboard-card">
            <h3>👤 Profile</h3>
            <p>Update your personal information</p>
            <div className="card-content">
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
