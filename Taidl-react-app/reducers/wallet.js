
export const initialState = {
    userId: null,
    address: null,
    balance: null,
    history: null,
    loading: true,
    error: false
}

export function reducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return { ...state, loading: true, error: false }
        case "ERROR":
            return { ...state, loading: false, error: true }
        case "ADDRESS_LOADED": 
            return {...state, address: action.payload.address, loading: false, error: false};
        case "BALANCE_LOADED":
            return {...state, balance: action.payload.balance.toFixed(2), loading: false, error: false};
        case "SET_USERID":
            return {...state, userId: action.payload.userId}
    }
}