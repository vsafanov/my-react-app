import React, { useEffect, useState } from 'react'


const UpdateTimer = () => {

    const [value, SetValue] = useState("Loading...");


    useEffect(() => {
        setInterval(() => {
            SetValue(new Date().toLocaleTimeString())
        //   console.log('This will run every second!');
        }, 1000);
         //return () => clearInterval(interval);
      }, []);


      return (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {value}.</h2>
        </div>
    );
    
}


export default UpdateTimer;