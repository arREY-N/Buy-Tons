import { Header } from '@/components/header';
import { ItemGallery, Overview } from '@/components/overview';
import { useTheme } from '@/contexts/ThemeContext';
import {
    View
} from 'react-native';

const app = () => {
    const {ContainerStyle, toggleTheme} = useTheme();
    
    return (
        <View style={ContainerStyle.container}>
            <View style={ContainerStyle.content}>
                <Header/>
                <Overview/>       
                <ItemGallery/>
            </View>
        </View>
    )
}

export default app 
