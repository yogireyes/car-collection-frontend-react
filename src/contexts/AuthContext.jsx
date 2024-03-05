import { createContext, ReactNode, useState } from 'react'



const initialValue = {
  token: null,
  setToken: () => {}
}

const AuthContext = createContext(initialValue)

const AuthProvider = ({children}) => {
  //Initializing an auth state with false value (unauthenticated)
  const [ token, setToken ] = useState(initialValue.token)

  

  return (
    <AuthContext.Provider value={{token, setToken}}>
      {children}
    </AuthContext.Provider>
  )
}

export {  AuthContext, AuthProvider }