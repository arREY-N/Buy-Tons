import Info from '@/components/info';
import { StyleSheet } from "react-native";
import StyledText from './styledText';

export const ValueCard = ({title, value}) => {
    const styles = StyleSheet.create({
        title: {
            textAlign: 'center',
        }, 
        value: {
            textAlign: 'center',
            fontSize: 30,
            fontWeight: '500',
        }
    })
    
    return(
        <Info>
            <StyledText style={styles.title}>{title}</StyledText>
            <StyledText style={styles.value}>{value}</StyledText>
        </Info>
    );
}

export default ValueCard