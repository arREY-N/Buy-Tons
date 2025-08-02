import { router } from 'expo-router';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const app = () => {
    return (
        <View style={styles.container}>
            <Text style = {styles.text}>Buy Tons</Text>
            <Text>by Pythons</Text>
            
            <Pressable onPress={() => router.push('/profile')}>
                <Text>Profile</Text>
            </Pressable>
            <Pressable onPress={() => router.replace('/landing')}>
                <Text>Log out</Text>
            </Pressable>
        </View>
    )
}

export default app 

const styles = StyleSheet.create({
    button: {
        height: 60,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.75)',
        padding: 6,
        textAlign: 'center',
        justifyContent: 'center'
    },  
    buttonText: {
        margin: 10,
        color: 'white',
        padding: 4,
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    },  
    text: {
        color: 'black',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});