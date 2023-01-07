import './App.css';
import React, {useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import Main from "./pages/Main"
import Header from "./components/Header/Header";
import {AuthContext} from "./context/context";
import LoginPage from "./pages/LoginPage";

function App() {
    const [isAuth, setIsAuth] = useState(false)

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
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
