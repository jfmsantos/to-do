import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../views/Home";
import Task from "../views/Task";

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/task" Component={Task} />
            </Routes>
        </BrowserRouter>
    );
}
