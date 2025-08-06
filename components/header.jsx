import { useTheme } from "@/contexts/ThemeContext";
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

export const Header = () => {
    const {theme} = useTheme();

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
            <Text style = {styles.title}>Buy Tons</Text>
            <Text style = {styles.subtitle}>by Pythons</Text>
        </View>
    );
}

export const SubHead = () => {
    const styles = StyleSheet.create({
        subHead:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 15,
            marginBottom: 10
        },
    })

    return(
        <View style = {styles.subHead}>
            <Text>Items</Text>
            <Pressable>
                <Text>Add New</Text>
            </Pressable>
        </View>
    );
}

export default Header;