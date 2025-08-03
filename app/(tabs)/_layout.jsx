import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";

export default function RootLayout() {
    return (
        <ThemeProvider>
            <DataProvider>
                <App/>        
            </DataProvider>
        </ThemeProvider>
    )
}

const App = () => {
    const { theme } = useTheme();

    return(
        <Tabs        
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.background,
                    borderRadius: 16,
                    marginHorizontal: 16,
                    marginBottom: 16,
                    minHeight: 60,
                    justifyContent: 'center'
                }                
            }}
        >
            <Tabs.Screen 
                name = 'index'
                options = {{
                    title: 'Home'
                }}
            />

            <Tabs.Screen 
                name = 'order'
                options = {{
                    title: 'Order'
                }}
            />

            <Tabs.Screen 
                name = 'transaction'
                options = {{
                    title: 'Transaction'
                }}
            />
            
            <Tabs.Screen 
                name = 'profile'
                options = {{
                    title: 'Profile'
                }}
            />
        </Tabs>
    )
}
