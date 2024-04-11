import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Application from "expo-application";

import styles from "./styles";

export default function QrCode({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    async function getMacAddress() {
        if (Platform.OS == "ios") {
            Application.getIosIdForVendorAsync().then((id) => {
                Alert.alert("Identificação do disposítivo: ", id);
            });
        } else {
            Alert.alert(
                "Identificação do disposítivo: ",
                Application.androidId
            );
        }
    }

    const handleBarCodeScanned = ({ data }) => {
        setScanned(true);
        if (data == "getmacaddress") {
            getMacAddress();
        } else {
            Alert.alert("QrCode Inválido!");
        }
    };

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                syle={StyleSheet.absoluteFillObject}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Conectar com minha conta na web.
                </Text>
            </View>

            <View style={styles.containerButtons}>
                <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={styles.textButton}>VOLTAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={
                        scanned
                            ? styles.buttonScanActive
                            : styles.buttonScanInative
                    }
                    onPress={() => setScanned(false)}
                >
                    <Text style={styles.textButton}>SCAN NOVAMENTE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
