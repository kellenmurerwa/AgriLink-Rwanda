import React, { useState, useEffect } from "react";
import { Settings } from "lucide-react"; 
import "../styles/UserProfile.css";

const UserProfile = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(
    localStorage.getItem("profilePic") || null
  );
  const [userName, setUserName] = useState("");
  
useEffect(()=>
{
const fetchUserName=async()=>
{
  try{
//retrieve username from local storage
const storedName = localStorage.getItem("userName");
if (storedName) {
  setUserName(storedName);
}
  }
  catch(err)
  {
    console.error("Error Fetching Name")
  }
};
fetchUserName();
},[])

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle logout and redirect to home
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // Navigate to settings page
  const goToSettings = () => {
    // window.location.href = "/settings";
  };

  // Handle profile picture change
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        localStorage.setItem("profilePic", reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".userProfileContainer")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="userProfileContainer">
      <div className="userAvatar" onClick={toggleDropdown}>
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="profileImage" />
        ) : (
          "IB"
        )}
      </div>
      <span className="userName">{userName?userName:"Agri"}</span>

      {isDropdownOpen && (
        <div className="dropdownMenu">
          <label htmlFor="fileInput" className="dropdownItem">
            Change Profile Picture
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleProfilePicChange}
            style={{ display: "none" }}
          />
          <button className="dropdownItem" onClick={goToSettings}>
            <Settings size={16} className="icon" /> Settings
          </button>
          <button className="dropdownItem logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
