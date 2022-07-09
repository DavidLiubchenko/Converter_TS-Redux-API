import React from 'react';
import {Route, Routes} from "react-router-dom";
import Converter from "./pages/Converter";
import CurrentRates from "./pages/CurrentRates";

interface ILayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<ILayoutProps> = ({children}) => {
    return (
        <>
            {children}
        </>
    );
};

const MainLayout = () => {
    return (
        <Layout children={
            <Routes>
                <Route path="/" element={<Converter/>}/>
                <Route path="/second" element={<CurrentRates/>}/>
            </Routes>
        }/>
    )
}

export default MainLayout;
