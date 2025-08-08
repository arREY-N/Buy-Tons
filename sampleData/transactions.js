export const transactionsData = [
    {
        id: 1,
        customerId: 1,
        amount: [{ id: 200 }, { id: 100 }],
        date: new Date(2025, 7, 7).getTime(), // today
        status: 'CLAIMED',
        items: [{ id: 1, quantity: 1 }],
        voucherId: 3
    },
    {
        id: 2,
        customerId: 2,
        amount: [{ id: 500 }, { id: 100 }],
        date: new Date(2025, 7, 6).getTime(), // 1 day ago
        status: 'READY',
        items: [{ id: 1, quantity: 2 }],
        voucherId: 1
    },
    {
        id: 3,
        customerId: 3,
        amount: [{ id: 200 }, { id: 200 }],
        date: new Date(2025, 7, 5).getTime(), // 2 days ago
        status: 'DOWN',
        items: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }]
    },
    {
        id: 4,
        customerId: 4,
        amounts: [],
        date: new Date(2025, 7, 4).getTime(), // 3 days ago
        status: 'DOWN',
        items: [{ id: 3, quantity: 2 }]
    },
    {
        id: 5,
        customerId: 4,
        amount: [{ id: 100 }, { id: 500 }],
        date: new Date(2025, 7, 3).getTime(), // 4 days ago
        status: 'READY',
        items: [{ id: 1, quantity: 1 }]
    },
    {
        id: 6,
        customerId: 1,
        amount: [{ id: 500 }],
        date: new Date(2025, 7, 2).getTime(), // 5 days ago
        status: 'FULL',
        items: [
            { id: 2, quantity: 1 },
            { id: 5, quantity: 1 }
        ],
        voucherId: 2
    },
    {
        id: 7,
        customerId: 2,
        amount: [{ id: 1000 }],
        date: new Date(2025, 7, 1).getTime(), // 6 days ago
        status: 'CLAIMED',
        items: [
            { id: 1, quantity: 2 },
            { id: 3, quantity: 1 },
            { id: 7, quantity: 1 }
        ]
    },
    {
        id: 8,
        customerId: 3,
        amount: [{ id: 100 }, { id: 200 }],
        date: new Date(2025, 6, 31).getTime(), // 7 days ago
        status: 'READY',
        items: [
            { id: 6, quantity: 1 },
            { id: 5, quantity: 1 },
            { id: 2, quantity: 1 }
        ],
        voucherId: 4
    },
    {
        id: 9,
        customerId: 4,
        amount: [{ id: 200 }],
        date: new Date(2025, 7, 6).getTime(), // 1 day ago
        status: 'CLAIMED',
        items: [{ id: 5, quantity: 1 }]
    },
    {
        id: 10,
        customerId: 2,
        amount: [{ id: 100 }, { id: 100 }],
        date: new Date(2025, 7, 4).getTime(), // 3 days ago
        status: 'PRODUCTION',
        items: [{ id: 1, quantity: 1 }]
    }
];

export default transactionsData;
