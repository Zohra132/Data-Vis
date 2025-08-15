// components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/outline';
import "./Home.css";

const PurpleButton = ({to, children}) => {
  return (
    <Link 
        to={to}
        className="bg-indigo-400 h-24 w-60 text-white font-bold py-4 px-6 rounded-lg text-center hover:bg-indigo-500 transition shadow-xl hover:-translate-y-1 "
    >
        {children}
    </Link>
  );
};

function Home() {
  return (
    <div>
    <div className="flex flex-col items-center justify-center min-h-screen px-4 custom-bg">
      <h1 className="text-6xl font-bold mb-4 text-white ">
        Data Structure Visualiser
      </h1>
      <p className="text-lg font-bold text-gray-100 mb-8 text-center max-w-xl ">
        Explore and interact with different data structures with clear visualisations and explanations.
      </p>
      <p className="flex items-center gap-1 mt-20 text-white animate-fadeIn">
        Scroll
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </p>
    </div>



    <div className="min-h-screen bg-[#000000] flex flex-col justify-center ">
        <div className="flex flex-col items-center px-6">
        <h1 className="text-4xl font-bold text-white justify-start ml-10 mb-8">Data Structures</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <PurpleButton to="/Array">Array COMPLETED</PurpleButton>
            <PurpleButton to="/SinglyLinkedList">Singly Linked List COMPLETED</PurpleButton>
            <PurpleButton to="/Heap">Heap</PurpleButton>
            <PurpleButton to="/HashMap">HashMap</PurpleButton>
            <PurpleButton to="/Tree">Tree</PurpleButton>
          </div> 
        </div>

        <div className="flex flex-col items-center justify-center px-6 mt-40">
          <h1 className="text-4xl font-bold text-white mb-8">Abstract Data Structures</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PurpleButton to="/Stack">Stack COMPLETED </PurpleButton>
            <PurpleButton to="/LLStack">Stack (Linked List) COMPLETED </PurpleButton>
            <PurpleButton to="/Queue">Queue COMPLETED</PurpleButton>
            <PurpleButton to="/List">List COMPLETED</PurpleButton>
          </div>
        </div>

    </div>


      


    </div>


  );
}

export default Home;
