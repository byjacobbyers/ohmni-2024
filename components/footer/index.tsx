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

  console.log(items)

  return (
    <footer className='flex justify-between items-center bg-gray-900 px-5 py-10 text-white'>
      <small className='w-56 md:w-auto'>© {year} Ohmni Web Technologies. All rights reserved.</small>
      <div className='flex gap-10 text-white'>
        {items && (
          <FooterNav data={items} />
        )}
        {socials?.linkedin && (
          <Link href={socials?.linkedin} target="_blank">
            <div className='bg-background text-foreground h-10 w-10 rounded-full flex justify-center items-center'>
              <BiLogoLinkedin size={`1.5rem`} />
            </div>
          </Link>
        )}
      </div>
      
    </footer>
  )
}

export default Footer