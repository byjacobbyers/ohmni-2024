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
			try {
				const siteData = await client.fetch(SiteQuery)
				if (!siteData) return

				const data = Array.isArray(siteData) ? siteData[0] : siteData
				if (!data) return

				// Normalize baseUrl to remove trailing slash
				const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ohmni.tech').replace(/\/$/, '')
				const logoUrl = `${baseUrl}${Logo.src}`
				
				// Organization schema
				const organization = {
					'@context': 'https://schema.org',
					'@type': 'Organization',
					name: data.title,
					...(data.foundingYear && { foundingDate: data.foundingYear }),
					logo: {
						'@type': 'ImageObject',
						url: logoUrl,
					},
					image: logoUrl,
					url: baseUrl,
					...(data.address && {
						address: {
							'@type': 'PostalAddress',
							...(data.addressCountry && { addressCountry: data.addressCountry }),
							...(data.addressLocality && { addressLocality: data.addressLocality }),
							...(data.address && { streetAddress: data.address }),
							...(data.postalCode && { postalCode: data.postalCode }),
							...(data.addressRegion && { addressRegion: data.addressRegion }),
						},
					}),
					...(data.sameAs && data.sameAs.length > 0 && {
						sameAs: data.sameAs.map((url: string) => url),
					}),
					...(data.seo?.metaDesc && { description: data.seo.metaDesc }),
				}

				// Website schema
				const website = {
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: data.title,
					url: baseUrl,
					publisher: {
						'@type': 'Organization',
						name: data.title,
						logo: {
							'@type': 'ImageObject',
							url: logoUrl,
						},
					},
				}

				// Person schema (if founder exists)
				const person = data.founder ? {
					'@context': 'https://schema.org',
					'@type': 'Person',
					name: data.founder,
					...(data.social?.linkedin && {
						sameAs: [data.social.linkedin].filter(Boolean),
					}),
				} : null

				// Combine all schemas into an array
				const schemas = [organization, website, person].filter(Boolean)

				setJsonLdContent(JSON.stringify(schemas))
			} catch (error) {
				console.error('Error fetching site data for JSON-LD:', error)
			}
		}

		fetchData()
	}, [])

	return jsonLdContent ? (
		<Script
			id='organization-ld-json'
			type='application/ld+json'
			dangerouslySetInnerHTML={{ __html: jsonLdContent }}
		/>
	) : null
}

export default OrgJsonLd
