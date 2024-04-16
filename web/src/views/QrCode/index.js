import React, { useState } from "react";
import * as S from "./styles";
import Qr from "qrcode.react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Qrcode() {
    const [mac, setMac] = useState();
    let navigate = useNavigate();

    async function SaveMac() {
        if (!mac) {
            alert("Você precisa informar o número que apareceu no celular!");
        } else {
            localStorage.setItem("@todo/macaddress", mac);
            validarIdentificacao();
        }
    }

    async function validarIdentificacao() {
        await api.get(`/task/filter/all/${mac}`).then((response) => {
            if (response.data.length > 0) {
                navigate("/");
                window.location.reload();
            } else {
                alert("Não há tarefas para a identificação informada!");
            }
        });
    }

    return (
        <S.Container>
            <Header notification={false} />
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
