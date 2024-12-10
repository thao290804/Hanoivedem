import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import MyTicket from "./components/MyTicket";
import { Switch } from "antd";

const App = () => {
    return (
        <Routes basename="">
            <Route path="/Hanoivedem" element={<Main />} />
            <Route path="/Hanoivedem/my-tickets" element={<MyTicket />} />
        </Routes>
    );
};

export default App;
