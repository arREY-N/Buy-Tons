import { Header } from '@/components/header'
import StyledText from '@/components/styledText'
import globals from '@/constants/globals'
import useData from '@/contexts/DataContext'
import { useTheme } from '@/contexts/ThemeContext'
import formatDate from '@/utilities/date'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'

const OrderScreen = () => {
    const { ContainerStyle } = useTheme();

    return (
        <View style = {ContainerStyle.container}>
            <Header/>
            <OrderGallery/>
        </View>
    )
}

export const OrderGallery = () => {
    const { transaction, getPaymentInfo, getOrderInfo, customers } = useData(); 
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        order: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: theme.container,
            flexDirection: 'row',
            marginVertical: 5,
            marginHorizontal: 10,
            padding: 15,
            borderRadius: globals.radius,
            alignItems: 'center'
        },
        paymentInfo: {
            alignItems: 'flex-end'
        },
        customer: {
            fontWeight: '500'
        }
    })

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
                    <StyledText style = {styles.customer}>{customer.name}</StyledText>
                    <StyledText>{formatDate(item.date)}</StyledText>
                </View>
                <View style = {styles.paymentInfo}>
                    <StyledText>P {amountToPay.toFixed(2)} / {totalPayment.toFixed(2)}</StyledText>
                    <StyledText>{item.status}</StyledText>
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