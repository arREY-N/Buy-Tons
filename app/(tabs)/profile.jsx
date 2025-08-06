import StyledText from '@/components/styledText';
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { View } from 'react-native';

const profile = () => {
    const { ContainerStyle } = useTheme();

    return (
        <View style = {ContainerStyle.container}>
            <StyledText>profile</StyledText>
        </View>
    )
}

export default profile