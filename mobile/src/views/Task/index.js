import React, { useState, useEffect } from "react";
import {
    View,
    ScrollView,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
    Alert,
    ActivityIndicator,
} from "react-native";
import * as Application from "expo-application";

//COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";
import DateTimeInput from "../../components/DateTimeInput/index";

import styles from "./styles";
import api from "../../services/api";

export default function Task({ navigation, route }) {
    const [id, setId] = useState(null);
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState();
    const [load, setLoad] = useState(true);

    async function SaveTask() {
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

        if (id) {
            await api
                .put(`/${id}`, {
                    macaddress,
                    done,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}.000`,
                })
                .then(() => {
                    navigation.navigate("Home");
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            await api
                .post("", {
                    macaddress,
                    type,
                    title,
                    description,
                    when: `${date}T${hour}.000`,
                })
                .then(() => {
                    navigation.navigate("Home");
                });
        }
    }

    async function LoadTask() {
        await api.get(`/${id}`).then((response) => {
            setLoad(true);
            setDone(response.data.done);
            setType(response.data.type);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setDate(response.data.when);
            setHour(response.data.when);
        });
    }
    async function getMacAddress() {
        if (Platform.OS == "ios") {
            Application.getIosIdForVendorAsync().then((id) => {
                setMacaddress(id);
            });
        } else {
            setMacaddress(Application.androidId);
            setLoad(false);
        }
    }
    useEffect(() => {
        getMacAddress();
        if (route.params && route.params.idTask) {
            setId(route.params.idTask);
            LoadTask().then(() => setLoad(false));
        }
    }, [macaddress, route.params]);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Header showBack={true} navigation={navigation} />
            {load ? (
                <ActivityIndicator
                    color="#EE6B26"
                    size={50}
                    style={{ marginTop: 150 }}
                />
            ) : (
                <ScrollView style={{ width: "100%" }}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ marginVertical: 10 }}
                    >
                        {typeIcons.map(
                            (icon, index) =>
                                icon != null && (
                                    <TouchableOpacity
                                        onPress={() => setType(index)}
                                    >
                                        <Image
                                            source={icon}
                                            style={[
                                                styles.imageIcon,
                                                type &&
                                                    type != index &&
                                                    styles.typeIconInative,
                                            ]}
                                        />
                                    </TouchableOpacity>
                                )
                        )}
                    </ScrollView>
                    <Text style={styles.label}>Título</Text>
                    <TextInput
                        style={styles.input}
                        maxLength={20}
                        placeholder="Lembre-me de fazer..."
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />

                    <Text style={styles.label}>Detalhes</Text>
                    <TextInput
                        style={styles.inputArea}
                        maxLength={200}
                        multiline={true}
                        placeholder="Detalhes da atividade que tenho que lembrar..."
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                    />

                    <DateTimeInput type={"date"} save={setDate} date={date} />
                    <DateTimeInput type={"hour"} save={setHour} hour={hour} />
                    {id && (
                        <View style={styles.inLine}>
                            <View style={styles.inputInLine}>
                                <Switch
                                    onValueChange={() => setDone(!done)}
                                    value={done}
                                    thumbColor={done ? "#00761B" : "#EE6B26"}
                                />
                                <Text style={styles.switchLabel}>
                                    Concluído
                                </Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.removeLabel}>EXCLUÍR</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
            )}
            <Footer icon={"save"} save={true} onPress={SaveTask} />
        </KeyboardAvoidingView>
    );
}
