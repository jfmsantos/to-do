import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";

import styles from "./styles";
import iconAdd from "../../assets/add.png";
import iconSave from "../../assets/save.png";

export default function Footer({ icon, navigation, save, onPress }) {
    return (
        <View style={styles.container}>
            {save ? (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Image source={iconSave} style={styles.image} />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Task")}
                >
                    <Image source={iconAdd} style={styles.image} />
                </TouchableOpacity>
            )}
            <Text style={styles.text}>Organizando sua vida.</Text>
        </View>
    );
}
