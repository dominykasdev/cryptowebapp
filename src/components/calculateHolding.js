export const calculateProfit = (quantity, value, invested) => {
    const profit = quantity * value - invested;
    return profit;
};

export const calculateRevenue = (quantity, value) => {
    const profit = quantity * value;
    return profit;
}