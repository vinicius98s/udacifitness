import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { purple } from "../utils/colors";

export default function TextButton({ children, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{ color: purple, fontSize: 20 }}>{children}</Text>
        </TouchableOpacity>
    );
}
