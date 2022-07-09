import React from 'react';
import {Route, Routes} from "react-router-dom";
import Converter from "./pages/Converter";
import CurrentRates from "./pages/CurrentRates";

interface LayoutProps  {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
};

const MainLayout =()=>{
    return(
        <Layout children={
            <Routes>
                <Route path="/" element={<Converter/>}/>
                <Route path="/second" element={<CurrentRates/>}/>
            </Routes>
        }/>
    )
}

export default MainLayout;
