'use client'

// Tools
import { motion } from "framer-motion"

// Types
import { ImageBlockType } from "@/types/components/image-block-type"

// Components
import SimpleText from "@/components/simple-text"
import SanityImage from "@/components/sanity-image"

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
      className={`image-block w-full ${fullScreen ? "relative" : "px-5"}`}
    >
      {fullScreen ? (
        // Full-Screen Layout
        <div className="relative w-full h-[calc(100vh-178px)] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
            <motion.div
              className="text-white text-center max-w-4xl px-5"
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
            >
              {content && <SimpleText content={content} />}
            </motion.div>
          </div>
          {image && (
            <SanityImage
              source={image}
              alt={image?.alt || 'Fallback image'}
              width={1920}
              height={1080}
              componentIndex={componentIndex}
              fill
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      ) : (
        // Regular Layout
        <div className="container flex flex-col items-center justify-center">
          <motion.div
            className="w-full aspect-video max-w-4xl"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              delay: componentIndex !== 0 ? 0.5 : 0,
              type: "spring",
              duration: 1.5,
            }}
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
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{ once: true }}
              transition={{
                delay: componentIndex !== 0 ? 0.5 : 0,
                type: "spring",
                duration: 1.5,
              }}
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