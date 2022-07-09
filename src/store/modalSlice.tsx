import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {action} from "typesafe-actions";
import {json} from "stream/consumers";
import {useDispatch} from "react-redux";

export interface ModalState {
    visibleModal: {
        value: boolean
    },
    currency: {
        value: string
    },
    currencies: {
        value: string
    },
    fetchResponse: {
        value: any
    },
    status: {
        value: 'idle' | 'loading' | 'succeeded' | 'failed',
    }
}

const initialState: ModalState = {
    visibleModal: {
        value: true
    },
    currency: {
        value: ''
    },
    currencies: {
        value: 'PLN%2CUSD%2CUAH%2CEUR%2CRUB'
    },
    fetchResponse: {
        value: []
    },
    status: {
        value: 'idle'
    }

}

let myHeaders = new Headers();
myHeaders.append("apikey", "NxGoLaAw5MBMAgNBoqxFBjISYUBpViZD");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};
const dispatch = useDispatch()

export const fetchCurrencies = createAsyncThunk('updateCurrencies', async (arrCurrencies:string[]) => {
    // @ts-ignore
    const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${arrCurrencies[0]}&base=${arrCurrencies[1]}`, requestOptions)
    dispatch(updateCurrencies(response.json()))
    console.log(response.json())
    return response.json()
})

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        disableModal: (state) => {
            state.visibleModal.value = false
        },
        updateCurrency: (state, action: PayloadAction<string>) => {
            state.currency.value = action.payload
        },
        updateCurrencies: (state ,action:PayloadAction<string>)=>{
            state.fetchResponse.value = action.payload
        }
    },
})

export const {disableModal, updateCurrency, updateCurrencies} = modalSlice.actions

export default modalSlice.reducer