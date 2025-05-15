// Tools
import * as React from 'react'
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

  // Add this filter
  const excludedSlugs = ['quiz', 'resources'];

  return posts
    .filter((post: SanityDocument) => !excludedSlugs.includes(post?.slug?.current))
    .map((post: SanityDocument) => ({
      slug: post?.slug?.current,
    }));
}

type Props = {
  params: any;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  
	const { data: page } = await sanityFetch({
    query: PageQuery,
    params: await params,
  });
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
			: `/api/og?id=${page._id}`
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
		title: `${result.title} :: Ohmni Web Technologies`,
		description: result.description,
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



export default async function SinglePage({ params }: { params: Promise<QueryParams> }) {
  const { data: page } = await sanityFetch({
    query: PageQuery,
    params: await params,
  });
	
  if (!page) {
    return notFound();
  }

  return (
    <Page page={page} key={page._id} /> 
  );
}
