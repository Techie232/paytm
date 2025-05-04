import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContextProvider"
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";

export const Appbar = () => {

   const { user } = useContext(UserContext);
   const navigate = useNavigate();

   const logoutHandler = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast.success("Log-out Successfully");
      navigate('/signin');
   }

   return <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">
         PayTM App
      </div>
      <div className="flex">
         <div className="flex flex-col justify-center h-full mr-4">
            Hello
         </div>
         <div className="flex items-center gap-4">
            <div className="rounded-full h-[80%] w-[80%] bg-slate-200 flex justify-center mt-1 mr-2">
               <div className="flex flex-col justify-center h-full text-xl">
                  {user?.firstName}
               </div>
            </div>
            <div>
               <button
                  onClick={logoutHandler}
                  className="mr-5  bg-orange-200 p-2 rounded-xl">Logout</button>
            </div>
         </div>
      </div>
   </div>
}