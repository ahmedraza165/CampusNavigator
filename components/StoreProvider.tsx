'use client'
import React, {useState} from "react";
import {StoreContext} from "@/context";


const StoreProvider = ({children}: {children: React.ReactNode}) => {

    const [popupOpen, setPopupOpen] = useState<boolean>(false);
    const [pricePopup, setPricePopup] = useState(false)
    console.log(popupOpen)
    return (
        <StoreContext.Provider value={{ popupOpen, setPopupOpen, pricePopup, setPricePopup }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;

