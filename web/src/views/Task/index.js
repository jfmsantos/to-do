import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import isConnected from "../../utils/isConnected";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TypeIcons from "../../utils/typeIcons";

import iconCalender from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

function Task() {
    let params = useParams();
    let navigate = useNavigate();

    const [type, setType] = useState();
    const [id, setId] = useState();
    const [done, setDone] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();

    async function loadTaskDetails() {
        if (params.id) {
            await api.get(`/task/${params.id}`).then((response) => {
                setType(response.data.type);
                setTitle(response.data.title);
                setDone(response.data.done);
                setDescription(response.data.description);
                setDate(format(new Date(response.data.when), "yyyy-MM-dd"));
                setHour(format(new Date(response.data.when), "HH:mm"));
            });
        }
    }

    async function save() {
        if (!type) {
            return alert("Você precisa selecionar o tipo da terefa");
        } else if (!title) {
            return alert("Você precisa informar o título da terefa");
        } else if (title.length < 5) {
            return alert(
                "Informar no mínimo 5 caracteres para o título da terefa"
            );
        } else if (!description) {
            return alert("Você precisa informar a descrição da terefa");
        } else if (!date) {
            return alert("Você precisa definir a data da terefa");
        } else if (!hour) {
            return alert("Você precisa definir a hora da terefa");
        }

        if (params.id) {
            await api
                .put(`/task/${params.id}`, {
                    macaddress: isConnected,
                    done,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}:00.000`,
                })
                .then(() => navigate("/"));
        } else {
            await api
                .post("/task", {
                    macaddress: isConnected,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}:00.000`,
                })
                .then(() => navigate("/"));
        }
    }

    async function remove() {
        const res = window.confirm("Deseja realmente remover a tarefa?");
        if (res === true) {
            await api.delete(`/task/${params.id}`).then(() => navigate("/"));
        }
    }

    useEffect(() => {
        if (!isConnected) {
            navigate("/qrcode");
        }
        loadTaskDetails();
    }, []);
    return (
        <S.Container>
            <Header />

            <S.Form>
                <S.TypeIcons>
                    {TypeIcons.map(
                        (icon, index) =>
                            index > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setType(index)}
                                >
                                    <img
                                        src={icon}
                                        alt="Tipo da Tarefa"
                                        className={
                                            type && type !== index && "inative"
                                        }
                                    />
                                </button>
                            )
                    )}
                </S.TypeIcons>
                <S.Input>
                    <span>Título</span>
                    <input
                        type="text"
                        placeholder="Título da tarefa..."
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        maxLength={25}
                    />
                </S.Input>

                <S.TextArea>
                    <span>Descrição</span>
                    <textarea
                        rows={5}
                        placeholder="Detalhes da tarefa..."
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        maxLength={250}
                    />
                </S.TextArea>

                <S.Input>
                    <span>Data</span>
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                    />
                    <img src={iconCalender} alt="Calendário" />
                </S.Input>

                <S.Input>
                    <span>Hora</span>
                    <input
                        type="time"
                        onChange={(e) => setHour(e.target.value)}
                        value={hour}
                    />
                    <img src={iconClock} alt="Relógio" />
                </S.Input>
                <S.Options>
                    <div>
                        <input
                            type="checkbox"
                            checked={done}
                            onChange={() => setDone(!done)}
                        />
                        <span>Concluído</span>
                    </div>
                    {params.id && (
                        <button type="button" onClick={remove}>
                            Excluir
                        </button>
                    )}
                </S.Options>

                <S.Save>
                    <button type="button" onClick={save}>
                        Salvar
                    </button>
                </S.Save>
            </S.Form>

            <Footer />
        </S.Container>
    );
}

export default Task;
