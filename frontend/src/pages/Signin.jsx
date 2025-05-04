import { useContext, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import toast from "react-hot-toast"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContextProvider"
import CryptoJS from 'crypto-js'

export const Signin = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const { user, setUser } = useContext(UserContext)

   const submitHandler = async () => {
      if (email.length === 0 || password.length === 0) return;
      const toastId = toast.loading('Loading...');
      try {
         const res = await axios.post('http://localhost:3000/api/v1/user/signin', {
            username: email,
            password
         });

         const userData = {
            ...res?.data?.user,
            account: res?.data?.account,
         };

         setUser(userData);

         const secretyKey = import.meta.env.VITE_ENCRYPTION_KEY;
         const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(userData), secretyKey).toString();

         localStorage.setItem('user', encryptedData);

         localStorage.setItem('token', res.data?.token);
         toast.success("Logged-in Succesfully");

         navigate('/dashboard');
      } catch (error) {
         console.log('.... API ERROR --', error);
         toast.error("Something went wrong");
      }
      toast.dismiss(toastId);
   }

   return <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
         <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4">
            <Heading label={"Sign in"} />
            <SubHeading label={"Enter your credentials to access your account"} />
            <InputBox onChange={(e) => setEmail(e.target.value)} placeholder="john@gmail.com" label={"Email"} />
            <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
            <div className="pt-4" onClick={submitHandler}>
               <Button label={"Sign in"} />
            </div>
            <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
         </div>
      </div>
   </div>
}