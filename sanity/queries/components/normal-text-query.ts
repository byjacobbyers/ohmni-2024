import { groq } from 'next-sanity'

export const normalTextQuery = groq`
  ...,
  markDefs[] {
    ...,
  },
`
