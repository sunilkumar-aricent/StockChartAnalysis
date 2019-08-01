export const processHistoricalData = (data) => {
    return data.map(item => ({
        date: item[0],
        price: item[1],
        volume: item[3]
    }))
}