export const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    })

    return formatter.format(date);
}

export const formatDateOnly = (timestamp) => {
    const date = new Date(timestamp);

    const formatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    })

    return formatter.format(date);
}

export default formatDate