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
        alignItems: 'flex-end'
    },
    customer: {
        fontWeight: '500'
    },
    status: {
        textAlign: 'right'
    }
})

const OrderScreen = () => {
    return (
        <View>
            <Header/>
            <OrderGallery/>
        </View>
    )
}

export const OrderGallery = () => {
    const { transaction, getPaymentInfo, getOrderInfo, customers } = useData(); 
    
    const renderGalleryTransaction = ({item}) => {
        const { totalPayment } = item.amount !== undefined ? 
            getPaymentInfo(item.amount) : getPaymentInfo([]);

        const { amountToPay } = getOrderInfo(item);
        const customer = customers.find(c => c.id === item.customerId);

        return(
            <Pressable 
                style = {styles.order} 
                onPress={() => router.push(`/(order)/${item.id}`)}
            >
                <View style = {styles.orderInfo}>
                    <Text style = {styles.customer}>{customer.name}</Text>
                    <Text>{formatDate(item.date)}</Text>
                </View>
                <View style = {styles.paymentInfo}>
                    <Text>P {amountToPay.toFixed(2)}</Text>
                    <Text>P {totalPayment.toFixed(2)}</Text>
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

export default OrderScreen