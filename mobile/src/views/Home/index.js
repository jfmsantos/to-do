import React from "react";
import { Text, View } from "react-native";

import styles from "./styles";

//Componentes
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
    return (
        <View style={styles.container}>
            <Header showNotification={true} showBack={false} />
            <Footer icon={"add"}></Footer>
        </View>
    );
}
