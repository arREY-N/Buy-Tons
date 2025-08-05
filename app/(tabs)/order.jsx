import { Header } from '@/components/header'
import useData from '@/contexts/DataContext'
import formatDate from '@/utilities/date'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
    order: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 16,
        margin: 5,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    paymentInfo: {
        alignContent: 'right'
    },
    customer: {
        fontWeight: '500'
    },
    status: {
        textAlign: 'right'
    }
})

const orderScreen = () => {
    return (
        <View>
            <Header/>
            <OrderGallery/>
        </View>
    )
}

export const OrderGallery = () => {
    const { transaction } = useData(); 
    
    const renderGalleryTransaction = ({item}) => {
        return(
            <Pressable 
                style = {styles.order} 
                onPress={() => router.push(`/(order)/${item.id}`)}
            >
                <View style = {styles.orderInfo}>
                    <Text style = {styles.customer}>{item.customer}</Text>
                    <Text>{formatDate(item.date)}</Text>
                </View>
                <View style = {styles.paymentInfo}>
                    <Text>Pitem.amount.toFixed(2)</Text>
                    <Text style = {styles.status}>{item.status}</Text>
                </View>
            </Pressable>
        )
    }

    return(
        <FlatList
            data={transaction}
            renderItem={renderGalleryTransaction}
            keyExtractor={transaction => transaction.id}
        /> 
    )
}

export default orderScreen