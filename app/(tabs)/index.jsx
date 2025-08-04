import { Header } from '@/components/header';
import { ItemGallery, Overview } from '@/components/overview';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';

const app = () => {
    const {theme, toggleTheme} = useTheme();

    const styles = StyleSheet.create({  
        container: {
            backgroundColor: theme.background,
            flex: 1,
            flexDirection: 'column',
        }  
    });
    
    return (
        <View style={styles.container}>
            <Pressable onPress={() => toggleTheme()}>
                <Text>Theme</Text>
            </Pressable>
            <Header/>
            <Overview/>       
            <ItemGallery/>
        </View>
    )
}

export default app 
