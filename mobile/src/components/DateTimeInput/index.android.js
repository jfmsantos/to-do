import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, TextInput, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";
import styles from "./styles";
import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

export default function DateTimeInputAndroid({ type, save, date, hour }) {
    const [dateTime, setDateTime] = useState();
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState("date");

    const newDateTime = (event, value) => {
        const currentDate = value || dateTime;
        if (type == "date") {
            setShow(false);
            setDateTime(format(new Date(currentDate), "dd/MM/yyyy"));
            save(format(new Date(currentDate), "yyyy-MM-dd"));
        } else {
            setShow(false);
            setDateTime(format(new Date(currentDate), "HH:mm"));
            save(format(new Date(currentDate), "HH:mm:ss"));
        }
    };

    async function selectDataOrHour() {
        if (type == "date") {
            setShow(true);
            setMode("date");
        } else {
            setShow(true);
            setMode("time");
        }
    }

    useEffect(() => {
        if (type == "date" && date) {
            setDateTime(format(new Date(date), "dd/MM/yyyy"));
            save(format(new Date(date), "yyyy-MM-dd"));
        }

        if (type == "hour" && hour) {
            setDateTime(format(new Date(hour), "HH:mm"));
            save(format(new Date(hour), "HH:mm:ss"));
        }
    }, []);

    return (
        <TouchableOpacity onPress={selectDataOrHour}>
            <TextInput
                style={styles.textInput}
                placeholder={
                    type == "date"
                        ? "Clique aqui para definir a data..."
                        : "Clique aqui para definir a hora..."
                }
                editable={false}
                value={dateTime}
            />
            {show && (
                <DateTimePicker
                    value={new Date()}
                    mode={mode}
                    display="default"
                    {...(mode === "date"
                        ? { minimumDate: new Date() }
                        : { is24Hour: true })}
                    onChange={newDateTime}
                />
            )}
            <Image
                style={styles.iconTextInput}
                source={type == "date" ? iconCalendar : iconClock}
            />
        </TouchableOpacity>
    );
}
