import { groq } from 'next-sanity'
import { routeQuery } from '../objects/route-query'

export const pageNavQuery = groq`
  header -> {
    title,
    items[] {
      ${routeQuery},
      items[] {
        "parentTitle": parentRoute.title,
        ${routeQuery},
        parentRoute {
          ${routeQuery},
        },
        items[] {
          ${routeQuery},
        }
      }
    }
  },
  footer -> {
    title,
    items[] {
      ${routeQuery},
      items[] {
        "parentTitle": parentRoute.title,
        ${routeQuery},
        parentRoute {
          ${routeQuery},
        },
        items[] {
          ${routeQuery},
        }
      }
    }
  },
`
