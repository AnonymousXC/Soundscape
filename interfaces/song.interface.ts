export interface SongResponse {
    id: string
    name: string
    type: string
    album: {
      id: string
      name: string
      url: string
    }
    year: string
    releaseDate: string
    duration: string
    label: string
    primaryArtists: any
    primaryArtistsId: string
    featuredArtists: any
    featuredArtistsId: string
    explicitContent: string
    playCount: string
    language: string
    hasLyrics: string
    url: string
    copyright: string
    image: any
    downloadUrl: any
  }