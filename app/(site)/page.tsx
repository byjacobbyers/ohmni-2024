// Tools
import { SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { Metadata } from 'next'

// Queries
import { PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"
import OrgJsonLd from "@/components/organization-jsonld"

export const generateMetadata = async (): Promise<Metadata> => {
	const global = await client.fetch(SiteQuery)
	const seoImage = global[0].seo?.shareGraphic.asset.url
	const result = {
		title: global[0].seo.metaTitle,
		description: global[0].seo?.metaDesc,
		keywords: global[0].seo?.metaKeys,
		image: urlFor(seoImage).width(1200).height(630).url(),
	}

	return {
		generator: 'Next.js',
		applicationName: 'Ohmni Web Technologies',
		publisher: 'Ohmni LLC',
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
		metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
		title: `${result.title}`,
		description: result.description,
		verification: {
			other: {
				"ahrefs-site-verification": "0dafbe29239d50a66aa81ea22f9f7519ee6271f165e9377698680c753a3c2eab",
			},
		},
		openGraph: {
			title: `${result.title}`,
			description: result.description,
      url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
      siteName: 'Ohmni Web Technologies',
      authors: ['Jacob Byers'],
			images: [
				{
					url: result.image,
					width: 1200,
					height: 630,
					alt: result.title,
				},
			],
		},
    twitter: {
      card: 'summary_large_image',
      title: `${result.title}`,
      description: result.description,
      creator: '@byersjacob',
      images: [result.image],
    },
		alternates: {
			canonical: '/',
		},
	}
}

export default async function Home() {
  const { data: page } = await sanityFetch({
    query: PageQuery,
    params: { slug: "home" },
  });

  return (
    <>
			<OrgJsonLd />
			<Page page={page} key={page._id} /> 
		</>
  );
}