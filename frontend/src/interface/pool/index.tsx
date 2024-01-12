export interface PackageInterface {
    ID?: number;
    PackageName?: string;
    Price?: number;
    PackageDetail?: string;
    DownloadStatus?: boolean;
}

export interface UserInterface {
    map(arg0: (user: any) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
    ID?: number;
    Username?:  string;
	Email?:     string;
	Password?:  string;
	Firstname?: string;
	Lastname?:  string;
    Address?: string;
    Dob?:       Date;

	SubscribeID?: number;

	StatusUserID?: number;


    Gender?: GenderUserInterface
    GenderID?: number
    Prefix?: PrefixUserInterface
    PrefixID?: number
}

export interface GenderUserInterface{
    ID?: number
    Gender?: string
}

export interface PrefixUserInterface {
    ID?: number
    Prefix?: string
}