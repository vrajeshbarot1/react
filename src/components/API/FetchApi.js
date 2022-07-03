import React, { useState } from "react";

const FetchApi = () => {
    
    const [data, setData] = useState('');
    const getData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => console.log(json));

    }
    return ( 
        <>
            <button onClick={getData}>
                get
            </button>
        </>
     );
}
 
export default FetchApi;