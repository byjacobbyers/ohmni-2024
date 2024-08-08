// Tools
import { SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/fetch"
import { client } from "@/sanity/lib/client"
import { Metadata } from 'next'

// Queries
import { PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
//import { urlFor } from "@/components/sanity-image/url"
//import OrgJsonLd from "@/components/organization-jsonld"

// export const generateMetadata = async (): Promise<Metadata> => {
// 	const global = await client.fetch(SiteQuery)
// 	const seoImage = global[0].seo?.shareGraphic.asset.url
// 	const result = {
// 		title: global[0].seo.metaTitle,
// 		description: global[0].seo?.metaDesc,
// 		keywords: global[0].seo?.metaKeys,
// 		image: urlFor(seoImage).width(800).height(600).url(),
// 	}

// 	return {
// 		generator: 'Next.js',
// 		applicationName: 'Spotlight Service',
// 		publisher: 'Spotlight Service',
// 		robots: 'index, follow',
// 		metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
// 		title: `Spotlight Service | ${result.title}`,
// 		description: result.description,
// 		openGraph: {
// 			title: `Spotlight Service | ${result.title}`,
// 			description: result.description,
// 			images: [
// 				{
// 					url: result.image,
// 					width: 1200,
// 					height: 630,
// 					alt: result.title,
// 				},
// 			],
// 		},
// 		alternates: {
// 			canonical: '/',
// 		},
// 	}
// }

export default async function Home() {
  const page = await sanityFetch<SanityDocument>({
    query: PageQuery,
    params: { slug: "home" },
  })

  return (
    <>
			{/* <OrgJsonLd /> */}
			<Page page={page} /> 
		</>
  );
}