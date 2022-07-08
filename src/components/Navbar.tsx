import React from 'react';
import S from '../styles/navbar.module.scss'
import {Link} from "react-router-dom";
import {data} from "../data/pairs";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateCurrency} from '../features/modal/modalSlice'

export const Navbar: React.FC = () => {

    const currentlyCurrency = useSelector((state: RootState) => state.modal.currency.value)
    const dispatch = useDispatch()

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
                            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                            {dispatch(updateCurrency(event.target.value))}}>
                        <option>{currentlyCurrency}</option>
                        {data.map(el => <option key={el}>{el}</option>)}
                    </select>
                </li>
            </ul>
        </nav>
    );
};

