// Tools
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
import Link from "next/link"
import Image from 'next/image'

// Queries
import { PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'
import { ResourcesQuery } from "@/sanity/queries/documents/resource-query"

// Components
import Header from "@/components/header"
import Footer from '@/components/footer'
import ResourceBlock from "@/components/resource-block"



export const generateMetadata = async () => {
	try {
		const [{ data: page }, { data: global }] = await Promise.all([
			sanityFetch({
				query: PageQuery,
				params: { slug: "resources" },
			}),
			sanityFetch({
				query: SiteQuery
			})
		])

		const pageSeo = page?.seo || {}
		const globalSeo = global?.[0]?.seo || {}

		const result = {
			noIndex: pageSeo?.noIndex ?? false,
			title: pageSeo?.metaTitle
				? `${pageSeo.metaTitle} :: Ohmni Web Technologies`
				: page?.title
				? `${page.title} :: Ohmni Web Technologies`
				: globalSeo?.metaTitle || 'Ohmni Web Technologies',
			description: pageSeo?.metaDesc || globalSeo?.metaDesc || 'Ohmni Web Technologies',
			keywords: pageSeo?.metaKeys || globalSeo?.metaKeys,
			image: pageSeo?.shareGraphic?.asset?.url
				? pageSeo.shareGraphic.asset.url
				: globalSeo?.shareGraphic?.asset?.url
				? globalSeo.shareGraphic.asset.url
				: `/api/og?id=${page?._id || ''}`
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
			title: result.title,
			description: result.description,
			openGraph: {
				title: result.title,
				description: result.description,
				url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/resources`),
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
				canonical: '/resources',
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

export default async function ResourcesPage() {
	try {
		const [{ data: page }, { data: resourceBlockData }] = await Promise.all([
			sanityFetch({
				query: PageQuery,
				params: { slug: "resources" },
			}),
			sanityFetch({
				query: ResourcesQuery
			})
		])

		if (!page) {
			return null
		}

		return (
			<>
				<Header items={page?.pageNav?.header} />
				<main className="flex min-h-screen flex-col items-center gap-y-24 py-12 lg:py-24 2xl:pt-48">
					<ResourceBlock resources={resourceBlockData} />
				</main>
				<Footer items={page?.pageNav?.footer} />
			</>
		)
	} catch (error) {
		console.error('Error fetching page data:', error)
		return null
	}
}