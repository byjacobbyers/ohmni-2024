'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { CtaFormType } from "@/types/components/cta-form-type"

// Components
import SimpleText from '@/components/simple-text'
import CtaFormDialogue from "./dialogue"
import Route from '@/components/route'
import { Button } from "@/components/ui/button"



const CtaForm: React.FC<CtaFormType> = ({
  active,
  componentIndex,
  anchor,
  content,
  file,
  formId, 
  buttonText
}) => {

  console.log('file', file)

  if (active) {
    return (
      <section 
        id={`${anchor ? anchor : 'cta-form-' + componentIndex}`}
        className="cta-form w-full px-5"
      >
        <motion.div 
          className='container py-16 lg:py-24 flex flex-col justify-center items-center p-5 bg-white w-full border-2 border-black min-h-24'
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
          {content && (
            <div className='prose text-center max-w-4xl pb-5 md:pb-10'>
              <SimpleText content={content} />
            </div>
          )}
          {buttonText && formId && file && (
            <CtaFormDialogue file={file} formId={formId} buttonText={buttonText} />
          )}
        </motion.div>
      </section>
    )
  }

}

export default CtaForm