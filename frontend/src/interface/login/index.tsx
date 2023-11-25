export interface UserForLoginInterface{
    ID?:  number
    UserName?: string
    Email?: string
    Password?: string
    StatusUserID?: StatusUserInterface
}

export interface StatusUserInterface{
    ID?: number
    StatusName?: string
}

export interface UserForRegInterface{
    ID?:  number
    UserName?: string
    Email?: string
    Password?: string
    StatusUserID?: number
}