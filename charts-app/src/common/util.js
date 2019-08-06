export const processHistoricalData = (historicalData, consolidatedData = []) => {
    console.log(consolidatedData);
    const processedData = historicalData.reverse().map(item => ({
        date: item[0],
        price: Number(item[1]),
        volume: Number(item[3]),
        revenue: null,
        profit: null
    }))
    if (consolidatedData.quarter) {
        consolidatedData.quarter.map((item, index) => {
            const matchingIndex = processedData.findIndex(value => {
                // debugger
                return value.date.substr(0,7) === item;
            });
            if( matchingIndex !== -1 ) {
                processedData[matchingIndex].revenue = Number(consolidatedData.revenue[index]);
                processedData[matchingIndex].profit = Number(consolidatedData.profit[index]);
            }
        });
    }
    return processedData.reverse();
}