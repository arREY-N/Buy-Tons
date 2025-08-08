import { useTheme } from "@/contexts/ThemeContext";
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import StyledText from "./styledText";

export const Header = () => {
    const { theme, toggleTheme, AppColors } = useTheme();

    const styles = StyleSheet.create({
        title: {
            color: theme.text,
            fontSize: 36,
            fontWeight: 'bold',
            textAlign: 'center'
        },
        subtitle: {
            color: theme.text,
            fontSize: 16,
            textAlign: 'center'
        }
    });

    return(
        <View style={{margin: 10}}>
            <Pressable onPress={toggleTheme}>
                <Text style = {styles.title}>Buy Tons</Text>
            </Pressable>
        </View>
    );
}

export const SectionHeading = ({title, link = null, onPress = null}) => {
    const styles = StyleSheet.create({
        heading: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 5,
            marginVertical: 10,
        },
        title: {
            fontWeight: 'bold', 
            fontSize: 18, 
        }
    })
    return(
        <View style={styles.heading}>
            <StyledText style={styles.title}>{title ? title : 'Title'}</StyledText>
            {
                link !== null ? 
                    <>
                        <Pressable onPress={() => onPress}>
                            <StyledText>
                                {link}
                            </StyledText>
                        </Pressable>
                    </>
                    :
                    <></>
            }
        </View>
    )
}

export default Header;