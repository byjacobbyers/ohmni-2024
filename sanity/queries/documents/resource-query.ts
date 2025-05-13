import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'
import { routeQuery } from '../objects/route-query'

export const ResourcesQuery = groq`*[_type == "resource"]|order(_createdAt desc){
  _id,
  _createdAt,
  _updatedAt,
  title,
  description,
  lock,
  category,
  image {
    ${imageQuery}
  },
  cta {
    ...,
    route {
      ${routeQuery}
    }
  }
}`