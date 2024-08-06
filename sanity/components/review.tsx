import { AiFillStar } from "react-icons/ai";
import SimpleText from "@/components/simple-text"
import { client } from '../lib/client'
import { useEffect, useState } from "react";
import Image from 'next/image'

const ReviewComponent = ({ document }: { document: any }) => {
  const [reviewImage, setReviewImage] = useState(null)

  useEffect(() => {
    const fetchReviewImage = async () => {
      if (document?.displayed.image) {
        const query = `*[_type == "review" && _id == $id]{
          ...,
          image {
            asset->{
              url
            }
          }
        }`
        const params = { id: document.displayed._id }
        const data = await client.fetch(query, params)
        const image = data[0]?.image?.asset?.url
        setReviewImage(image)
      }
    }

    fetchReviewImage()
  }, [document])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', padding: '20px', borderRadius: '10px' }}>
      <div style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', backgroundColor: 'black', padding: '10px', borderRadius: '30px', alignItems: 'center', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          {reviewImage && (
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Image 
                src={reviewImage}
                alt="@shadcn"
                sizes={`(min-width: 1920px) 1920px, 100vw `}
                width={100}
                height={100}
                style={{ borderRadius: '50%' }}
              />
            </div>
          )}
          <div style={{ display: 'flex', gap: '5px', color: '#8f80c6' }}>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
          </div>
        </div>
        {document?.displayed.content && (
          <div style={{ fontSize: '1.125rem', color: 'white', lineHeight: '1.75rem', marginTop: '20px' }}>
            <SimpleText content={document?.displayed.content} />
          </div>
        )}
        <div style={{ textAlign: 'center', color: 'white' }}>
          {document?.displayed.name && (<h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{document?.displayed.name}</h3>)}
          {document?.displayed.title && (<p style={{ fontSize: '1.125rem' }}>{document?.displayed.title}</p>)}
        </div>
      </div>
    </div>
  )
}

export default ReviewComponent
