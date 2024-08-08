'use client'

// Tools
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { usePathname } from 'next/navigation'

// Types
import { TextBlockType } from "@/types/components/text-block-type"

// Components
import NormalText from "@/components/normal-text"

// Function to sanitize content alignment
const sanitizeContentAlignment = (alignment: string) => {
  return alignment.replace(/[\u200B-\u200D\uFEFF]/g, '')
}

const TextBlock: React.FC<TextBlockType> = ({
  active,
  componentIndex,
  anchor,
  lastComponent,
  content,
  contentAlignment,
}) => {
  const [alignmentStyles, setAlignmentStyles] = useState({})
  const pathName = usePathname()

  useEffect(() => {
    const sanitizedAlignment = sanitizeContentAlignment(contentAlignment)

    if (sanitizedAlignment === 'left') {
      setAlignmentStyles({ justifyContent: 'flex-start', textAlign: 'left' })
    } else if (sanitizedAlignment === 'center') {
      setAlignmentStyles({ justifyContent: 'center', textAlign: 'center' })
    } else if (sanitizedAlignment === 'right') {
      setAlignmentStyles({ justifyContent: 'flex-end', textAlign: 'right' })
    }
  }, [contentAlignment])

  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'text-block-' + componentIndex}`}
        className={`w-full ${componentIndex !== 0 ? 'pt-16 lg:pt-24 xl:pt-36' : ''} flex flex-col items-center`}
      >
        {content.text && (
          <motion.div 
            className={`flex flex-col w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl pb-16 lg:pb-24 xl:pb-36 px-5 lg:px-12 content`}
            initial={{ 
              opacity: 0,
              scale: 0.95
            }}
            whileInView={{ 
              opacity: 1,
              scale: 1
            }}
            viewport={{ once: true }} 
            transition={{ 
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: 'spring',
              duration: 1.5
            }}
            style={alignmentStyles}
          >
            <NormalText content={content.text} />
          </motion.div>
        )}
        {componentIndex !== lastComponent && (
          <motion.div 
            className='w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl rounded-full h-1 bg-gradient-to-r from-[#53546d] to-indigo-950' 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }} 
            transition={{ delay: 0.25 }}
          />
        )}
      </section>
    )
  }

  return null
}

export default TextBlock
