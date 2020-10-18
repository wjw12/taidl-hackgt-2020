import { TAIDL_API } from "../constants"

export async function getUserAddress(userId) {
    const response = await fetch(TAIDL_API + "cdm/consumers?userId=" + userId);
    const result = await response.text();
    return result;
}

export async function findUserExists(userId) {
    const response = await fetch(TAIDL_API + "cdm/consumers?userId=" + userId);
    return response.ok;
}

export async function createUser(userId, email, password) {
    const data = {
        userId: userId,
        email: email,
        password: password
    };
    const response = await fetch(TAIDL_API + "cdm/consumers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    return response.ok;
}