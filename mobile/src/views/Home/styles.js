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
    content: {
        width: "100%",
        marginTop: 30,
    },

    title: {
        width: "100%",
        borderBottomWidth: 1,
        borderColor: "#20295f",
        alignItems: "center",
    },
    titleText: {
        Color: "#20295f",
        fontSize: 18,
        position: "relative",
        top: 11,
        backgroundColor: "#FFF",
        paddingHorizontal: 10,
    },
});

export default styles;
