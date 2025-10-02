import { useContext } from "react";
import { useNavigate } from "react-router-dom";
/*import { AuthContext } from "../../context/AuthContext.jsx"; */

/*
const LoginRegisterButton = () => {
  const navigate = useNavigate();
  const { user} = useContext(AuthContext);

  return user ? (
    <button
      onClick={() => navigate("/account")}
      className="absolute font-mono top-6 right-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-red-700"
    >
      Account
    </button>
  ) : (
    <button
      onClick={() => navigate("/authForm")}
      className="absolute font-mono top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded-lg 
      hover:bg-blue-400 hover:shadow-[0_0_25px_rgba(37,99,235,1),0_0_50px_rgba(37,99,235,0.8)] 
      hover:text-black transition duration-300"
    >
      Login / Register
    </button>
  );
};
*/

const Navbar = () => {
  return (
    <div className="sticky top-0 h-[100px] flex items-center justify-between px-6 bg-black text-white shadow-md">
      <h1 className="text-2xl font-mono font-bold">
        DSA Visualiser
      </h1>
      {/* <LoginRegisterButton /> */}
    </div>
  );
};

export default Navbar;
