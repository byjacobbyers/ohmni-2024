'use client'

// Tools

// Types
import { FaqBlockType } from "@/types/components/faq-block-type"

// Components
import SimpleText from "@/components/simple-text"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FaqBlock: React.FC<FaqBlockType> = ({
  active,
  componentIndex,
  anchor,
  faqs,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "faq-block-" + componentIndex}`}
      className="faq-block w-full px-5"
    >
      <div className="container py-16 lg:py-24 flex flex-col justify-center items-center p-5 bg-white w-full border-2 border-black min-h-24">
        {/* Title */}
        <div className="prose 2xl:prose-h2:text-4xl 2xl:prose-h2:leading-relaxed text-center max-w-4xl 2xl:max-w-6xl pb-5 md:pb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full max-w-2xl">
          {faqs?.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-black">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-gray-700">
                <SimpleText content={faq.answer} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FaqBlock