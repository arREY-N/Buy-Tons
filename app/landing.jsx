import { Redirect, useRouter } from 'expo-router';
import React, { useState } from 'react';

const home = () => {
    const router = useRouter();
    const [auth, setAuth] = useState(false);

    if(auth){
        console.log("Authenticated");
        return <Redirect href={"/(tabs)"}/>
    } else {
        console.log("Not Authenticated");
        return <Redirect href={"/(auth)"}/>
    }
}

export default home