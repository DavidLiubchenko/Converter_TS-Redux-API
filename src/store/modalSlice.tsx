import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

export interface ModalState {
    visibleModal: {
        value: boolean
    },
    currency: {
        value: string
    },
    fetchCurrencies: {
        value: string
    },
    fetchResponse: {
        value: any
    },

}

const initialState: ModalState = {
    visibleModal: {
        value: true
    },
    currency: {
        value: ''
    },
    fetchCurrencies: {
        value: 'PLN%2CUSD%2CUAH%2CEUR%2CRUB'
    },
    fetchResponse: {
        value: []
    },

}

let myHeaders = new Headers();
myHeaders.append("apikey", "NxGoLaAw5MBMAgNBoqxFBjISYUBpViZD");

let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

// export const fetchCurrencies = createAsyncThunk('posts/fetchPosts', async (arrCurrencies:string,currentlyCurrency) => {
//     // @ts-ignore
//     const response = await fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${arrCurrencies}&base=${currentlyCurrency}`, requestOptions)
//     return response.json()
// })

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
        updateFetchData: (state, action: PayloadAction<string>) => {
            state.fetchResponse.value = action.payload
        },
    },
})

export const {disableModal, updateCurrency, updateFetchData} = modalSlice.actions

export default modalSlice.reducer