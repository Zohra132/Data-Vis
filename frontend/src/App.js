import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import React, {useContext} from "react";
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
import QuickSort from "./components/QuickSort/QuickSort";
import AuthForm from "./components/Navbar/AuthForm";
import Account from "./components/Account/Account";
import { AuthProvider, AuthContext  } from "./context/AuthContext";

function AppRoutes() {
  const { user } = useContext(AuthContext);

  return (
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
      <Route path="/QuickSort" element={<QuickSort/>} />
      <Route path="/AuthForm" element={<AuthForm/>} />
      <Route 
        path="/Account" 
        element={user ? <Account /> : <Navigate to="/authForm" replace />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
