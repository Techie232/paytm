import React, { createContext, useState } from 'react'
import CryptoJS from 'crypto-js'

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

   const storedEncryptedData = localStorage.getItem('user');

   let decryptedData = {};
   if (storedEncryptedData) {
      const bytes = CryptoJS.AES.decrypt(storedEncryptedData, import.meta.env.VITE_ENCRYPTION_KEY);
      decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
   }

   const [user, setUser] = useState(decryptedData);

   return (
      <div>
         <UserContext.Provider value={{ user, setUser }}>
            {children}
         </UserContext.Provider>
      </div>
   )
}

export default UserContextProvider