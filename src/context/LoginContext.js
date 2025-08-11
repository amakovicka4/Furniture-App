import React, { createContext, useContext, useEffect, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if(localUser){
            setUser(localUser);
        }
    },[]);

    const login = async (username,password) => {
        try{
            const response = await fetch('http://localhost:5160/login',{ 
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                username,
                password
              })
            });
      
            if(response.ok){
              const data = await response.json();
              setUser(data.user.username);
              localStorage.setItem('user',data.user.username);
              return true;
            } else{
              return false;
            }
          }catch {
            alert('Network error or server is unavailable.');
          }
    }

    const logout = async () => {
        try{
            const response = await fetch('http://localhost:5160/logout',{
            method: 'POST',
            credentials: 'include'
            });
            
            if(response.ok){
                setUser(null);
                localStorage.removeItem('user');
                console.log("Successful Logout");
            } else {
                alert('Error logging out. Sorry for the inconvenience');
            }

        }catch {
            alert('Issue Connecting to Server');
        }
      }

    return (
        <LoginContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </LoginContext.Provider>
    );

};

export const useLogin = () => useContext(LoginContext);