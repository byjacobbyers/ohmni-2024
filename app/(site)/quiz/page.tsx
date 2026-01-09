// Tools
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
import Link from "next/link"
import Image from 'next/image'

// Queries
import { PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import QuizComponent from '@/components/quiz'
import Logo from '@/public/title-logo.png'
import Footer from '@/components/footer'

export const generateMetadata = async () => {
	try {
		const [{ data: page }, { data: global }] = await Promise.all([
			sanityFetch({
				query: PageQuery,
				params: { slug: "quiz" },
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
				: `/api/og?id=${page?._id || ''}`,
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
				url: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}/quiz`),
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
				canonical: '/quiz',
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

export default async function QuizPage() {
	try {
		const { data: page } = await sanityFetch({
			query: PageQuery,
			params: { slug: "quiz" },
		})

		if (!page) {
			return null
		}

		return (
			<>
				<main className="flex min-h-screen flex-col items-center justify-center pt-16 pb-24 bg-foreground">
					<Link href="/">
						<Image src={Logo} alt="Ohmni Logo" width={200} height={50} className="mb-4 lg:mb-8" />
					</Link>
					<h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8 text-white text-center">
						CMS Evaluation Quiz
					</h1>
					<QuizComponent 
						pageKey={page.shortKey}
					/>
				</main>
				<Footer items={page?.pageNav?.footer} />
			</>
		)
	} catch (error) {
		console.error('Error fetching page data:', error)
		return null
	}
}