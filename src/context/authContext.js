import axios from 'axios';
import React, { useState, useEffect, createContext } from 'react';
import { authHeader } from '../services/auth-service';
//creates a context with the values that you set.

export const AuthContext = createContext(null);


function AuthContextProvider({ children }) {
    let tempUser = null;
    try {
        tempUser = JSON.parse(localStorage.getItem("user"))

    } catch (err) {
        console.log(err);
    }
    const [currentUser, setCurrentUser] = useState(tempUser || null);

    const login = async (inputs) => {
        const res = await axios.post("api/auth/login", inputs);
        setCurrentUser(res.data);
    };


    const logout = async (inputs) => {
        setCurrentUser(null);
        await axios.get("api/auth/logout");

    };

    async function verifyToken() {
        try {
            const res = await axios.get("api/auth/verifytoken", { headers: authHeader() });
            console.log(res.status);
            if (res.status !== 200) {

                setCurrentUser(null);
            }
        } catch (err) {
            console.log(err);
            setCurrentUser(null);
        }

    }
    //use effect to update local storage as soon as currentUser value is changed.

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);


    useEffect(() => {
        let interval = setInterval(() => {
            verifyToken();
        }, 300000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContextProvider;


// function Parent() {

//     const [username, setUserName] = useState("Ali");
//     return (
//         //set value for context that need to be passed which can be access using
//         // const {attrivute name} = useContext(contextName); 
//         <AppContext.Provider value={{ username, setUserName }}>
//             <div>
//                 <h1>All childer here will have access
//                 </h1>
//             </div >
//         </AppContext.Provider>
//     );
// }