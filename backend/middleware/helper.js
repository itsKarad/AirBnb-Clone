const differenceBetweenDates = (d1, d2) => {
    const diffTime = Math.abs(d2 - d1);
    console.log(diffTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log(d1, d2, diffDays);
    return diffDays; 
}
// not working, returning Nan rn
const priceCalculation = (startDate, endDate, price) => {
    let total_cost = 0;
    let number_of_nights =  differenceBetweenDates(startDate, endDate);
    total_cost = number_of_nights * price;
    console.log(total_cost);
    return total_cost;
}

module.exports = {
    priceCalculation,
};