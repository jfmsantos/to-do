import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Qrcode() {
    return (
        <S.Container>
            <Header></Header>
            <S.Content>
                <h1>Capture o QrCode pelo App</h1>
                <S.QrcodeArea></S.QrcodeArea>
                <p>Sua atividades serão sincronizadas com o seu celular</p>
            </S.Content>
            <Footer></Footer>
        </S.Container>
    );
}
export default Qrcode;
