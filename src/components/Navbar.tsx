import React from 'react';
import S from '../styles/navbar.module.scss'
import {Link} from "react-router-dom";
import {data} from "../data/pairs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateCurrency, updateFetchData} from '../features/modal/modalSlice'
import styleSelector from '../styles/selector.module.scss'

export const Navbar: React.FC = () => {

    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const arrCurrencies = useSelector((state: RootState) => state.modal.fetchCurrencies.value)
    const dispatch = useDispatch()

    function updateData() {
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
    }

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
                                updateData()
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

