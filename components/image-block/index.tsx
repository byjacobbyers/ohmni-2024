'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { ImageBlockType } from "@/types/components/image-block-type"

// Components
import SimpleText from "@/components/simple-text"
import SanityImage from "@/components/sanity-image"

// Animations
import { scrollReveal } from "@/lib/animations"

const ImageBlock: React.FC<ImageBlockType> = ({
  active,
  componentIndex,
  anchor,
  image,
  fullScreen,
  content,
}) => {
  if (!active) return null

  return (
    <section
      id={`${anchor ? anchor : "image-block-" + componentIndex}`}
      className={`image-block w-full ${fullScreen ? "relative px-5 lg:px-0" : "px-5"}`}
    >
      {fullScreen ? (
        // Full-Screen Layout
        <div className="relative w-full lg:h-[calc(100vh-178px)] overflow-hidden">
          {/* Desktop Overlay */}
          <div className="hidden lg:flex absolute inset-0 z-10 bg-black bg-opacity-50 items-center justify-center">
            <motion.div
              className="text-white text-center max-w-4xl px-5"
              initial={scrollReveal.initial}
              whileInView={scrollReveal.animate}
              viewport={scrollReveal.viewport}
              transition={scrollReveal.transition}
            >
              {content && <SimpleText content={content} />}
            </motion.div>
          </div>

          {/* Image with responsive height */}
          {image && (
            <div className="w-full aspect-[16/9] lg:absolute lg:inset-0 lg:h-full">
              <SanityImage
                source={image}
                alt={image?.alt || 'Fallback image'}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Mobile Text (below image) */}
          <div className="block lg:hidden  text-center py-6 px-4">
            {content && <SimpleText content={content} />}
          </div>
        </div>
      ) : (
        // Regular Layout
        <div className="container flex flex-col items-center justify-center py-16 lg:py-24">
          <motion.div
            className="w-full aspect-video max-w-4xl"
            initial={scrollReveal.initial}
            whileInView={scrollReveal.animate}
            viewport={scrollReveal.viewport}
            transition={scrollReveal.transition}
          >
            {image && (
              <SanityImage
                source={image}
                alt={image?.alt || 'Fallback image'}
                width={1920}
                height={1080}
                componentIndex={componentIndex}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
          {content && (
            <motion.div
              className="text-center max-w-4xl mt-10"
              initial={scrollReveal.initial}
              whileInView={scrollReveal.animate}
              viewport={scrollReveal.viewport}
              transition={{ ...scrollReveal.transition, delay: 0.1 }}
            >
              <SimpleText content={content} />
            </motion.div>
          )}
        </div>
      )}
    </section>
  )
}

export default ImageBlock