import React, { useState, useEffect } from "react";
import * as S from "./styles";
import Qr from "qrcode.react";
import { useNavigate } from "react-router-dom";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Qrcode() {
    const [mac, setMac] = useState();
    let navigate = useNavigate();

    async function SaveMac() {
        await localStorage.setItem("@todo/macaddress", mac);
        navigate("/");
        window.location.reload();
    }
    return (
        <S.Container>
            <Header></Header>
            <S.Content>
                <h1>Capture o QrCode pelo App</h1>
                <p>Suas atividades serão sincronizadas com o seu celular.</p>
                <S.QrcodeArea>
                    <Qr value="getmacaddress" size={350} />
                </S.QrcodeArea>

                <S.ValidationCode>
                    <span>Digite a numeração que apareceu no celular.</span>
                    <input
                        type="text"
                        maxLength={20}
                        onChange={(e) => setMac(e.target.value)}
                        value={mac}
                    />
                    <button type="button" onClick={SaveMac}>
                        SINCONIZAR
                    </button>
                </S.ValidationCode>
            </S.Content>
            <Footer></Footer>
        </S.Container>
    );
}
export default Qrcode;
