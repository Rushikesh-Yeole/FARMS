const axios = require('axios');

const fetchMarketData = async (districtvalue, cropvalue) => {
    try {
        const res = await axios.get('https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070', {
            params: {
                'api-key': '579b464db66ec23bdd000001bcb41bb1461a44476d43e9ee7a5913a8',
                format: 'json',
                'filters[district]': districtvalue,
                'filters[commodity]': cropvalue
            },
            headers: {
                'accept': 'application/json' // Change to 'application/xml' if you need XML
            }
        });

        return res.data.records[0].modal_price;

        // console.log(res.data.records[0].modal_price);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

module.exports = fetchMarketData;
