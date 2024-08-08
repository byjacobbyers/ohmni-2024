'use client'

// Tools
import Link from "next/link"
import { useEffect, useState } from "react"
import { client } from '@/sanity/lib/client'
import { BiLogoLinkedin } from "react-icons/bi";

// Types
import { NavigationType } from "@/types/documents/navigation-type"
import { SocialType } from "@/types/components/social-type"

// Queries
import { SiteQuery } from "@/sanity/queries/documents/site-query"

// Components
import FooterNav from "../navigation/footer"


interface FooterProps {
  items: NavigationType
}


const Footer: React.FC<FooterProps> = ({
  items
}) => {
  const [socials, setSocials] = useState<SocialType | null>(null)

  useEffect(() => {
		const fetchSocial = async () => {
			const data = await client.fetch(SiteQuery)
      const socials = data[0].social
			setSocials(socials)
		}

		fetchSocial()
	}, [])

  // set copywrite year
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className='flex flex-col items-center py-10 gap-y-10'>
      {items && (
         <FooterNav data={items} />
       )}
      <div className='flex gap-y-10 text-white'>
        {socials?.linkedin && (
          <Link href={socials?.linkedin}>
            <div className='bg-gradient-to-b from-[#616ab3] to-primary h-10 w-10 rounded-full flex justify-center items-center'>
              <BiLogoLinkedin size={`1.5rem`} />
            </div>
          </Link>
        )}
      </div>
      <small>© {year} Spotlight Service. All rights reserved.</small>
    </footer>
  )
}

export default Footer