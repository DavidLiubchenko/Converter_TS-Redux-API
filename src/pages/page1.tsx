import React, {useEffect, useState} from 'react';
import S from '../styles/input.module.scss'
import {data} from '../data/pairs.jsx'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateFetchData} from '../features/modal/modalSlice'

const placeHolder = '100 usd'

const Page1 = () => {
    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const arrCurrencies = useSelector((state: RootState) => state.modal.fetchCurrencies.value)
    const dispatch = useDispatch()
    const [userText, setUserText] = useState<string>('');
    const [baseCurr, setBaseCurr] = useState<string>(currentlyCurrency)
    const [convertValue, setConvertValue] = useState<string>('')
    const [pairs, setPairs] = useState<string[]>([]);
    const [showAxiosData, setShowAxiosData] = useState<any>([]);

    // @ts-ignore
    const handlerFind = () => {
        setShowAxiosData([])
        let regex = /[\d|,|.|e|E|\+]+/g;
        let findValue = userText.match(regex)
        if (findValue) {
            setConvertValue(findValue[0])
        }

        let text = userText.split(' ').filter(el => el !== '')
        let findData: string[] = [];
        text.forEach(el => {
            if (el.length === 3) {
                let index = data.findIndex(data => data.toUpperCase() === el.toUpperCase())
                if (index !== -1) {
                    findData.push(data[index])
                }
            }
        })
        if(findData.length) {
            setPairs([findData[0], baseCurr||currentlyCurrency])
        }
        setUserText('')

    }

    useEffect(() => {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "NxGoLaAw5MBMAgNBoqxFBjISYUBpViZD");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };
        if (currentlyCurrency.length) {
            // @ts-ignore
            fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${arrCurrencies}&base=${currentlyCurrency}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    // @ts-ignore
                    dispatch(updateFetchData(result.rates))
                })
                .catch(error => console.log('error', error));
        }
    }, [currentlyCurrency]);

    if(pairs.length&&showAxiosData.length===0){
        fetchCurrency()
    }

    function fetchCurrency() {
        let myHeaders = new Headers();
        myHeaders.append("apikey", "NxGoLaAw5MBMAgNBoqxFBjISYUBpViZD");

        let requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        };

        setTimeout(()=>{
            // @ts-ignore
            fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${pairs[1]}&from=${pairs[0]}&amount=${convertValue}`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    setShowAxiosData([result.result, result.info.rate])
                })
                .catch(error => console.log('error', error));
        })
    }

    return (
        <>
            <div className={S.form}>
                <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserText(e.target.value)
                }} type="text" placeholder={placeHolder} value={userText} onKeyPress={(event: React.KeyboardEvent) => {
                    if (event.key === 'Enter') {
                        handlerFind()
                    }
                }}/>
                <div>
                    to
                </div>
                <div>
                    <select defaultValue={currentlyCurrency}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                setBaseCurr(event.target.value);
                            }} className={S.selector}>
                        <option>{currentlyCurrency}</option>
                        {data.map(el => <option key={el}>{el}</option>)}
                    </select>
                </div>

                <button onClick={() => handlerFind()}>Convert</button>
            </div>
            {showAxiosData.length!==0&&<div style={{margin:'15px'}}>{`${convertValue} ${pairs[0]} to ${pairs[1]} = ${showAxiosData[0].toFixed(2)} ${pairs[1]}; rate: ${showAxiosData[1].toFixed(4)}`}</div>}

        </>
    );
};

export default Page1

