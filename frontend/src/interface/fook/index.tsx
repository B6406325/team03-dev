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
    CategoriesID?: number
    Categories?: CategoriesInterface
    TargetID?: number
    Target?: TargetInterface
    SoundtrackID?: number
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
    Image?: string
    Video?: string
    CategoriesID?: number
    Categories?: CategoriesInterface
    TargetID?: number
    Target?: TargetInterface
    SoundtrackID?: number
    Soundtrack?: SoundtrackInterface
}

export interface ImageUpload {
    uid: string
    lastModified: number
    lastModifiedDate: string
    name: string
    size: number
    type: string
    percent: number
    originFileObj: OriginFileObj
    error: Error
    response: string
    status: string
    thumbUrl: string
  }
  
  export interface OriginFileObj {
    uid: string
  }
  
  export interface Error {
    status: number
    method: string
    url: string
  }