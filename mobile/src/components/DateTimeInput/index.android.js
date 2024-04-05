import React, { useState } from "react";
import { TouchableOpacity, Image, TextInput } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from "./styles";
import iconCalendar from "../../assets/calendar.png";
import iconClock from "../../assets/clock.png";

export default function DataTimeInputAndroid({ type }) {
    const [dateTime, setDateTime] = useState();

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    function showDatePicker() {
        setDatePickerVisibility(true);
    }
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        if ({ date } == "") {
            hideDatePicker();
        } else if (isPast(new Date(date), "dd/MM/yyyy")) {
            Alert.alert("Escolha uma data atual");
            hideDatePicker();
        } else {
            setDateTime(format(new Date(date), "dd/MM/yyyy"));
            save(format(new Date(`${date}`), "yyy-MM-dd"));
            hideDatePicker();
        }
    };

    const handleTimeConfirm = (date) => {
        if ({ date } == "") {
            hideTimePicker();
        } else {
            setDateTime(format(new Date(date), "HH:mm"));
            save(format(new Date(`${date}`), "HH:mm"));
            hideTimePicker();
        }
    };

    async function selectDateOrHour() {
        if (type == "date") {
            {
                showDatePicker();
            }
        } else if (type == "hour") {
            {
                showTimePicker();
            }
        }
    }

    return (
        <TouchableOpacity onPress={selectDateOrHour}>
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
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                nConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                is24Hour
                locale="pt_br"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
            <Image
                style={styles.iconTextInput}
                source={type == "date" ? iconCalendar : iconClock}
            />
        </TouchableOpacity>
    );
}
