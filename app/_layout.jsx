import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <DataProvider>
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

                    <Stack.Screen name = '(order)/[id]' options={{
                        headerShown: true,
                        title: 'Order Details'
                    }}/>
                </Stack>
            </DataProvider>
        </ThemeProvider>
    )
}
