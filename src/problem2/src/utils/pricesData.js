const fetchPriceData = async () => {
    try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export { fetchPriceData };