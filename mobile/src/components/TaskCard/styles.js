import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        width: "95%",
        marginVertical: 5,
        height: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1,
        elevation: 5,
        borderRadius: 5,
    },

    typeActive: {
        width: 50,
        height: 50,
    },

    cardLeft: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 3,
    },
    cardTitle: {
        marginLeft: 5,
        fontWeight: "bold",
        fontSize: 14,
    },

    cardRight: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    cardDate: {
        color: "#EE6B26",
        fontWeight: "bold",
        fontSize: 14,
    },

    cardTime: {
        color: "#707070",
    },

    done: {
        opacity: 0.5,
    },
});

export default styles;
