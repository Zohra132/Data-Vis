import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Account = () => {
    /*const navigate = UseNavigate();*/
    const { user, logout } = useContext(AuthContext);
    const [profilePic, setProfilePic] = useState(null);

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setProfilePic(URL.createObjectURL(file)); 
        }
      };
    

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
          <h1 className="text-3xl font-bold mb-6">{user.username}</h1>
    
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full mb-4 border-2 border-white"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <span>No Profile Pic</span>
            </div>
          )}
    
          <label className="cursor-pointer px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 mb-4">
            Change Profile Pic
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
          </label>
    
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      );
}

export default Account;