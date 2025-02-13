import { createContext, useState } from "react";

export let CounterContext = createContext(0)

 export function CounterContextProvider(props){
   
   const [Counter, setCounter] = useState(0)
   const [UserName, setUserName] = useState('UserName')
      const [userLogin, setuserLogin] = useState(null)

   return <CounterContext.Provider value={{userLogin , setuserLogin}}>

         {props.children}

   </CounterContext.Provider>
}