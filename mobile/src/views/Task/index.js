import React, { useState } from "react";
import {
    View,
    ScrollView,
    Image,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Switch,
} from "react-native";

//COMPONENTES
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import typeIcons from "../../utils/typeIcons";
import DateTimeInput from "../../components/DateTimeInput/index";

import styles from "./styles";

export default function Task({ navigation }) {
    const [done, setDone] = useState(false);
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <Header showBack={true} navigation={navigation} />

            <ScrollView style={{ width: "100%" }}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{ marginVertical: 10 }}
                >
                    {typeIcons.map(
                        (icon) =>
                            icon != null && (
                                <TouchableOpacity>
                                    <Image
                                        source={icon}
                                        style={styles.imageIcon}
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
                />

                <Text style={styles.label}>Detalhes</Text>
                <TextInput
                    style={styles.inputArea}
                    maxLength={200}
                    multiline={true}
                    placeholder="Detalhes da atividade que tenho que lembrar..."
                />

                <DateTimeInput type={"date"} />
                <DateTimeInput type={"hour"} />

                <View style={styles.inLine}>
                    <View style={styles.inputInLine}>
                        <Switch
                            onValueChange={() => setDone(!done)}
                            value={done}
                            thumbColor={done ? "#00761B" : "#EE6B26"}
                        />
                        <Text style={styles.switchLabel}>Concluído</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.removeLabel}>EXCLUÍR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer icon={"save"} save={true} />
        </KeyboardAvoidingView>
    );
}
