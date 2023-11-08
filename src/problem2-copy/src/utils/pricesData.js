const fetchPriceData = async () => {
    try {
        const response = await fetch('https://interview.switcheo.com/prices.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        throw error;
    }
};

export { fetchPriceData };