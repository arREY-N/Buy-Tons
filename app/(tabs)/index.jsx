import { Header } from '@/components/header';
import { ItemGallery, Overview } from '@/components/overview';
import { useTheme } from '@/contexts/ThemeContext';
import {
    StyleSheet,
    View
} from 'react-native';

const app = () => {
    const {theme, toggleTheme} = useTheme();

    const styles = StyleSheet.create({  
        container: {
            marginHorizontal: '2%',
            backgroundColor: theme.background,
            flex: 1,
            flexDirection: 'column',
        }  
    });
    
    return (
        <View style={styles.container}>
            <Header/>
            <Overview/>       
            <ItemGallery/>
        </View>
    )
}

export default app 
