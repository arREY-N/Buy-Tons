import StyledText from "@/components/styledText";
import SumRow from "@/components/sumRow";
import globals from "@/constants/globals";
import useData from "@/contexts/DataContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

export const ItemDetailScreen = () => {
    const { ContainerStyle, theme } = useTheme();
    
    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: globals.radius,
            backgroundColor: theme.container,
            height: 50,       
        },
        itemSlide: {
            backgroundColor: theme.container,
            width: '100%',
            height: 400,
        },
        itemName: {
            fontWeight: 'bold',
            fontSize: 24
        },
        itemInfo: {
            flexDirection: 'row',
            marginVertical: 15,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        buttonText: {
            fontSize: 18, 
            fontWeight: 'bold'
        }
    })

    const { id } = useLocalSearchParams();
    const { items } = useData();
    
    const item = items.find(i => i.id.toString() === id.toString());

    if(item){
        return(
            <View style = {ContainerStyle.container}>
                <View style={styles.itemSlide}/>

                <View style = {[ContainerStyle.content, {marginHorizontal: 15}]}>
                    <View style={styles.itemInfo}>
                        <StyledText style = {styles.itemName}>{item.name}</StyledText>
                        <StyledText style = {styles.itemName}>P {item.price.toFixed(2)}</StyledText>
                    </View>

                    <SumRow 
                        title = {"In stock"}
                        value = {`250`} />

                    <SumRow 
                        title = {"Claimed"}
                        value = {`100`} />
                    
                    <SumRow 
                        title = {"Ready"}
                        value = {`100`} />
                    
                    <SumRow 
                        title = {"Production"}
                        value = {`100`} />

                    <SumRow 
                        title = {"Paid"}
                        value = {`100`} />
                    
                    <SumRow 
                        title = {"Total Sales"}
                        value = {`P10000.00`} />

                    <View style = {{flexDirection: 'row', gap: 10}}>
                        <Pressable style = {[styles.button, {backgroundColor: 'red', flex: 1}]}>
                            <StyledText style={styles.buttonText}>X</StyledText>
                        </Pressable>
    
                        <Pressable style = {[styles.button, {flex: 4}]}>
                            <StyledText style={styles.buttonText}>Update Item</StyledText>
                        </Pressable>
                    </View>
                </View>
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

