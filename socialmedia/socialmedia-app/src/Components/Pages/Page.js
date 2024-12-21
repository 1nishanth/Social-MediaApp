import React from 'react'
import { Routes, Route } from "react-router-dom";

// import Login from './Login';
import Register from './Register';
import Feeds from './Feeds';
import Resetpswd from './Resetpswd';

import Layout from '../layout/Layout'

import CreatePost from '../post/CreatePost';

const Pages = () => {
    return (
        <div>
            <Routes>
                {/* <Route path="/Login" element={<Login />} /> */}
                <Route path="/Register" element={<Register />} />

                <Route path="/" element={<Layout />} >
                    <Route path="feeds" element={<Feeds />} />
                </Route>

                <Route path="/Reset" element={<Resetpswd />} />
                <Route path="/CreatePost" element={<CreatePost />} />
            </Routes>

        </div >
    )
}

export default Pages