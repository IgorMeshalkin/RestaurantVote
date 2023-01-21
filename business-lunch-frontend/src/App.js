import './App.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Main from "./pages/Main"
import Header from "./components/Header/Header";
import {AuthContext} from "./context/context";
import LoginPage from "./pages/LoginPage";

function App() {
    const [isAuth, setIsAuth] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        if(localStorage.getItem('currentUser') !== null) {
            const userFromLocalStorage = JSON.parse(localStorage.getItem('currentUser'))
            setCurrentUser(userFromLocalStorage)
            setIsAuth(true)
            setIsAdmin(userFromLocalStorage.role === 'ADMIN')
        }
    }, [])

    useEffect(() => {
        if (currentUser === null) {
            localStorage.removeItem('currentUser')
            setIsAuth(false)
            setIsAdmin(false)
        } else {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            setIsAuth(true)
            setIsAdmin(currentUser.role === 'ADMIN')
        }
    }, [currentUser])

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
            isAdmin,
            setIsAdmin,
            currentUser,
            setCurrentUser
        }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Header/>}>
                        <Route index element={<Main/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/restaurant/:id" element={<Restaurant/>}/>
                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
