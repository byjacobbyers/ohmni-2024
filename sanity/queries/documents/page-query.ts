import { groq } from 'next-sanity'
import { pageNavQuery } from '../components/page-nav-query'
import { imageQuery } from '../objects/image-query'
import { routeQuery } from '../objects/route-query'
import { videoQuery } from '../objects/video-query'

export const PagesQuery = groq`*[_type == "page" && defined(slug.current)][]`

export const PageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    pageNav {
      ${pageNavQuery}
    },
    seo {
      ...,
      shareGraphic {
        ${imageQuery}
      },
    },
    sections[] {
      ...,
      _type == 'heroBlock' => {
        ...,
        image {
          ${imageQuery}
        },
        video {
          ${videoQuery}
        },
        cta {
          ...,
          route {
            ${routeQuery}
          },
        },
      },
      _type == 'ctaBlock' => {
        ...,
        cta {
          ...,
          route {
            ${routeQuery}
          },
        },
        image {
          ${imageQuery}
        },
      },
      _type == 'ctaForm' => {
        ...,
        file {
          ${imageQuery}
        },
      },
      _type == 'columnBlock' => {
        ...,
        rows[] {
          ...,
          columns[] {
            ...,
            image {
              ${imageQuery}
            },
            video {
              ${videoQuery}
            },
            content[] {
              ... // Assuming there can be rich text or other fields in content
            }
          }
        }
      },
      _type == 'reviewBlock' => {
        ...,
        reviews[]-> {
          ...,
          image {
            ${imageQuery}
          },
        },
        titles
      },
      _type == 'priceBlock' => {
        ...,
        columns[] {
          ...,
          image {
            ${imageQuery}
          }
        }
      },
      _type == 'videoBlock' => {
        ...,
        video {
          ${videoQuery}
        },
      },
      _type == 'textBlock' => {
        ...,
      }
    }
  }
`
