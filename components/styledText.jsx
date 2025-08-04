import { useTheme } from "@/contexts/ThemeContext";
import { Text } from "react-native";

export const StyledText = ({children, style, ...props}) => {
    const { theme } = useTheme();

    const defaultstyle = {
        color: theme.text 
    };

    return(
        <Text style = {[defaultstyle, style]} {...props}>
            {children}
        </Text>
    )
}

export default StyledText