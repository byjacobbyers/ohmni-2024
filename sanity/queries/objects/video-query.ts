import { groq } from 'next-sanity'

export const videoQuery = groq`
  asset-> {
    playbackId
  }
`
