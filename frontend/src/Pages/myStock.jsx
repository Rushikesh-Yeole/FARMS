    import React, { useEffect, useState } from 'react';
    import { getMyreq } from '../store/myStockInfo';
    // import { use } from 'react';
    import { useSelector,useDispatch } from 'react-redux';

    const MyStock = () => {
        const [stocks,useStocks] = useState([]);
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(getMyreq()).then((result)=>{
                useStocks(result.payload)
            })
        },[dispatch])
        // Fallback to empty array if `stock` is null/undefined

        // Handle 401 Unauthorized case (if you are fetching stocks from an API)
        if (stocks === null || stocks === undefined) {
            return <div>You are not authorized or no data available.</div>;
        }

        return (
            <>
                <div>My Stock</div>
                <ul>
                    {stocks.length > 0 ? (
                        stocks.map((ele, index) => (
                            <li key={index}>{ele.crop}</li>
                        ))
                    ) : (
                        <p>No stocks available.</p> // If no stocks are available
                    )}
                </ul>
            </>
        );
    };

    export default MyStock;
