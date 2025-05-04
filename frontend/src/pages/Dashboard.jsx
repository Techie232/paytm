import { useContext, useEffect } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { UserContext } from "../context/UserContextProvider"

export const Dashboard = () => {

   const { user } = useContext(UserContext);

   return <div>
      <Appbar />
      <div className="m-8">
         <Balance value={user?.account?.balance} />
         <Users />
      </div>
   </div>
}