import { CustomTextInput } from '@/components/input';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 18
    },
    button: {
        alignItems: 'center',
        padding: 5,
        justifyContent: 'center',
        marginTop: 16,
        borderWidth: 1,
        minWidth: '70px',
        borderColor: '#333',
        borderRadius: 10
    }
})

const index = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const handleLogin = () => {
        setError(null)
        
        if(!username.trim() || !password.trim()){
            setError("Please include a valid username and password")
            return
        } 

        if(username === 'username' && password === 'password'){
            router.replace('/(tabs)/')
        } else {
            setError("Invalid credentials")
        }
    }

    return (
        <View style = {style.container}>
            <Text style = {style.title}>Buy Tons</Text>
            <Text style = {style.subtitle}>by Pythons</Text>
            <CustomTextInput
                label="Username"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            
            <CustomTextInput
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            
            <Pressable 
                style = {style.button} 
                onPress={handleLogin}
            >
                <Text>Login</Text>
            </Pressable>
            
            <Pressable 
                style = {style.button} 
                onPress={() => router.push('/register')}
            >
                <Text>Register</Text>
            </Pressable>

            {error && <Text>{error}</Text> }
        </View>
    )
}

export default index