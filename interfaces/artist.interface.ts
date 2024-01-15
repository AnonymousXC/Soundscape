export interface Artist {
    id: string
    name: string
    ctr: number
    entity: number
    image: string
    role: string
    perma_url: string
    type: string
    mini_obj: boolean
    isRadioPresent: boolean
    is_followed: boolean
  }
  

export interface ArtistRequest extends Artist {
    artistId: string
    subtitle: string
    followerCount: string
    isVerified: boolean
    dominantLanguage: string
    dominantType: string
    topSongs: any
    topAlbums: any
    bio: string
    dob: string
    fb: string
    twitter: string
    wiki: string
    urls: {
      albums: string
      bio: string
      comments: string
      songs: string
      overview: string
    }
    availableLanguages: string[]
    fanCount: string
  }
  