// components/Home.js
import React from "react";
import { Link } from "react-router-dom";
import { HomeIcon } from '@heroicons/react/24/outline';
import "./Home.css";
/*import DatasetManager from "./DatasetManager";*/
import Navbar from "./Navbar/Navbar";

const PurpleButton = ({to, children}) => {
  return (
    <Link 
        to={to}
        className="bg-[#052757] border-[2px] border-[#0B4196] h-24 w-60 text-[#E1EBF7] font-mono font-bold py-4 px-6 rounded-lg text-center 
        hover:bg-[#041B3B] hover:border-[#052757] transition shadow-xl hover:-translate-y-1 flex justify-center items-center
        hover:[box-shadow:_0_0_10px_#236FE8,_0_0_20px_#236FE8,_0_0_40px_#236FE8]"
    >
        {children}
    </Link>
  );
};


function Home() {
  return (
    <div>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 custom-bg">
      {/*}
      <h1 className="jetbrains-mono text-6xl mb-4 text-white">
        Data Structure Visualiser
      </h1>
    */}
      <h1
        className="jetbrains-mono text-6xl  mb-4 text-center 
                  text-blue-400 [text-shadow:0_0_25px_rgba(37,99,235,1),0_0_50px_rgba(37,99,235,0.8)]
                  cursor-pointer
                  
                  hover:text-blue-600
                  hover:[text-shadow:0_0_25px_rgba(29,78,216,1),0_0_50px_rgba(29,78,216,0.8)]
                  "
      >
        Data Structure & Algorithms <br /> Visualiser
  </h1>
      <p className="jetbrains-mono text-lg font-bold text-gray-300 mb-8 text-center max-w-xl ">
        Explore and interact with different data structures with clear visualisations and explanations.
      </p>
      <p className="jetbrains-mono flex items-center gap-1 mt-20 text-white animate-fadeIn">
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
         {/*
        <h1 className="text-5xl font-mono font-bold text-[#236FE8] ml-10 mb-8 ">
          Data Structures
        </h1>*/}
        <h1 className="text-5xl font-mono font-bold ml-10 mb-8 
                       text-blue-400 [text-shadow:0_0_25px_rgba(37,99,235,1),0_0_50px_rgba(37,99,235,0.8)]">
          Data Structures
        </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            <PurpleButton to="/Array">Array</PurpleButton>
            <PurpleButton to="/Queue">Queue</PurpleButton>
            <PurpleButton to="/Stack">Stack</PurpleButton>
            <PurpleButton to="/LLStack">Stack (Linked List)</PurpleButton>
            <PurpleButton to="/List">List</PurpleButton>
            <PurpleButton to="/SinglyLinkedList">Singly Linked List</PurpleButton>
            <PurpleButton to="/Heap">Heap</PurpleButton>
            <PurpleButton to="/BinarySearchTree">Binary Search Tree</PurpleButton>
          </div> 
        </div>

        <div className="flex flex-col items-center justify-center px-6 mt-40">
        <h1 className="text-5xl font-mono font-bold ml-10 mb-8 
                      text-blue-400 [text-shadow:0_0_25px_rgba(37,99,235,1),0_0_50px_rgba(37,99,235,0.8)]">
            Sorting Algorithms
            </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <PurpleButton to="/BubbleSort">Bubble Sort</PurpleButton>
            <PurpleButton to="/QuickSort">Quick Sort</PurpleButton>
          </div>
        </div>

        {/*<DatasetManager />*/}

    </div>


      


    </div>


  );
}

export default Home;
