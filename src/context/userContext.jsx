import { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = (props) => {
    const [ user, setUser ] = useState(null);

    function login(user) {
        setUser(user);
    }

    function logout() {
        setUser(null);
    }
  return (
    <userContext.Provider value={{logout, user, setUser}}>
      {props.children}
    </userContext.Provider>
  );
};