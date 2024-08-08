'use client'
import Image from 'next/image'
import { urlFor } from './url'

interface SanityImageProps {
  source: {
    asset: {
      url: string
      metadata: {
        dimensions: {
          aspectRatio: number
          height: number
          width: number
        }
      }
    }
    hotspot: {
      x: number
      y: number
    }
  }
  alt: string
  width: number
  height: number
  fill?: boolean
  componentIndex?: number
  role?: string
  sizes?: string
  className?: string
}


export default function SanityImage({ 
  source, 
  alt, 
  width, 
  height, 
  fill=false, 
  componentIndex=1,
  role='none',
  sizes='(max-width: 600px) 90vw, (max-width: 1200px) 60vw, 500px',
  className
}: SanityImageProps){

  

  let imageUrlBuilder = urlFor(source.asset.url)
    .width(width)
    .height(height)
    .dpr(2)
    .quality(100)
    .auto('format')
    .fit('crop')

  if (source.hotspot) {
    imageUrlBuilder = imageUrlBuilder.focalPoint(source.hotspot.x, source.hotspot.y)
  }

  const imageUrl = imageUrlBuilder.url()


  const blurUrl = urlFor(source.asset.url)
    .width(20)
    .quality(20)
    .url()

  const priority = componentIndex === 0 ? true : false
	const loading = componentIndex === 0 ? 'eager' : 'lazy'
  const widthProp = fill === true ? undefined : width
  const heightProp = fill === true ? undefined : height
  
  return (
    <Image
      className={className}
      src={imageUrl}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurUrl}
      width={widthProp}
      height={heightProp}
      fill={fill}
      priority={priority}
      loading={loading}
      role={role}
      sizes={sizes}
    />
  )
}