import React, {useEffect} from 'react';
// @ts-ignore
import S from './navbar.module.scss'
import {Link} from "react-router-dom";
import {data} from "../store/pairs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
// import {fetchCurrencies, updateCurrency, updateFetchData} from '../store/modalSlice'
import { updateCurrency, updateFetchData} from '../store/modalSlice'
// @ts-ignore
import styleSelector from '../styles/selector.module.scss'

export const Navbar: React.FC = () => {

    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const arrCurrencies = useSelector((state: RootState) => state.modal.fetchCurrencies.value)
    const dispatch = useDispatch()

    // const updateData=()=> {
    //     let myHeaders = new Headers();
    //     myHeaders.append("apikey", "NxGoLaAw5MBMAgNBoqxFBjISYUBpViZD");
    //
    //     let requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow',
    //         headers: myHeaders
    //     };
    //     if (currentlyCurrency.length) {
    //         // @ts-ignore
    //         fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${arrCurrencies}&base=${currentlyCurrency}`, requestOptions)
    //             .then(response => response.json())
    //             .then(result => {
    //                 // @ts-ignore
    //                 dispatch(updateFetchData(result.rates))
    //             })
    //             .catch(error => console.log('error', error));
    //     }
    // }
    // const requestStatus = useSelector((state: RootState) => state.modal.requestStatus.value)

    return (
        <nav className={S.nav}>
            <ul>
                <li>
                    <Link to={{pathname: "/"}}>
                        <a href="/">Converter</a>
                    </Link>
                </li>
                <li>
                    <Link to={{pathname: "/second"}}>
                        <a href="">Current rates</a>
                    </Link>
                </li>
                <li>
                    <select defaultValue={currentlyCurrency}
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                                dispatch(updateCurrency(event.target.value));
                                // @ts-ignore
                                // dispatch(fetchCurrencies(arrCurrencies,currentlyCurrency))
                            }}
                            className={styleSelector.selector}
                    >
                        <option>{currentlyCurrency}</option>
                        {data.map(el => <option key={el}>{el}</option>)}
                    </select>
                </li>
            </ul>
        </nav>
    );
};

