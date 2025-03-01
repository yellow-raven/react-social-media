import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import React from "react";
import { useAuth } from "../../contexts/AuthProvider";

import { CreatePostForm } from "../CreatePostForm/CreatePostForm";
import {
  RiHomeWifiLine,
  BiSearch,
  HiOutlineBookmark,
  CgProfile,
  IoMdLogOut,
  FaFeather,
  MdFamilyRestroom,
} from "../../utils/icons";

export const Navbar = () => {
  const [isCreateNewPostClicked, setIsCreateNewPostClicked] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState("lebas-family");

  const { auth, handleLogout } = useAuth();
  const getActiveStyle = ({ isActive }) => ({
    color: isActive ? "rgb(29, 155, 240)" : "white",
  });

  const families = [
    { id: "lebas-family", name: "Lebas Family" },
    { id: "canadian-family", name: "Canadian Family" },
  ];

  return (
    <nav className="navbar">
      <ul>
        <li>
          <div className="family-selector">
            <select 
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="family-dropdown"
            >
              {families.map(family => (
                <option key={family.id} value={family.id}>
                  {family.name}
                </option>
              ))}
              <option value="new">+ Join New Family</option>
            </select>
          </div>
        </li>
        <li>
          <NavLink className="navlink" style={getActiveStyle} to="/">
            {<RiHomeWifiLine className="navlink-icon" />}
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" style={getActiveStyle} to="/explore">
            <BiSearch className="navlink-icon" />
            <p>Explore</p>
          </NavLink>
        </li>
        <li>
          <NavLink className="navlink" style={getActiveStyle} to="/bookmark">
            <HiOutlineBookmark className="navlink-icon" />
            <p>Bookmark</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="navlink"
            style={getActiveStyle}
            to={`/profile/${auth.username}`}
          >
            <CgProfile className="navlink-icon" />
            <p>Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            onClick={handleLogout}
            className="navlink"
            style={getActiveStyle}
            to="/login"
          >
            <IoMdLogOut className="navlink-icon" />
            <p>Logout</p>
          </NavLink>
        </li>
      </ul>
      <button
        className="create-new-post-btn"
        onClick={() => setIsCreateNewPostClicked(!isCreateNewPostClicked)}
      >
        <FaFeather className="feather-icon" />
        <span>New Post</span>
      </button>
      {isCreateNewPostClicked && (
        <div className="create-post-modal">
          <CreatePostForm
            className="modal-content"
            setIsCreateNewPostClicked={setIsCreateNewPostClicked}
          />
        </div>
      )}
    </nav>
  );
};
