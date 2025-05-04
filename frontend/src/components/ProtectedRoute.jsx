import React, { useEffect, useRef } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

   const tokenRef = useRef(localStorage.getItem('token'));

   if (!tokenRef.current) {
      return <Navigate to={'/'} />
   }

   return (
      <div>{children}</div>
   )
}

export default ProtectedRoute