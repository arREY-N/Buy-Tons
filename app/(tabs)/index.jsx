import { Header } from '@/components/header';
import { ItemGallery, Overview } from '@/components/overview';
import StyledText from '@/components/styledText';
import { useTheme } from '@/contexts/ThemeContext';
import {
    Pressable,
    View
} from 'react-native';

const app = () => {
    const {ContainerStyle, toggleTheme} = useTheme();
    
    return (
        <View style={ContainerStyle.container}>
            <View style={ContainerStyle.content}>
                <Header/>

                <Pressable onPress={() => toggleTheme()}>
                    <StyledText>Theme</StyledText>
                </Pressable>
                
                <Overview/>       
                <ItemGallery/>
            </View>
        </View>
    )
}

export default app 
