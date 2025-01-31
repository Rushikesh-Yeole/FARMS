import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { transreq } from "../store/transReq.js";

const GetRequests = () => {
    const dispatch = useDispatch();
    const myState = useSelector((state) => state.request);
    
    return (
        <>
            <div className="trans">
                <button onClick={() => dispatch(transreq())}>Get Data</button>
            </div>
        
           {myState.userData && myState.userData.map((e) => 
                
               <li key={e.Destination.place
               }>{e.Destination.place}</li>
           )}
        </>
    );
};

export default GetRequests; 


