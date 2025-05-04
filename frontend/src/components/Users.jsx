import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "./Button"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";


export const Users = () => {
   // Replace with backend call
   const [users, setUsers] = useState([]);
   const [filter, setFilter] = useState("");

   const { user } = useContext(UserContext);

   const idRef = useRef();

   useEffect(() => {
      idRef.current = setTimeout(() => {
         axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
               setUsers(response.data.users)
            })

         console.log('after 300 ms');
      }, 300);

      return () => {
         clearTimeout(idRef.current);
      }

   }, [filter])

   return <>
      <div className="font-bold mt-6 text-lg">
         Users
      </div>
      <div className="my-2">
         <input onChange={(e) => {
            setFilter(e.target.value)
         }} type="text" placeholder="Search users..."
            className="w-full p-1 x-2 border rounded border-slate-200" />
      </div>
      <div>
         {
            users?.length > 0 &&
            <div className="w-[80%] mx-auto mt-10">
               {users?.map((user_, index) => {
                  if (user_?._id !== user?._id)
                     return <User key={index} user={user_} />
               })}
            </div>
         }
      </div>
   </>
}

function User({ user }) {
   const navigate = useNavigate();

   return <div className="flex justify-between duration-300 hover:bg-slate-200 p-2 rounded-md cursor-pointer">
      <div className="flex">
         <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
               {user.firstName[0]}
            </div>
         </div>
         <div className="flex flex-col justify-center h-ful">
            <div>
               {user.firstName} {user.lastName}
            </div>
         </div>
      </div>

      <div className="flex flex-col justify-center h-full">
         <Button onClick={(e) => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName);
         }} label={"Send Money"} />
      </div>
   </div>
}