export interface UserForLoginInterface{
    ID?:  number
    Username?: string
    Email?: string
    Password?: string
    StatusUser?: StatusUserInterface
}

export interface StatusUserInterface{
    ID?: number
    Status?: string
}

export interface GenderUserInterface{
    ID?: number
    Gender?: string
}

export interface PrefixUserInterface {
    ID?: number
    Prefix?: string
}

// export interface SubscribeUserInterface {

// }

export interface UserForRegInterface{
    ID?:  number
    UserName?: string
    Email?: string
    Password?: string
    Firstname?: string
    Lastname?: string
    Dob?: Date
    StatusUserID?: number
    Gender?: GenderUserInterface
    GenderID?: number
    Prefix?: PrefixUserInterface
    PrefixID?: number
}