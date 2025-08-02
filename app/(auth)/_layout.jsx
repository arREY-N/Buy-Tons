import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name = 'index' options={{
                headerShown: false,
                title: 'Log in'
            }}/>
            
            <Stack.Screen name = 'register' options={{
                title: 'Register'
            }}/>
        </Stack>
    )
}
