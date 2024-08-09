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
        className={`column-block w-full flex flex-col items-center`}
      >
        <div className='container flex flex-wrap text-center'>
          {content && (
            <motion.div 
              className='prose max-w-none w-full pb-16'
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
