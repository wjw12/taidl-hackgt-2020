import { XDAI_API, TAIDL_API } from "../constants"

export async function transfer(from, to, amount) {
    const data = {
        from: from,
        to: to,
        amount: amount
    };
    const response = await fetch(XDAI_API + "transfer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.ok;
}