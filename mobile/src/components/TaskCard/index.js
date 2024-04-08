import React from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { format } from "date-fns";
import styles from "./styles";

import typeIcons from "../../utils/typeIcons";

export default function TaskCard({
    done,
    title,
    when,
    type,
    idTask,
    navigation,
}) {
    return (
        <TouchableOpacity
            style={[styles.card, done && styles.done]}
            onPress={() => navigation.navigate("Task", { idTask: idTask })}
        >
            <View style={styles.cardLeft}>
                <Image
                    source={typeIcons[type]}
                    style={styles.typeActive}
                    alt="icone"
                />
                <Text style={styles.cardTitle}>{title}</Text>
            </View>

            <View style={styles.cardRight}>
                <Text style={styles.cardDate}>
                    {format(new Date(when), "dd/MM/yyyy")}
                </Text>
                <Text style={styles.cardTime}>
                    {format(new Date(when), "hh:mm")}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
