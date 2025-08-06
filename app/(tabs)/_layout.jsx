import { useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
    const { ContainerStyle } = useTheme();
    
    return (
        <View style = {ContainerStyle.container}>
            <App/>
        </View>
    )
}

const App = () => {
    const { theme } = useTheme();
    
    return(
        <Tabs 
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.container,
                    borderColor: theme.container,
                    height: 80,
                    justifyContent: 'center',
                }                
            }}
        >
            <Tabs.Screen 
                name = 'index'
                options = {{
                    title: 'Home',
                }}
            />

            <Tabs.Screen 
                name = 'order'
                options = {{
                    title: 'Order'
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