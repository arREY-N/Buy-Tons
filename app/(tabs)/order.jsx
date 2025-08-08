import { Header, SectionHeading } from '@/components/header'
import { CustomTextInput } from '@/components/input'
import StyledText from '@/components/styledText'
import globals from '@/constants/globals'
import useData from '@/contexts/DataContext'
import { useTheme } from '@/contexts/ThemeContext'
import formatDate from '@/utilities/date'
import { router } from 'expo-router'
import React from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'

const filterOptions = [
    {id: 1, filter: 'Claimed'},
    {id: 2, filter: 'Ready'},
    {id: 3, filter: 'Production'},
    {id: 4, filter: 'Full'},
    {id: 5, filter: 'Downpayment'},
]

const OrderScreen = () => {
    const { ContainerStyle, theme } = useTheme();
    const { 
        datedTransaction, 
        searchOrder, 
        setSearchOrder,  
        activeFilters,
        setActiveFilters
    } = useData();

    const styles = StyleSheet.create({
        filter:{
            minWidth: 90,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: globals.radius + 5,
            borderWidth: 1,
            borderColor: theme.placeholder,
            alignItems: 'center',
            marginHorizontal: 2
        },
        activeFilter: {
            backgroundColor: theme.container,
            fontWeight: '700'
        },
        filterGroup:{
            overflow: 'scroll',
            marginVertical: 10,
            gap: 5,
            flex: 1,
            flexDirection: 'row'
        }
    });

    const handleToggleFilter = (filterId) => {
        setActiveFilters(prev => {
            if(prev.includes(filterId)){
                return prev.filter(id => id !== filterId);
            } else {
                return [...prev, filterId]
            }
        })
    }
    
    const renderFilterItem = ({item}) => {
        const isActive = activeFilters.includes(item.filter);

        return(
            <Pressable 
                style = {[
                    styles.filter,
                    isActive && styles.activeFilter
                ]} 
                onPress={() => handleToggleFilter(item.filter)}
            >
                <StyledText style = {isActive && styles.activeFilter}>{item.filter}</StyledText>
            </Pressable>
        )
    }
    return (
        <View style = {ContainerStyle.container}>
            <View style = {ContainerStyle.content}>
                <Header/>
                <CustomTextInput
                    placeholder={'Search'} 
                    value={searchOrder}
                    onChangeText={setSearchOrder} />
                
                <View style={styles.filterGroup}>
                    <FlatList 
                        data={filterOptions}
                        renderItem={renderFilterItem}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={filter => filter.id}/>
                </View>
                {
                    Object.entries(datedTransaction).map(([date, transactions]) => (
                        <View key={date}>
                            <SectionHeading title={`${date}`}/>
                            <OrderGallery transactionData = {transactions}/>
                        </View>
                    ))
                }
            </View>
        </View>
    )
}

export const OrderGallery = ({transactionData}) => {
    const { customers } = useData(); 
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        order: {
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: theme.container,
            flexDirection: 'row',
            marginVertical: 5,
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
        const customer = customers.find(c => c.id === item.customerId);

        return(
            <Pressable
                key = {item.id}
                style = {styles.order} 
                onPress={() => router.push(`/(order)/${item.id}`)}
            >
                <View style = {styles.orderInfo}>
                    <StyledText style = {styles.customer}>{customer.name}</StyledText>
                    <StyledText>{formatDate(item.date)}</StyledText>
                </View>
                <View style = {styles.paymentInfo}>
                    <StyledText>{item.status}</StyledText>
                </View>
            </Pressable>
        )
    }

    return(
        <FlatList
            data={transactionData}
            renderItem={renderGalleryTransaction}
            keyExtractor={transactionData => transactionData.id}
        /> 
    )
}

export default OrderScreen