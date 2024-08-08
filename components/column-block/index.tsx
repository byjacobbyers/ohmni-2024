'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { ColumnBlockType } from "@/types/components/column-block-type"
import { ColumnArrayType } from "@/types/arrays/column-array-type"

// Components
import SimpleText from "@/components/simple-text"
import ColumnArray from "@/components/column-array"

const ColumnBlock: React.FC<ColumnBlockType> = ({
  active,
  componentIndex,
  anchor,
  content,
  rows
}) => {


  if (active) {
    return (
      <section
        id={`${anchor ? anchor : 'column-block-' + componentIndex}`}
        className={`w-full ${componentIndex !== 0 && 'pt-16 lg:pt-24 xl:pt-36'} flex flex-col items-center`}
      >
        <div className='flex flex-col gap-y-16 text-center items-center w-full max-w-6xl xl:max-w-7xl 2xl:max-w-8xl pb-16 lg:pb-24 xl:pb-36 px-5'>
          {content && (
            <motion.div 
              className='content'
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
          )}
           {rows && rows.map((row, index) => { 
            return (
              <div key={index} className='w-full '>
                {row._type === 'columnArray' ? (
                  <ColumnArray row={row as ColumnArrayType} />
                ) : null}
              </div>
            )
           })}
        </div>
      </section>
    )
  }

  return null
}

export default ColumnBlock
