// Tools
import { sanityFetch } from "@/sanity/lib/live"
import { Metadata } from 'next'
import Script from 'next/script'

// Queries
import { PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"
import OrgJsonLd from "@/components/organization-jsonld"
import { generateWebPageJsonLd, generateFAQJsonLd } from '@/lib/seo'

export const generateMetadata = async (): Promise<Metadata> => {
	try {
		const [{ data: global }] = await Promise.all([
			sanityFetch({
				query: SiteQuery
			})
		])

		if (!global?.[0]?.seo) {
			return {
				title: 'Ohmni Web Technologies',
				description: 'A web development company that specializes in building custom web applications for business and marketing teams.',
			}
		}

		const seoImage = global[0].seo?.shareGraphic?.asset?.url
		const result = {
			title: global[0].seo.metaTitle,
			description: global[0].seo?.metaDesc,
			keywords: global[0].seo?.metaKeys,
			image: seoImage ? urlFor(seoImage).width(1200).height(630).url() : undefined,
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
			title: result.title,
			description: result.description,
			verification: {
				other: {
					"ahrefs-site-verification": "0dafbe29239d50a66aa81ea22f9f7519ee6271f165e9377698680c753a3c2eab",
				},
			},
			openGraph: {
				title: result.title,
				description: result.description,
				url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
				siteName: 'Ohmni Web Technologies',
				authors: ['Jacob Byers'],
				images: result.image ? [
					{
						url: result.image,
						width: 1200,
						height: 630,
						alt: result.title,
					},
				] : undefined,
			},
			twitter: {
				card: 'summary_large_image',
				title: result.title,
				description: result.description,
				creator: '@byersjacob',
				images: result.image ? [result.image] : undefined,
			},
			alternates: {
				canonical: '/',
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

export default async function Home() {
	try {
		const { data: page } = await sanityFetch({
			query: PageQuery,
			params: { slug: "home" },
		})

		if (!page) {
			return null
		}

		// Generate JSON-LD schemas
		const schemas = []

		// WebPage schema
		const pageSeo = page?.seo || {}
		schemas.push(generateWebPageJsonLd({
			title: page.title,
			description: pageSeo.metaDesc,
			url: '/',
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
				<OrgJsonLd />
				{schemas.length > 0 && (
					<Script
						id="home-jsonld"
						type="application/ld+json"
						dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
					/>
				)}
				<Page page={page} key={page._id} /> 
			</>
		)
	} catch (error) {
		console.error('Error fetching page data:', error)
		return null
	}
}