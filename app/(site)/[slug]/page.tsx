// Tools
import * as React from 'react'
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import Script from 'next/script'

// Types
import { PageType } from "@/types/documents/page-type"

// Queries
import { PagesQuery, PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"
import { generateWebPageJsonLd, generateFAQJsonLd } from '@/lib/seo'

export async function generateStaticParams() {
	try {
		const posts = await client.fetch(PagesQuery);

		// Add this filter
		const excludedSlugs = ['quiz', 'resources'];

		return posts
			.filter((post: SanityDocument) => !excludedSlugs.includes(post?.slug?.current))
			.map((post: SanityDocument) => ({
				slug: post?.slug?.current,
			}));
	} catch (error) {
		console.error('Error generating static params:', error)
		return []
	}
}

type Props = {
	params: any;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
	try {
		const resolvedParams = await params
		const [{ data: page }, { data: global }] = await Promise.all([
			sanityFetch({
				query: PageQuery,
				params: { slug: resolvedParams.slug },
			}),
			sanityFetch({
				query: SiteQuery
			})
		])

		if (!page) {
			return notFound();
		}

		const pageSeo = page?.seo || {}
		const globalSeo = global?.[0]?.seo || {}

		const result = {
			noIndex: pageSeo?.noIndex ?? false,
			title: pageSeo?.metaTitle || globalSeo?.metaTitle || 'Page',
			description: pageSeo?.metaDesc || globalSeo?.metaDesc || 'Ohmni Web Technologies',
			image: pageSeo?.shareGraphic?.asset?.url
				? urlFor(pageSeo.shareGraphic.asset.url).width(1200).height(630).url()
				: globalSeo?.shareGraphic?.asset?.url
				? urlFor(globalSeo.shareGraphic.asset.url).width(1200).height(630).url()
				: `/api/og?id=${page._id}`
		}

		return {
			generator: 'Next.js',
			applicationName: 'Ohmni Web Technologies',
			publisher: 'Ohmni LLC',
			robots: {
				index: !result.noIndex,
				follow: true,
				nocache: true,
				googleBot: {
					index: !result.noIndex,
					follow: true,
					noimageindex: true,
					'max-video-preview': -1,
					'max-image-preview': 'large',
					'max-snippet': -1,
				},
			},
			metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
			title: `${result.title} :: Ohmni Web Technologies`,
			description: result.description,
			verification: {
				other: {
					"ahrefs-site-verification": "0dafbe29239d50a66aa81ea22f9f7519ee6271f165e9377698680c753a3c2eab",
				},
			},
			openGraph: {
				title: result.title,
				description: result.description,
				url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/${resolvedParams.slug}`),
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
				title: result.title,
				description: result.description,
				creator: '@byersjacob',
				images: [result.image],
			},
			alternates: {
				canonical: `/${resolvedParams.slug}`,
			},
		}
	} catch (error) {
		console.error('Error generating metadata:', error)
		return {
			title: 'Ohmni Web Technologies',
			description: 'A web development company that specializes in building custom web applications for business and marketing teams.',
		}
	}
}

export default async function SinglePage({ params }: { params: Promise<QueryParams> }) {
	try {
		const resolvedParams = await params
		const { data: page } = await sanityFetch({
			query: PageQuery,
			params: { slug: resolvedParams.slug },
		})
		
		if (!page) {
			return notFound();
		}

		// Generate JSON-LD schemas
		const pageUrl = `/${resolvedParams.slug}`
		const pageSeo = page?.seo || {}
		const schemas = []

		// WebPage schema
		schemas.push(generateWebPageJsonLd({
			title: page.title,
			description: pageSeo.metaDesc,
			url: pageUrl,
			seo: pageSeo,
			_updatedAt: page._updatedAt,
		}))

		// FAQ schema (if page has FAQ blocks)
		const faqBlocks = page.sections?.filter((section: any) => section._type === 'faqBlock' && section.active) || []
		const allFaqs = faqBlocks.flatMap((block: any) => block.faqs || [])
		if (allFaqs.length > 0) {
			const faqSchema = generateFAQJsonLd(allFaqs)
			if (faqSchema) schemas.push(faqSchema)
		}

		return (
			<>
				{schemas.length > 0 && (
					<Script
						id="page-jsonld"
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
					/>
				)}
				<Page page={page} key={page._id} /> 
			</>
		)
	} catch (error) {
		console.error('Error fetching page data:', error)
		return notFound()
	}
}
