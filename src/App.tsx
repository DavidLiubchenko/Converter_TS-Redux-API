import React from 'react';
import {Navbar} from "./components/Navbar";
import {Modal} from "./components/Modal";
import Layout from './Layout'

const App=()=> {
    return (
        <>
            <Modal/>
            <Navbar/>
            <Layout />
        </>

    );
}

export default App;
