import useData from "@/contexts/DataContext";
import formatDate from '@/utilities/date';
import { useLocalSearchParams } from "expo-router";
import { FlatList, Text, View } from "react-native";

const OrderDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const { transaction } = useData();
    
    const order = transaction.find(t => t.id.toString() === id.toString());
    
    const renderOrderItems = ({ item }) => {
        return(
            <View>
                <Text>{item.item}</Text>
                <Text>{item.quantity}</Text>
            </View>
        )
    }


    if(order){
        return(
            <View>
                <Text>{order.customer}</Text>
                <Text>P {order.amount.toFixed(2)}</Text>
                <Text>{formatDate(order.date)}</Text>
                <Text>{order.status}</Text>
                
                <FlatList
                    data={order.items}
                    renderItem={renderOrderItems}
                    keyExtractor={o => o.id}
                /> 
            </View>
        )
    } 

    return(
        <Text>Order not found</Text>
    )
}

export default OrderDetailScreen