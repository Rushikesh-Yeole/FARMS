import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { confReq } from '../store/requsetstatusSlice';

const ConfRequest = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);

    useEffect(() => {
        dispatch(confReq())
            .then((result) => {
                console.log(result.payload);
                 // Logging the correct payload
                 const response = result.payload
                setData(response.data); // Directly setting the data
            })
            .catch((error) => {
                console.error("Error fetching request:", error);
            });
    }, [dispatch]);

    return (
        <>
            {data.length > 0 ? (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default ConfRequest;
