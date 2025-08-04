import { StyledText } from '@/components/styledText';
import globals from '@/constants/globals';
import { useTheme } from '@/contexts/ThemeContext';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from "react-native";

export const ItemBox = ({item}) => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        empty: {
            backgroundColor: theme.container,
            flex: 1,
            margin: 5
        },
        item:{
            backgroundColor: theme.container,
            borderRadius: globals.radius,
            flex: 1,
            alignItems: 'center',
            margin: 5
        },
        itemImage: {
            backgroundColor: globals.placeholder,
            height: 150,
            width: '100%',
            borderTopEndRadius: globals.radius,
            borderTopStartRadius: globals.radius
        },
        itemInfo: {
            width: '90%',
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    });

    return(
        <Pressable 
            style = {styles.item} 
            onPress={() => router.push(`(item)/${item.id}`)}
        >
            <View style={styles.itemImage}/>
            <View style = {styles.itemInfo}>
                <StyledText>{item.name}</StyledText>
                <StyledText>P{item.price.toFixed(2)}</StyledText>
            </View>
        </Pressable>
    )       
}

export default ItemBox