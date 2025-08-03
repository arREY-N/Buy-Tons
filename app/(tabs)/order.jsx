import Header from '@/components/header'
import { ItemGallery } from '@/components/overview'
import React from 'react'
import { Text, View } from 'react-native'

const order = () => {
    return (
        <View>
            <Header/>
            <ItemGallery/>
            <Text>order</Text>
        </View>
    )
}

export default order