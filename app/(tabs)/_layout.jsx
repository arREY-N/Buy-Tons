import { DataProvider } from "@/contexts/DataContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

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
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
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
        </View>
    )
}
