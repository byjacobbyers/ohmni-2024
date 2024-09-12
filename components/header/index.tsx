'use client'

// Tools
import Image from "next/image"
import Link from "next/link"
import { motion, useCycle } from "framer-motion"
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

// Types
import { NavigationType } from "@/types/documents/navigation-type"

// Components
import Logo from '@/public/logo.png'
import Nav from "@/components/navigation"
import MenuButton from "@/components/header/menu-button"
import MobileNav from "@/components/navigation/mobile"

interface HeaderProps {
  items: NavigationType
}

interface Dimension {
  width: number
  height: number
}

const titleAnimation = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      ease: [0.42, 0, 0.58, 1], // ease-in-out
    },
  }),
}

const borderAnimation = {
  hidden: {
    width: '0%',
    opacity: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.42, 0, 0.58, 1], // ease-in-out
    },
  },
}

const navAnimation = {
  hidden: {
    opacity: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: .5, // This delay ensures it runs after the title and border animations
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1], // ease-in-out
    },
  },
}

const Header: React.FC<HeaderProps> = ({
  items
}) => {
  const [isOpen, toggleDropdown] = useCycle(false, true)
  const targetRef = useRef<HTMLButtonElement>(null)
  const [dimensions, setDimensions] = useState<Dimension>({
    width: 0,
    height: 0,
  })
  const pathname = usePathname()
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      })
    }
    setInitialLoad(false)
  }, [])

  const closeMenu = () => {
    toggleDropdown();
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header 
        ref={targetRef}
        className='sticky top-0 z-50 w-full flex flex-col bg-background pt-5 px-5'
      >
        <div className={`flex flex-wrap justify-between items-center w-full px-0 md:px-2`}>
          <Link href='/' className='flex items-center gap-2' onClick={handleLogoClick}>
            <Image src={Logo} alt='Logo' width={52} height={52} />
            <motion.div 
              initial="hidden"
              animate="visible"
              className='font-inknut text-4xl'
            >
              {"OHMNI".split("").map((letter, index) => (
                <motion.span key={index} custom={index} variants={titleAnimation}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>
          </Link>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={navAnimation}
            className='hidden lg:block'
          >
            {items && (
              <Nav data={items} />
            )}
          </motion.div>
          <div className='block lg:hidden'>
            <MenuButton
              onClick={toggleDropdown}
              isOpen={isOpen}
              defaultColor='#020817'
            />
          </div>
          
        </div>
        <div className='w-full'>
            <motion.hr 
              initial="hidden"
              animate="visible"
              variants={borderAnimation}
              className='border mt-2 w-full border-black' 
            />
          </div>
      </header>
      <motion.div
        initial={'closed'}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
        variants={{
          closed: {
            y: '-100%',
            opacity: 0,
          },
          open: {
            y: 0,
            opacity: 1,
          },
        }}
        style={{
          paddingTop: dimensions.height,
        }}
        className='fixed left-0 top-0 z-30 flex h-screen w-full flex-col items-center overflow-scroll bg-background px-5 text-center xl:hidden'
      >
        <hr className='border-thin w-full border-white' />
        <MobileNav data={items} closeMenu={closeMenu} />
      </motion.div>
    </>
  )
}

export default Header
