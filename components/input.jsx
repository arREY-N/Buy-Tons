import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export const CustomTextInput = ({ label, placeholder, value, onChangeText, secureTextEntry = false }) => {
    const [isFocused, setIsFocused] = useState(false);
    
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

const style = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 15,
        borderColor: '#292929ff',
        placeholderTextColor: '#3333335c',
        minWidth: '300px'
    },
    inputFocused: {
        borderColor: '#a22121ff'
    },
    inputLabel: {
        margin: 5
    }
})