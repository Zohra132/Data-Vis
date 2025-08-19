import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Home from "./components/Home"; 

import Stack from "./components/Stack/Stack";
import LLStack from "./components/LLStack/LLStack";
import Queue from "./components/Queue/Queue";
import Array  from "./components/Array/Array";
import SinglyLinkedList from "./components/SinglyLinkedList/SinglyLinkedList";
import List  from "./components/List/List";
import Heap  from "./components/Heap/Heap";
import BST from "./components/BST/BST";
import BubbleSort from "./components/BubbleSort/BubbleSort";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Stack" element={<Stack />} />
        <Route path="/LLStack" element={<LLStack />} />
        <Route path="/Queue" element={<Queue />} />
        <Route path="/Array" element={<Array />} />
        <Route path="/SinglyLinkedList" element={<SinglyLinkedList />} />
        <Route path="/List" element={<List />} />
        <Route path="/Heap" element={<Heap />} />
        <Route path="/BinarySearchTree" element={<BST />} />
        <Route path="/BubbleSort" element={<BubbleSort/>} />
      </Routes>
    </Router>
  );
}

export default App;
