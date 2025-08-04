import { StyledText } from '@/components/styledText';
import globals from '@/constants/globals';
import { useTheme } from '@/contexts/ThemeContext';
import { Platform, StyleSheet, View } from "react-native";

export const Info = ({title, value, style}) => {
    const { theme } = useTheme()

    const styles = StyleSheet.create({
        infoContainer: {
            backgroundColor: theme.container,
            flex: 1,
            margin: 5, 
            padding: 15,
            borderRadius: globals.radius,
            ...Platform.select({
                ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4},
                    shadowOpacity: 0.2,
                    shadowRadius: 6
                },
                android: {
                    elevation: 10,
                }
            }),
        },
        infoValue: {
            textAlign: 'right',
            fontSize: 30,
            fontWeight: '500',
        }
    })

    return(
        <View style = {styles.infoContainer}>
            <StyledText style = {styles.infoTitle}>{title}</StyledText>
            <StyledText style = {styles.infoValue}>{value}</StyledText>
        </View>
    )
}

export default Info