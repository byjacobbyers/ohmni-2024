// Tools
import { Metadata } from 'next'
import { QueryParams, SanityDocument } from "next-sanity"
import { sanityFetch } from "@/sanity/lib/live";
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"

// Types
import { PageType } from "@/types/documents/page-type"

// Queries
import { PagesQuery, PageQuery } from '@/sanity/queries/documents/page-query'
import { SiteQuery } from '@/sanity/queries/documents/site-query'

// Components
import Page from "@/components/page-single"
import { urlFor } from "@/components/sanity-image/url"

export async function generateStaticParams() {
  const posts = await client.fetch(PagesQuery);

  return posts.map((post: SanityDocument) => ({
	slug: post?.slug?.current,
  }))
}

type Props = {
	params: Promise<QueryParams>
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
	const { params } = props
	const page = await client.fetch<PageType>(PageQuery, params)
	const global = await client.fetch(SiteQuery)

	if (!page) {
    return notFound();
  }

	const result = {
		noIndex: page?.seo?.noIndex ? true : false,
		title: page?.seo?.metaTitle
			? `${page?.seo.metaTitle}` : `${global[0].seo.metaTitle}`,
		description: page?.seo?.metaDesc
			? page?.seo.metaDesc
			: global[0].seo?.metaDesc,
		image: page?.seo?.shareGraphic?.asset.url
			? page?.seo.shareGraphic.asset.url
			: global[0].seo?.shareGraphic.asset.url,
	}

	return {
		generator: 'Next.js',
		applicationName: 'TerraTrue',
		publisher: 'TerraTrue',
		robots: result.noIndex ? 'noindex' : 'index, follow',
		metadataBase: new URL(`${process.env.NEXT_PUBLIC_SITE_URL}`),
		title: `Spotlight Service | ${result.title}`,
		description: result.description,
		openGraph: {
			title: `Spotlight Service | ${result.title}`,
			description: result.description,
			images: [
				{
					url: urlFor(result.image).width(1200).height(630).url(),
					width: 1200,
					height: 630,
					alt: result.title,
				},
			],
		},
		alternates: {
			canonical: `/${page?.slug}`,
		},
	}
}



export default async function SinglePage({ params }: { params: Promise<QueryParams> }) {
  const { data: page } = await sanityFetch({
    query: PageQuery,
    params: await params,
  });
	
  if (!page) {
    return notFound();
  }

  return (
    <Page page={page} /> 
  );
}
