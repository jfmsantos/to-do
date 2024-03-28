import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
    },

    filter: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        height: 70,
        alignItems: "center",
    },

    filterTextActived: {
        fontWeight: "bold",
        fontSize: 18,
        color: "#EE6b26",
    },

    filterTextInative: {
        color: "#20295f",
        fontWeight: "bold",
        fontSize: 18,
        opacity: 0.5,
    },
});

export default styles;
