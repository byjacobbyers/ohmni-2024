import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

export const SiteQuery = groq`*[_type == "site"] {
  _id,
  _createdAt,
  _updatedAt,
  ...,
  seo {
    ...,
    metaIcon {
      ${imageQuery}
    },
    shareGraphic {
      ${imageQuery}
    },
  },
}`


export const OgImageQuery = groq`
  *[_id == $id][0]{
    title,
    seo {
      metaTitle,
      metaIcon {
        ${imageQuery}
      },
      shareGraphic {
        ${imageQuery}
      },
    },
  }    
`;