import "./ProfileSection.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import { useAuth } from "../../contexts/AuthProvider";
import { useUser } from "../../contexts/UserProvider";

export const ProfileSection = () => {
  const navigate = useNavigate();
  const { auth, handleLogout } = useAuth();
  const { userState } = useUser();

  const loggedInUser = userState?.allUsers?.find(
    (user) => user?.username === auth?.username
  );

  return (
    <div className="profile-section-container">
      <div className="profile-info">
        <div 
          className="profile-header"
          onClick={() => navigate(`/profile/${auth.username}`)}
        >
          <img 
            src={loggedInUser?.avatarURL} 
            alt={loggedInUser?.firstName}
            className="profile-picture"
          />
          <div className="profile-name">
            <h3>{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h3>
            <p>@{loggedInUser?.username}</p>
          </div>
        </div>
        <div 
          className="logout-option"
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
        >
          <IoMdLogOut className="logout-icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}; 