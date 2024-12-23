import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";

import Login from './Login';
import Register from './Register';
import Feeds from './Feeds';
import Resetpswd from './Resetpswd';
import Logout from './Logout';
import Profile from './Profile';

import Layout from '../layout/Layout'

import CreatePost from '../post/CreatePost';
import Sidebar from '../layout/Sidebar';

import { AuthContext } from "../context/AuthContext";

const Pages = () => {

    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route
                    path="/profile"
                    element={<Profile userId={currentUser?.id} />}
                />


                <Route path="/" element={<Layout />} >
                    <Route path="feeds" element={<Feeds />} />
                </Route>

                <Route path="/reset-password" element={<Resetpswd />} />
                <Route path="/createPost" element={<CreatePost />} />
                <Route path="/" element={<Sidebar />} />

                <Route path="/" element={<Logout />} />
            </Routes>

        </div >
    )
}

export default Pages