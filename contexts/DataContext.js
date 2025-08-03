import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [pending, setPending] = useState(10)
    const [sales, setSales] = useState(1000);
    
    const [items, setItems] = useState([
        {id: 1, name: 'Pythons Shirt', price: 300},
        {id: 2, name: 'Turing Shirt', price: 330},
        {id: 3, name: 'Ada Shirt', price: 330},
        {id: 4, name: 'Old Pythons Shfvfirt', price: 330},
        {id: 5, name: 'Tote Bag', price: 189},
        {id: 6, name: 'Keychain', price: 39},
        {id: 7, name: 'Sticker Set', price: 39},
    ]);

    const data = items.length % 2 !== 0 ? [...items, {id: 'spacer', name: '', price: 0, isSpacer: true}] : items

    const [transaction, setTransaction] = useState([
        {id: 1, amount: 1000, pending: false},
        {id: 2, amount: 340, pending: true},
        {id: 3, amount: 200, pending: true}
    ]);


    useEffect(() => {
        const newSalesTotal = transaction.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);

        const pendingOrders = transaction.filter(transaction => transaction.pending === true).length;

        setPending(pendingOrders);
        setSales(newSalesTotal);
    }, [transaction]);

    
    return (
        <DataContext.Provider value={{
            data,
            transaction,
            pending,
            sales,
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