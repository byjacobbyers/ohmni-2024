import { groq } from 'next-sanity'
import { imageQuery } from '../objects/image-query'

export const getCustomers = groq`*[_type == "customer"] {
  _id,
  _createdAt,
  _updatedAt,
  title,
  image {
    ${imageQuery}
  },
}`
