import { UserData } from "../pages/Conta";

interface IDIoBank {
    login: boolean;
}

const dioBank = {
    login: false
}

export const getAllLocalStorage = (): string | null  => {
    return localStorage.getItem('diobank')
}

export const createLocalStorage = (): void => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
}

export const changeLocalStorage = (dioBank: IDIoBank): void => {
    localStorage.setItem('diobank', JSON.stringify(dioBank))
}

export const setUserLocalStorage = (user: UserData | any): void => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUserAllLocalStorage = (): string | null  => {
    return localStorage.getItem('user')
}
