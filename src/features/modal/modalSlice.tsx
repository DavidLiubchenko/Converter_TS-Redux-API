import {createSlice} from '@reduxjs/toolkit'
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
    }
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
    }
}

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