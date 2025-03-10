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

interface QuizPageProps {
  searchParams: { key?: string };
}

export const generateMetadata = async () => {
	const { data: page } = await sanityFetch({
    query: PageQuery,
    params: { slug: "quiz" },
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
      description: result.description,
      creator: '@byersjacob',
      images: [result.image],
    },
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${page?.slug}`,
		},
	}
}

export default async function QuizPage() {

  const { data: page } = await sanityFetch({
    query: PageQuery,
    params: { slug: "quiz" },
  });

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
  );
}