'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { HeroBlockType } from "@/types/components/hero-block-type"

// Components
import SimpleText from '@/components/simple-text'
import Route from '@/components/route'
import { Button } from "@/components/ui/button"


const HeroBlock: React.FC<HeroBlockType> = ({
  active,
  componentIndex,
  content,
  anchor,
  cta
}) => {

  if (active) {
    return (
      <section 
        id={`${anchor ? anchor : 'hero-block-' + componentIndex}`}
        className='hero-block w-full px-5'
      >
        <div className='container flex w-full gap-24'>
          <motion.div 
            className="w-full md:w-2/3 space-y-5 "
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
          >
            <SimpleText content={content} />
          </motion.div>
          <motion.div 
            className="w-full md:w-1/3 h-96 bg-gray-500 mt-0 md:mt-24"
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
          >
          
          </motion.div>
        </div>
      </section>
    )
  }

  return null
}

export default HeroBlock