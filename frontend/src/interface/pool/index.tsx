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
    Dob?:       any;

	GenderID?: number;

	PrefixID?: number;

	SubscribeID?: number;

	StatusUserID?: number;
}