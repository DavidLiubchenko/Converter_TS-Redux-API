import React from 'react';
// @ts-ignore
import S from './modal.module.scss'
// @ts-ignore
import {data} from '../store/pairs.tsx'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {updateCurrency, disableModal} from '../store/modalSlice'

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
                        }} className={S.selector}>
                    <option value=''>Select</option>
                    <option>USD</option>
                    <option>UAH</option>
                    <option>EUR</option>
                    {data.map((el:string) => <option key={el}>{el}</option>)}
                </select>
            </div>
        </div>
    );
};

