import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContextProvider';

export const SendMoney = () => {
   const [amount, setAmount] = useState('');
   const [searchParams] = useSearchParams();
   const id = searchParams.get("id");
   const name = searchParams.get("name");

   const { user, setUser } = useContext(UserContext);

   const handleTranser = async () => {

      if (amount <= 0) {
         toast.error("Amount must be positive", {
            position: 'top-right'
         });
         return;
      }

      const toastId = toast.loading('Loading...');
      try {
         const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount
         }, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem("token")
            }
         })

         const updatedAccount = await axios.get('http://localhost:3000/api/v1/user/acc', {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            }
         })

         console.log(updatedAccount?.data);

         setUser({
            ...user,
            account: updatedAccount?.data?.account
         })

         toast.success('Money sent Successfully 🎉');
         setAmount('');
      } catch (error) {
         console.log('... API ERROR ---', error);
         toast.error(error?.response?.data?.message);
      }
      toast.dismiss(toastId);
   }

   return (
      <div>
         <div className="w-full text-center font-serif text-xl bg-slate-300">
            <Link to={'/dashboard'} >Dashboard</Link>
         </div>
         <div className="flex justify-center h-screen bg-gray-100 ">
            <div className="h-full flex flex-col justify-center ">
               <div
                  className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white rounded-lg shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]"
               >
                  <div className="flex flex-col space-y-1.5 p-6">
                     <h2 className="text-3xl font-bold text-center">Send Money</h2>
                  </div>
                  <div className="p-6">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                           <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
                        </div>
                        <h3 className="text-2xl font-semibold">{name}</h3>
                     </div>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="amount"
                           >
                              Amount (in Rs)
                           </label>
                           <input
                              onChange={(e) => {
                                 setAmount(e.target.value);
                              }}
                              type="number"
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              id="amount"
                              placeholder="Enter amount"
                              value={amount}
                           />
                        </div>
                        <button onClick={handleTranser} className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                           Initiate Transfer
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>)
}