import { BrowserRouter, Route, Routes, } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import Home from "./pages/Home";
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
   return (
      <>
         <BrowserRouter>
            <Routes>
               <Route path="/" element={
                  <Home />
               } />
               <Route path="/signup" element={
                  <Signup />
               } />
               <Route path="/signin" element={
                  <Signin />
               } />
               <Route path="/dashboard" element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               } />
               <Route path="/send" element={
                  <ProtectedRoute>
                     <SendMoney />
                  </ProtectedRoute>
               } />
            </Routes>

            <Toaster />
         </BrowserRouter>
      </>
   )
}

export default App