import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name = 'landing' options={{
                headerShown: false,
                title: 'Landing'
            }}/>

            <Stack.Screen name = '(tabs)' options={{
                headerShown: false,
                title: 'Home'
            }}/>

            <Stack.Screen name = '(auth)' options={{
                headerShown: false,
                title: 'Auth'
            }}/>

        </Stack>
    )
}
