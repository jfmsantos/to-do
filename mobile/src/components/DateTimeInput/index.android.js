import React, { useState } from "react";
import {
    TouchableOpacity,
    Image,
    TextInput,
    DatePickerAngroid,
    TimePickerAndroid,
} from "react-native";
import styles from "./styles";
import IconCalendar from "../../assets/calendar.png";
import IconClock from "../../assets/clock.png";

export default function DataTimeInputAndroid({ type }) {
    const [dateTime, setDateTime] = useState();

    async function selectDataOrHour() {
        if (type == "date") {
            const { action, year, month, day } = await DatePickerAngroid.open({
                mode: "calendar",
            });

            if (action === DatePickerAngroid.dateSerAction) {
                setDateTime(`${day} - ${month} -${year}`);
            }
        } else {
            const { action, hour, minuto } = await TimePickerAndroid.open({
                is24Hour: true,
            });
            if (action !== TimePickerAndroid.dismissedAction) {
                setDateTime(`${hour} - ${minuto}`);
            }
        }

        return (
            <TouchableOpacity onPress={selectDataOrHour}>
                <TextInput
                    style={styles.input}
                    placehold={
                        type == "date"
                            ? "Clique aqui para definir a data..."
                            : "Clique aqui para definir a hora..."
                    }
                    editable={false}
                    value={dateTime}
                />
                <Image
                    style={styles.iconTextInput}
                    source={type == "date" ? IconCalendar : IconClock}
                />
            </TouchableOpacity>
        );
    }
}
