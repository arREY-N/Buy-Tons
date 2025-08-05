import customersData from '@/sampleData/customers';
import itemsData from '@/sampleData/items';
import paymentsData from '@/sampleData/payments';
import transactionsData from '@/sampleData/transactions';
import vouchersData from '@/sampleData/vouchers';
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [pending, setPending] = useState([])
    const [totalSales, setSales] = useState(0);
    const [vouchers, setVouchers] = useState(vouchersData);
    const [payments, setPayments] = useState(paymentsData);
    const [customers, setCustomers] = useState(customersData);
    const [items, setItems] = useState(itemsData);
    const [transaction, setTransaction] = useState(transactionsData);

    const data = items.length % 2 !== 0 ? [...items, {id: 'spacer', name: '', price: 0, isSpacer: true}] : items

    const getOrderInfo = (order) => {
        const lightOrders = order.items;
        const discountId = order.voucherId;
        
        const enrichedItems = lightOrders.map(lightOrder => {
            const item = items.find(i => i.id === lightOrder.id);
            
            if(item){
                return{
                    ...item,
                    quantity: lightOrder.quantity
                };
            }

            console.warn(`Product ${lightOrder.id} not found.`);
            return null;
        }).filter(Boolean);
        
        const orderTotal = enrichedItems.reduce((acc, curr) => {
            return acc + (curr.price * curr.quantity);
        }, 0);

        let discount = 0;

        if(discountId !== undefined){
            const voucher = vouchers.find(v => v.id === discountId);

            if(voucher.type == 'PER'){
                discount = (orderTotal * voucher.value)
            }
            if(voucher.type === 'AMT'){
                discount = voucher.value
            }
        } 
        
        return({
            orderedItems: enrichedItems,
            amountToPay: orderTotal,
            discount
        });
    };

    const getPaymentInfo = (lightPayments) => {
        const enrichedPayments = lightPayments.map(lightPayment => {
            const payment = payments.find(p => p.id === lightPayment.id);

            return payment ? payment : null 
        });

        const totalPayment = enrichedPayments.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        
        return {
            paymentDetails: enrichedPayments,
            totalPayment: totalPayment
        };
    }

    useEffect(() => {
        const newSalesTotal = transaction.reduce((acc, curr) => {
            const amounts = curr.amount;

            let orderPayments = 0; 

            if(amounts !== undefined){
                const { totalPayment } = getPaymentInfo(amounts);
                orderPayments = totalPayment;        
            }
            
            return acc + orderPayments;
        }, 0);
        
        const pendingOrders = transaction.filter(transaction => transaction.status !== "DP");

        setPending(pendingOrders);
        setSales(newSalesTotal);
    }, [transaction]);
    
    return (
        <DataContext.Provider value={{
            items,
            data,
            transaction,
            pending,
            totalSales,
            customers,
            vouchers,
            payments, 
            getOrderInfo,
            getPaymentInfo,
            setPayments,
            setVouchers,
            setCustomers,
            setSales,
            setItems,
            setPending,
            setTransaction
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);

    if(context === null){
        throw new Error('useData must be used within a DataProvider');
    }

    return context;
};

export default useData