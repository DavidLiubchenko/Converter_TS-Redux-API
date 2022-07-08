import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../app/store";

const Page2 = () => {
    const [formattingName, setFormattingName] = useState(['']);
    const [formattingValues, setFormattingValues] = useState([0]);

    const fetchData = useSelector((state: RootState) => state.modal.fetchResponse.value)
    const currCurrency = useSelector((state: RootState) => state.modal.currency.value)

    useEffect(() => {
        let arrN = [];
        let arrV = [];
        for (let key in fetchData) {
            arrN.push(key)
            arrV.push(fetchData[key])
        }
        setFormattingName(arrN)
        setFormattingValues(arrV)

    }, [fetchData]);

    return (
        <div>
            {formattingName.map((el, idx) => <div style={{display: "flex"}}>
                <div>{`Index:${idx}, Curr: ${formattingName[idx]}, Rate: ${formattingValues[idx]} ${currCurrency}`}</div>
            </div>)}
        </div>
    );
};

export default Page2;
