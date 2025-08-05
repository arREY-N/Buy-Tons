import { StyleSheet, View } from "react-native";
import StyledText from "./styledText";

export const SumRow = ({title, value, style}) => {

    const styles = StyleSheet.create({
        sumRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5
        },
        value: {
            fontWeight: 600
        }
    });

    return(
        <View style = {[styles.sumRow, style]}>
            <StyledText>{title}</StyledText>
            <StyledText style = {styles.value}>{value}</StyledText>
        </View>
    )
}

export default SumRow