import { XDAI_API, TAIDL_API } from "../constants"

export async function getAddressOwner(address) {
    const response = await fetch(TAIDL_API + "address?address=" + address);
    if (!response.ok) return null;
    const owner = await response.text();
    return owner;
}

export async function getBalanceAndHistory(address) {
    const response = await fetch(XDAI_API + "address?address=" + address);
    if (!response.ok) return null;
    const result = await response.json();
    return result;
}

export async function getBalance(address) {
    const response = await fetch(XDAI_API + "address?address=" + address);
    if (!response.ok) return null;
    const result = await response.json();
    return result.balance;
}

export async function setAddressAnonymous(address, isAnonymous) {
    const data = {
        address: address,
        isAnonymous: isAnonymous
    };
    const response = await fetch(TAIDL_API + "address", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.ok;
}