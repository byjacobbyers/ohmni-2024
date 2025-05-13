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
	const { data: page } = await sanityFetch({
    query: PageQuery,
    params: { slug: "resources" },
  });
	const global = await client.fetch(SiteQuery)


	const result = {
		noIndex: page?.seo?.noIndex ? true : false,
		title: page?.seo?.metaTitle
			? `${page?.seo.metaTitle} :: Ohmni Web Technologies`
			: page?.title
			? page?.title
			: global[0].seo.metaTitle,
		description: page?.seo?.metaDesc
			? page?.seo.metaDesc
			: global[0].seo?.metaDesc,
		keywords: page?.seo?.metaKeys ? page?.seo.metaKeys : global[0].seo?.metaKeys,
		image: page?.seo?.shareGraphic?.asset.url
			? page?.seo.shareGraphic.asset.url
			: global[0].seo?.shareGraphic.asset.url,
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
		openGraph: {
			title: `${result.title}`,
			description: result.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.slug}`,
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
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.slug}`,
		},
	}
}

export default async function QuizPage() {

  const { data: page } = await sanityFetch({
    query: PageQuery,
    params: { slug: "resources" },
  });

  const { data: resourceBlockData } = await sanityFetch({
    query: ResourcesQuery
  });

  console.log(resourceBlockData)

  return (
    <>
    <Header items={page?.pageNav?.header} />
      <main className="flex min-h-screen flex-col items-center gap-y-24 py-12 lg:py-24 2xl:pt-48">
        <ResourceBlock resources={resourceBlockData} />
      </main>
    <Footer items={page?.pageNav?.footer} />
    </>
  );
}