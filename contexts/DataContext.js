import customersData from '@/sampleData/customers';
import itemsData from '@/sampleData/items';
import paymentsData from '@/sampleData/payments';
import transactionsData from '@/sampleData/transactions';
import vouchersData from '@/sampleData/vouchers';
import { formatDateOnly } from '@/utilities/date';
import { createContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [customers, setCustomers] = useState(customersData);
    
    const [items, setItems] = useState(itemsData);

    const [searchOrder, setSearchOrder] = useState('');
    
    const [vouchers, setVouchers] = useState(vouchersData);
    const [payments, setPayments] = useState(paymentsData);
    const [transaction, setTransaction] = useState(transactionsData);
    const [activeFilters, setActiveFilters] = useState([]);

    const [searchResults, setSearchResults] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    
    const [filteredTransaction, setFilteredTransaction] = useState(transaction);
    const [datedTransaction, setDatedTransaction] = useState({});
    const [claimed, setClaimed] = useState([]);
    const [unclaimed, setUnclaimed] = useState([]);
    const [production, setProduction] = useState([]);
    const [fullyPaid, setFullyPaid] = useState([])
    const [downpayment, setDownpayment] = useState([]);
    const [totalSales, setSales] = useState(0);
    
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
        if(searchOrder){
            const searchedCustomer = customers.find(c => 
                c.name.toUpperCase() === searchOrder.toUpperCase());
        
            if(searchedCustomer){
                const customerOrders = filteredTransaction.filter(t => t.customerId === searchedCustomer.id);       
                setSearchResults(customerOrders);
            }
        } else {
            setSearchResults([]);
        }
    }, [searchOrder]);
    
    useEffect(() => {
        const newFilteredResults = [];

        if(activeFilters.length > 0){
            activeFilters.forEach(filter => {
                console.log(filter);
                
                const currentFilter = transactionsData.filter(t => t.status === filter.toUpperCase())
                console.log(currentFilter);
                
                newFilteredResults.push(...currentFilter);
            })
            
            console.log('filtered: ', newFilteredResults);
            
            setFilterResults(newFilteredResults);  
        } else {
            setFilterResults([])
        }
    }, [activeFilters]);
    
    useEffect(() => {
        console.log("here");
        if(searchResults.length > 0 || filterResults.length > 0){

            const smaller = searchResults.length > filterResults.length ? filterResults : searchResults;
            const larger = searchResults.length > filterResults.length ? searchResults : filterResults;
            
            const set1 = new Set(smaller);
            
            console.log("Set1: ", set1);

            const intersection = larger.filter(element => set1.has(element));
            

            if(intersection !== undefined){
                console.log('und');
                setFilteredTransaction(intersection);
            } else {
                console.log('larger');
                setFilteredTransaction(larger);
            }
        } else {
            console.log('kvbjdf');
            
            setFilteredTransaction(transactionsData);
        }
    }, [searchOrder, activeFilters]);


    useEffect(() => {
        let computedSales = 0;
        const datedTransactions = {};
        const newClaimed = [];
        const newUnclaimed = [];
        const newProduction = [];
        const newFullyPaid = [];
        const newDownpayment = []
        
        filteredTransaction.forEach((curr, _) => {
            const amounts = curr.amount;
            const transactionDate = formatDateOnly(curr.date);

            if(!datedTransactions[transactionDate]){
                datedTransactions[transactionDate] = [];
            }

            datedTransactions[transactionDate].push(curr);

            if(amounts !== undefined){
                const { totalPayment } = getPaymentInfo(amounts);
                computedSales += totalPayment;
            }

            switch(curr.status) {
                case 'CLAIMED':
                    newClaimed.push(curr);
                    break;
                case 'READY':
                    newUnclaimed.push(curr);
                    break;
                case 'PRODUCTION':
                    newProduction.push(curr);
                    break;
                case 'FULL':
                    newFullyPaid.push(curr);
                    break;   
                case 'DOWN':
                    newDownpayment.push(curr);
                    break;
                default:
                    console.log('Check order status of Order ID:', curr.id);
            }
        });

        const sortedData = () => {
            const entries = Object.entries(datedTransactions);

            entries.sort((a,b) => {
                const dateA = new Date(a[0]);
                const dateB = new Date(b[0]);
                return dateB - dateA;
            });

            return Object.fromEntries(entries);
        }

        setClaimed(newClaimed);
        setUnclaimed(newUnclaimed);
        setProduction(newProduction);
        setFullyPaid(newFullyPaid);
        setDownpayment(newDownpayment);
        setDatedTransaction(sortedData);
        setSales(computedSales);
    }, [filteredTransaction, activeFilters]);
        
    return (
        <DataContext.Provider value={{
            data,
            items,
            setItems,

            transaction,
            setTransaction,
            
            totalSales,
            setSales,
            
            customers,
            setCustomers,
            
            vouchers,
            setVouchers,
            
            payments, 
            setPayments,
            
            claimed,
            unclaimed,
            setClaimed,
            
            production,
            setProduction,
            
            fullyPaid,
            setFullyPaid,
            
            downpayment,
            setDownpayment,

            datedTransaction,
            setDatedTransaction,
            
            searchOrder,
            setSearchOrder,

            activeFilters,
            setActiveFilters,

            getOrderInfo,
            getPaymentInfo,
        }}>
            {children}
        </DataContext.Provider>
    );
}


export default useData