import React, { useState, useEffect } from "react";
import * as S from "./styles";
import api from "../../services/api";

import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/logo.png";
import bell from "../../assets/bell.png";

function Header({ clickNotification }) {
    const [lateCount, setLateCount] = useState();
    const [filterActived, setFilterActived] = useState("today");
    let navigate = useNavigate();

    async function lateVerify() {
        await api
            .get(`/task/filter/late/22:11:11:11:11:11`)
            .then((response) => {
                setLateCount(response.data.length);
            });
    }
    function Redirect() {
        return navigate("/");
    }

    useEffect(() => {
        lateVerify();
    });
    return (
        <S.Container>
            <S.LeftSide>
                <button onClick={Redirect}>
                    <img src={logo} alt="Logo" />
                </button>
            </S.LeftSide>
            <S.RightSide>
                <Link to="/">INÍCIO</Link>
                <span className="dividir" />
                <Link to="/task">NOVA TAREFA</Link>
                <span className="dividir" />
                <Link to="/qrcode">SINCRONIZAR CELULAR</Link>
                {lateCount && (
                    <>
                        <span className="dividir" />
                        <button onClick={clickNotification}>
                            <img src={bell} alt="Notificação" />
                            <span>{lateCount}</span>
                        </button>
                    </>
                )}
            </S.RightSide>
        </S.Container>
    );
}

export default Header;
