import { useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function RootLayout() {
    return (
        <App/>
    )
}

const App = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            flex: 1
        }
    })

    return(
        <View style = {styles.container}>
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
        </View>
    )
}