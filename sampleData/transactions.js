export const transactionsData = [
    {
        id: 1, 
        customerId: 1, 
        amount: [
            {
                id: 1,
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
                id: 3
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
                id: 4,
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
];

export default transactionsData;