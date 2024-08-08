import { groq } from 'next-sanity'

export const imageQuery = groq`
  alt, 
  caption,
  shadow,
  crop {
    ...
  },
  hotspot {
    x,
    y
  },
  asset-> {
    ...,
    url,
    metadata {
      dimensions {
        aspectRatio
      }
    }
  },
`
