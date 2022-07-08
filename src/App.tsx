import React from 'react';
import {Navbar} from "./components/Navbar";
import {Modal} from "./components/modal";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";

function App() {
    return (
        <BrowserRouter>
            <Modal/>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Page1/>}/>
                <Route path="/second" element={<Page2/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
