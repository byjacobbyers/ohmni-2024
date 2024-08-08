'use client'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { SiteQuery } from '@/sanity/queries/documents/site-query'
import Logo from '@/public/logo.png'

const OrgJsonLd = () => {
	const [jsonLdContent, setJsonLdContent] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			const data = await client.fetch(SiteQuery)
			if (data && data.length > 0) {
				const siteData = data[0]

				const jsonLd = {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: siteData.title,
					foundingYear: siteData.foundingYear,
					image: Logo.src, 
					url: 'https://spotlightservice.co/',
					address: {
						'@type': 'PostalAddress',
						addressCountry: siteData.addressCountry,
					},
					sameAs: [
						siteData.social?.linkedin,
					],
					description: siteData.seo.metaDesc,
				}

				setJsonLdContent(JSON.stringify(jsonLd))
			} else {
				console.log('No data received from fetch')
			}
		}

		fetchData()
	}, [])

	return jsonLdContent ? (
		<Script
			id='app-ld-json'
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: jsonLdContent }}
		/>
	) : null
}

export default OrgJsonLd
