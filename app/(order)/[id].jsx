import StyledText from "@/components/styledText";
import SumRow from "@/components/sumRow";
import globals from "@/constants/globals";
import useData from "@/contexts/DataContext";
import { useTheme } from "@/contexts/ThemeContext";
import formatDate from "@/utilities/date";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

const OrderDetailScreen = () => {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        button: {
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginTop: 10,
            borderRadius: globals.radius,
            backgroundColor: theme.container,
            height: 50,        
        }
    })

    const { id } = useLocalSearchParams();
    const { transaction } = useData();
    
    const order = transaction.find(t => t.id.toString() === id.toString());
    
    if(order){        
        return(
            <View style = {{margin: 10}}>
                <SumRow 
                    style = {{marginBottom: 15}}
                    title = {formatDate(order.date)}
                    value = {order.status} />

                <ItemGallery 
                    order = {order} />

                <OrderSummary 
                    order = {order} />

                <View style = {{flexDirection: 'row', gap: 10}}>
                    <Pressable style = {styles.button}>
                        <StyledText>Update</StyledText>
                    </Pressable>

                    <Pressable style = {[styles.button, {flex: 2}]}>
                        <StyledText>Order Claimed</StyledText>
                    </Pressable>
                </View>

                <Pressable style = {[styles.button, {backgroundColor: 'red'}]}>
                    <StyledText>Delete Order</StyledText>
                </Pressable>
            </View>
        )
    }

    return(
        <StyledText>Order not found</StyledText>
    )
}

const OrderSummary = ({order}) => {
    const styles = StyleSheet.create({
        container: {
            marginTop: 10,
            width: '100%',
        },
        sumRow: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        customerInfo: {
            marginLeft: 16
        },
        paymentInfo: {
            marginLeft: 16
        }
    });
    
    const { customers, getPaymentInfo, getOrderInfo } = useData();
    
    const { amountToPay, discount } = getOrderInfo(order);
    
    const { totalPayment, paymentDetails } = order.amount !== undefined ?
        getPaymentInfo(order.amount) : getPaymentInfo([]);
    
    const customer = customers.find(c => c.id === order.customerId)

    const balance = amountToPay - (totalPayment + discount);

    return(
        <View style = {styles.container}>
            <StyledText style={{fontWeight: 'bold', marginBottom: 5}}>
                Customer Information
            </StyledText>
            
            <View style = {styles.customerInfo}>
                <SumRow 
                    title = {"Name"}
                    value = {customer.name} />

                <SumRow 
                    title = {"Type"}
                    value = {customer.type === undefined ? "--" : customer.type} />
                
                {
                    customer.type === 'OUTSIDER' ?
                        <SumRow 
                            title = {"Contact Person"}
                            value = {customer.contactPerson ? customer.contactPerson : '<N/A>'} />
                        : <></>
                }
                {
                    customer.section !== undefined ? 
                        <SumRow 
                            title = {"Section"}
                            value = {customer.section === undefined ? "--" : customer.section} />
                        : <></>
                }
                {
                    customer.contact !== undefined ?
                        <SumRow 
                            title = {"Contact Number"}
                            value = {`0${customer.contact}`} />
                        : <></>
                }
                {
                    customer.facebook !== undefined ?
                        <SumRow 
                            title = {"Facebook"}
                            value = {customer.facebook} />
                        : <></>
                }
            </View>

            <StyledText style={{fontWeight: 'bold', marginTop: 10, marginBottom: 5}}>
                Payment
            </StyledText>
            
            <View style = {styles.paymentInfo}>
                <SumRow 
                    title = {"Total"}
                    value = {`P ${amountToPay.toFixed(2)}`} />

                {
                    discount !== 0 ?
                        <SumRow 
                            title = {"Discount"}
                            value = {`-P ${discount.toFixed(2)}`} />
                        : <></>    
                }
                {
                    paymentDetails !== null ? 
                    <>
                        <SumRow 
                            title = {"History"}
                            value = {""} />
                        {
                            paymentDetails.map((payment, index) => {
                                    return (
                                        <SumRow 
                                            key = {index}
                                            title = {`     ${formatDate(payment.date)}`}
                                            value = {`P ${payment.amount.toFixed(2)}`} />
                                    )
                                })
                        }
                    </>
                    : 
                    <>
                        <SumRow 
                            title = {"Paid"}
                            value = {"P 0.00"} />
                    </>
                }
            </View>
            <hr style={{width: '100%', marginVertical: 5}} />

            <SumRow 
                title = {"Balance"}
                value = {`P ${balance.toFixed(2)}`} />
        </View>
    )
}

const ItemGallery = ({order}) => {
    const { theme } = useTheme();
    
    const styles = StyleSheet.create({
        orderItem: {
            backgroundColor: theme.container,
            flexDirection: 'row',
            marginBottom: 10,
            padding: 10,
            borderRadius: globals.radius,
            alignItems: 'center'
        },
        itemImage:{
            width: 70,
            height: 70,
            borderWidth: 1,
            borderRadius: globals.radius-5,
            borderColor: theme.background,
            marginRight: 10
        },
        itemInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            alignItems: 'flex-end'
        },
        price: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlignVertical: 'bottom'
        }
    });

    const { getOrderInfo } = useData();
    const { orderedItems } = getOrderInfo(order);

    const renderOrderItems = ({ item }) => {
        
        const price = item.price === undefined ? 0 : item.price;
        const total = price * item.quantity;
        return(
            <View style = {styles.orderItem}>
                <View>
                    <View style = {styles.itemImage}/>
                </View>
                <View style = {styles.itemInfo}>
                    <View>
                        <StyledText style={{marginBottom: 5}}>{item.name}</StyledText>
                        <StyledText>P {price.toFixed(2)} x {item.quantity}</StyledText>
                    </View>
                    <StyledText style = {styles.price}>P {total.toFixed(2)}</StyledText>
                </View>
            </View>
        )
    }

    return(
        <FlatList
            data={orderedItems}
            renderItem={renderOrderItems}
            keyExtractor={o => o.id}
            numColumns={1}
        />
    )
}

export default OrderDetailScreen