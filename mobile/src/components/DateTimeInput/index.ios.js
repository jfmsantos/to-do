import React, { useState } from "react";
import { TouchableOpacity, Image, TextInput } from "react-native";

import DateTimePicker from "react-native-modal-datetime-picker";
import styles from "./styles";

import IconCalendar from "../../assets/calendar.png";
import IconClock from "../../assets/clock.png";

export default function ({ type }) {
    const [dateTime, setDateTime] = useState(new Date());

    return (
        <TouchableOpacity sytle={styles.input}>
            <DateTimePicker
                date={dateTime}
                mode={type}
                minimumDate={new Date()}
                onDateChange={setDateTime}
            />
            <Image
                style={styles.iconTextInput}
                source={type == "date" ? IconCalendar : IconClock}
            />
        </TouchableOpacity>
    );
}
