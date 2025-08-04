import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <DataProvider>
                <ScreenStack/>
            </DataProvider>
        </ThemeProvider>
    )
}

const ScreenStack = () => {
    const { theme } = useTheme();

    return(
        <Stack>
            <Stack.Screen name = 'landing' options={{
                headerShown: false,
                title: 'Landing',
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>

            <Stack.Screen name = '(tabs)' options={{
                headerShown: false,
                title: 'Home',
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>

            <Stack.Screen name = '(tabs)/order' options = {{
                headerShown: false,
                title: 'Order Details',
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>

            <Stack.Screen name = '(auth)' options={{
                headerShown: false,
                title: 'Auth',
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>

            <Stack.Screen name = '(order)/[id]' options={{
                title: 'Order Details',
                headerStyle: {
                    backgroundColor: theme.background
                },
                headerShadowVisible: false,
                headerTintColor: theme.text,
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>

            <Stack.Screen name = '(item)/[id]' options={{
                title: 'Item Details' ,
                headerStyle: {
                    backgroundColor: theme.background
                },
                headerShadowVisible: false,
                headerTintColor: theme.text,
                contentStyle: {
                    backgroundColor: theme.background
                }
            }}/>
            
        </Stack>
    )
}
