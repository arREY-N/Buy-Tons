import { createContext, useContext, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";

export const COLOR_PALETTE = {
    light:{
        text: 'hsl(240, 7%, 6%)',
        background: 'hsl(0, 0%, 85%)',
        container: 'hsl(0, 0%, 95%)',
        placeholder: 'rgba(0, 0, 0, 0.5)'
    },
    dark: {
        text: 'hsl(0, 0%, 90%)',
        background: 'hsl(240, 7%, 6%)',
        container: 'hsl(252, 9%, 12%)',
        placeholder: 'rgba(255, 255, 255, 0.3)'
    }
};

export const AppColors = {
    primary: 'hsl(0, 71%, 26%)',
    secondary: 'hsl(0, 0%, 9%)',
    highlight: 'hsla(0, 100%, 50%, 1.00)',
}

const ThemeContext = createContext({
    theme: COLOR_PALETTE.light,
    toggleTheme: () => {}
});

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(context === null){
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};

export const ThemeProvider = ({children}) => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme === 'dark');

    const theme = isDark ? COLOR_PALETTE.dark : COLOR_PALETTE.light;

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    const ContainerStyle = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
            flex: 1,
        },
        content: {
            marginHorizontal: 10
        }
    })

    const value = { 
        theme, 
        toggleTheme, 
        AppColors, 
        ContainerStyle 
    };

    return(
        <ThemeContext.Provider value = { value }>
            {children}
        </ThemeContext.Provider>
    );
};