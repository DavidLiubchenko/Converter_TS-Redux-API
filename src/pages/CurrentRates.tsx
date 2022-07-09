import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
// @ts-ignore
import S from '../styles/dataLines.module.scss'

const CurrentRates = () => {
    const [formattingName, setFormattingName] = useState(['']);
    const [formattingValues, setFormattingValues] = useState([0]);
    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const fetchData = useSelector((state: RootState) => state.modal.fetchResponse.value)

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
                <div className={S.line}>{`Curr: ${formattingName[idx]}, Rate: ${formattingValues[idx].toFixed(4)} ${currentlyCurrency}`}</div>
            </div>)}
        </div>
    );
};

export default CurrentRates;
