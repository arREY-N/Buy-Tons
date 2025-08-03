import useData from "@/contexts/DataContext";
import { useTheme } from "@/contexts/ThemeContext";
import formatDate from '@/utilities/date';
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View } from "react-native";

const OrderDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { transaction } = useData();
    const { theme } = useTheme();

    console.log(id);
    console.log(transaction);
    
    const order = transaction.find(t => t.id.toString() === id.toString());

    console.log(order);
    
    if(order){
        return(
            <View>
                <Text>{order.customer}</Text>
                <Text>P {order.amount.toFixed(2)}</Text>
                <Text>{formatDate(order.date)}</Text>
                <Text>{order.status}</Text>
            </View>
        )
    } 

    return(
        <Text>Order not found</Text>
    )
}

export default OrderDetailScreen

export const options = {
    title: ({params}) => `Order: #${params.id}`
};