export interface MoviesInterface {
    ID?: number
    Title?: string
    Duration?: string
    Description?: string
    ReleaseDate?: Date
    Director?: string
    Cast?: string
    Image?: string
    Video?: string
    Categories?: CategoriesInterface
    Target?: TargetInterface
    Soundtrack?: SoundtrackInterface
}

export interface CategoriesInterface {
    ID?: number
    Categories?: string
}

export interface TargetInterface {
    ID?: number
    Target?: string
}

export interface SoundtrackInterface {
    ID?: number
    Soundtrack?: string
}

export interface MoviesCreateInterface {
    ID?: number
    Title?: string
    Duration?: string
    Description?: string
    ReleaseDate?: Date
    Director?: string
    Cast?: string
    image?: string
    Video?: string
    CategoriesID?: number
    Categories?: CategoriesInterface
    TargetID?: number
    Target?: TargetInterface
    SoundtrackID?: number
    Soundtrack?: SoundtrackInterface
}