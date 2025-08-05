import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
    const [pending, setPending] = useState([])
    const [totalSales, setSales] = useState(1000);
    const [payments, setPayments] = useState([
        {
            id: 1,
            amount: 400,
            date: Date.now()
        },
        {
            id: 2,
            amount: 200,
            date: new Date(2025, 8, 5, 13, 20, 22)
        },
        {
            id: 3,
            amount: 100,
            date: new Date(2025, 8, 5, 13, 30, 22)
        },
        {
            id: 4,
            amount: 40,
            date: new Date(2025, 8, 4, 11, 30, 22)
        },
        {
            id: 5,
            amount: 50,
            date: new Date(2025, 8, 5, 9, 20, 22)
        },
        {
            id: 6,
            amount: 100,
            date: new Date(2025, 8, 5, 14, 20, 22)
        },
        {
            id: 7,
            amount: 70,
            date: new Date(2025, 8, 5, 13, 20, 22)
        }
    ])
    const [vouchers, setVouchers] = useState([
        {
            id: 1,
            type: 'PER',
            value: 0.05
        },
        {
            id: 2,
            type: 'PER',
            value: 0.10
        },
        {
            id: 3,
            type: 'PER',
            value: 0.15
        },
        {
            id: 4,
            type: 'AMT',
            value: 30
        }
    ])
    const [customers, setCustomers] = useState([
        {
            id: 1,
            name: 'Customer A',
            type: 'TERTIARY',
            section: 'CS33101',
            contact: 99999999,
            facebook: 'Cust A'
        }, 
        {
            id: 2,
            name: 'Customer B',
            type: 'SHS',
            section: 'SHS101',
            contact: 99999999,
            facebook: 'Cust B'
        }, 
        {
            id: 3,
            name: 'Customer C',
            type: 'FACULTY',
            contact: 99999999,
            facebook: 'Cust C'
        }, 
        {
            id: 4,
            name: 'Customer D',
            type: 'OUTSIDER',
            contactPerson: 'Contact Person A',
            contact: 99999999,
            facebook: 'Cust D'
        }, 
    ]);
    
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
        {
            id: 1, 
            customerId: 1, 
            amount: [
                {
                    id: 1,
                },
                {
                    id: 3
                },
                {
                    id: 5
                }
            ], 
            date: Date.now(), 
            status: 'PAID',
            items: [
                { id: 1, quantity: 1}, 
            ],
            voucherId: 3
        },
        {
            id: 2, 
            customerId: 2, 
            amount: [
                {
                    id: 2,
                },
                {
                    id: 4
                },
            ],  
            date: Date.now(), 
            status: 'DP',
            items: [
                { id: 1, quantity: 2}
            ],
            voucherId: 1
        },
        {
            id: 3, 
            customerId: 3, 
            amount: [
                {
                    id: 1,
                }
            ], 
            date: Date.now(), 
            status: 'CLAIMED',
            items: [
                { id: 1, quantity: 1},
                { id: 2, quantity: 1}
            ]
        },
        {
            id: 4, 
            customerId: 4,
            date: Date.now(), 
            status: 'READY',
            items: [
                { id: 3, quantity : 2}
            ]
        },
    ]);


    useEffect(() => {
        const newSalesTotal = transaction.reduce((acc, curr) => {
            return acc + curr.amount;
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