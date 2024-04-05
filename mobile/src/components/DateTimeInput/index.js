import React, { useState } from "react";
import { Platform } from "react-native";

import DataTimeInputAndroid from "./index.android";
import DataTimeInputIOS from "./index.android";

export default function Index() {
    return Platform.OS == "android" ? (
        <DataTimeInputAndroid />
    ) : (
        <DataTimeInputIOS />
    );
}
