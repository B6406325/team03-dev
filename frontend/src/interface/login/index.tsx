export interface UserForLoginInterface{
    ID?:  number
    UserName?: string
    Email?: string
    Password?: string
    StatusUserID?: StatusUserInterface
    GenderUserID?: GenderUserInterface
    AddressUserID?: AddressUserInterface
}

export interface StatusUserInterface{
    ID?: number
    StatusName?: string
}

export interface GenderUserInterface{
    ID?: number
    Gender?: string
}

export interface AddressUserInterface{
    ID?: number
    Address?: string
}

export interface UserForRegInterface{
    ID?:  number
    UserName?: string
    Email?: string
    Password?: string
    StatusUserID?: number
}