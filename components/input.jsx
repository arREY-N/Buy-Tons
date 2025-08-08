import globals from "@/constants/globals";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const CustomTextInput = ({ label, placeholder, value, onChangeText, secureTextEntry = false }) => {
    const { theme } = useTheme();

    const [isFocused, setIsFocused] = useState(false);
    const style = StyleSheet.create({
        input: {
            borderWidth: 1,
            padding: 10,
            borderRadius: globals.radius,
            color: theme.text,
            borderColor: theme.text,
            placeholderTextColor: theme.placeholder,
            minWidth: '300px'
        },
        inputFocused: {
            borderColor: '#a22121ff'
        },
        inputLabel: {
            margin: 5,
            color: theme.text
        }
    })
    
    return (
        <View>
            <Text style = {style.inputLabel}>{label}</Text>
            <TextInput
                style = {[style.input, isFocused && style.inputFocused]}
                on
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default CustomTextInput

