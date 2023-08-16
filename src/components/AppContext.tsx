import { createContext, useEffect, useState } from "react"
import { getAllLocalStorage } from "../services/storage"
import { UserData } from "../pages/Conta"

interface IAppContext {
    user: UserData
    setUser: (user: UserData) => void
    isLoggedIn: boolean
    setIsLoggedIn: (isLoggedIn: boolean) => void
}
  
export const AppContext = createContext({} as IAppContext)
  
export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    const [ user, setUser ] = useState<UserData>({} as UserData)
    const storage = getAllLocalStorage()

    useEffect(() => {
      if(storage){
        const { login } = JSON.parse(storage)
        setIsLoggedIn(login)
      }
    }, [storage])

    return (
      <AppContext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn }}>
        { children }
      </AppContext.Provider>
    )
}
