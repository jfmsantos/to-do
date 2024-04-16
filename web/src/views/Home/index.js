import React, { useState, useEffect } from "react";
import * as S from "./styles";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import isConnected from "../../utils/isConnected";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilterCard from "../../components/FilterCard";
import TaskCard from "../../components/TaskCard";

function Home() {
    const [filterActived, setFilterActived] = useState("today");
    const [tasks, setTasks] = useState([]);
    let navigate = useNavigate();

    async function loadTasks() {
        await api
            .get(`/task/filter/${filterActived}/${isConnected}`)
            .then((response) => {
                setTasks(response.data);
            });
    }

    function Notification() {
        setFilterActived("late");
    }

    useEffect(() => {
        loadTasks();
        if (!isConnected) {
            navigate("/qrcode");
        }
    }, [filterActived]);
    return (
        <S.Container>
            <Header clickNotification={Notification} notification={true} />
            <S.FilterArea>
                <button type="button" onClick={() => setFilterActived("all")}>
                    <FilterCard
                        title="Todos"
                        actived={filterActived === "all"}
                    />
                </button>
                <button type="button" onClick={() => setFilterActived("today")}>
                    <FilterCard
                        title="Hoje"
                        actived={filterActived === "today"}
                    />
                </button>
                <button type="button" onClick={() => setFilterActived("week")}>
                    <FilterCard
                        title="Semana"
                        actived={filterActived === "week"}
                    />
                </button>
                <button type="button" onClick={() => setFilterActived("month")}>
                    <FilterCard
                        title="Mes"
                        actived={filterActived === "month"}
                    />
                </button>
                <button type="button" onClick={() => setFilterActived("year")}>
                    <FilterCard
                        title="Ano"
                        actived={filterActived === "year"}
                    />
                </button>
            </S.FilterArea>
            <S.Title>
                <h3>
                    {filterActived == "late" ? "Tarefas Atrazadas" : "Tarefas"}
                </h3>
            </S.Title>
            <S.Content>
                {tasks.map((t) => (
                    <Link to={`/task/${t._id}`}>
                        <TaskCard
                            type={t.type}
                            title={t.title}
                            when={t.when}
                            done={t.done}
                        />
                    </Link>
                ))}
            </S.Content>

            <Footer />
        </S.Container>
    );
}

export default Home;
