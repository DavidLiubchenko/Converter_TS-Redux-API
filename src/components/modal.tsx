import React, {useEffect} from 'react';
import S from '../styles/modal.module.scss'
import {data} from '../data/pairs.jsx'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../app/store";
import {updateCurrency, disableModal} from '../features/modal/modalSlice'


export const Modal = () => {
    const visibleModal = useSelector((state: RootState) => state.modal.visibleModal.value)
    const dispatch = useDispatch()

    if (!visibleModal)
        return <></>

    return (
        <div className={S.modal}>
            <div className={S.content}>
                <div>Select your main currency</div>
                <select defaultValue=''
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            dispatch(updateCurrency(event.target.value));
                            dispatch(disableModal())
                        }}>
                    <option value=''>Select</option>
                    <option>USD</option>
                    <option>UAH</option>
                    <option>EUR</option>
                    {data.map(el => <option key={el}>{el}</option>)}
                </select>
            </div>
        </div>
    );
};

