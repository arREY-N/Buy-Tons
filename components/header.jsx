import {
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";

export const Header = () => {
    return(
        <View>
            <Text style = {styles.title}>Buy Tons</Text>
            <Text style = {styles.subtitle}>by Pythons</Text>
        </View>
    );
}

export const SubHead = () => {
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

const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center'
    },
    subHead:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginBottom: 10
    },
})