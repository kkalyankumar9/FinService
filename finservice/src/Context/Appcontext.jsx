import { createContext, useState } from "react";

export const AppContext=createContext()

export default function AppContextProvider({children}){
    const [isAuth,setisAuth]=useState(false)
    let LogIn=()=>{
        setisAuth(true)
    }
    let LogOut=()=>{
        setisAuth(false)
    }
    const [founds,setFounds]=useState(0)
    

    return <AppContext.Provider value={{LogIn,LogOut,isAuth,founds,setFounds}}>
        {children}
    </AppContext.Provider>
}
