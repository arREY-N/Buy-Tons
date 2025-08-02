import { router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

const register = () => {
    return (
        <View>
            <Text>Register page</Text>
            <Pressable onPress={() => router.replace('/(tabs)/')}>
                <Text>Register</Text>
            </Pressable>
        </View>
    )
}

export default register