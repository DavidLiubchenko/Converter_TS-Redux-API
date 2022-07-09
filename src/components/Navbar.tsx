import React, {useEffect, useState} from 'react';
// @ts-ignore
import S from './navbar.module.scss'
import {Link} from "react-router-dom";
import {data} from "../store/pairs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {fetchCurrencies, updateCurrency} from '../store/modalSlice'
// @ts-ignore
import styleSelector from '../styles/selector.module.scss'

export const Navbar: React.FC = () => {
    const [state, setState] = useState('');

    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const arrCurrencies = useSelector((state: RootState) => state.modal.currencies.value)
    const dispatch = useDispatch()

    console.log('currentlyCurrency',currentlyCurrency)
    console.log('arrCurrencies',arrCurrencies)
    console.log('state',state)

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
                                // @ts-ignore
                                dispatch(fetchCurrencies([arrCurrencies,event.target.value]))
                                setState(event.target.value)
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

