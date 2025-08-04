import StyledText from "@/components/styledText";
import useData from "@/contexts/DataContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";


export const ItemDetailScreen = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.background
        }
    })
    
    const { id } = useLocalSearchParams();
    const { items } = useData();
    
    const item = items.find(i => i.id.toString() === id.toString());

    if(item){
        return(
            <View style = {styles.container}>
                <StyledText>{item.name}</StyledText>
                <StyledText>P {item.price.toFixed(2)}</StyledText>
            </View>
        )
    }

    return(
        <View>
            <StyledText>Item Not Found!</StyledText>
        </View>
    )
}

export default ItemDetailScreen

