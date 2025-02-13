import { createContext, useEffect, useState } from "react";
export let UserContext = createContext()
  export function UserContextProvider(props) {
   
    const [userLogin, setuserLogin] = useState(localStorage.getItem('userToken'))

    useEffect(()=>{
      if (localStorage.getItem('userToken' !== null)){
         setuserLogin(localStorage.getItem('userToken'))
      }
    },[])
   return(
      <UserContext.Provider value={{userLogin , setuserLogin}}>
         {props.children}
      </UserContext.Provider>
   )
}