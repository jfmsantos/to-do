import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";
import Qrcode from "../views/QrCode";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact Component={Home} />
                <Route path="/task" exact Component={Task} />
                <Route path="/task/:id" exact Component={Task} />
                <Route path="/qrcode" exact Component={Qrcode} />
            </Routes>
        </BrowserRouter>
    );
}
