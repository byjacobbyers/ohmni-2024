import SimpleText from "@/components/simple-text";
import { client } from "../lib/client";
import { useEffect, useState } from "react";

const ReviewComponent = ({ document }: { document: any }) => {
  const [reviewImage, setReviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviewImage = async () => {
      if (document?.displayed.image) {
        const query = `*[_type == "review" && _id == $id]{
          image {
            asset->{
              url
            }
          }
        }`;
        const params = { id: document.displayed._id };
        const data = await client.fetch(query, params);
        const image = data[0]?.image?.asset?.url;
        setReviewImage(image);
      }
    };

    fetchReviewImage();
  }, [document]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        border: "2px solid #000",
        maxWidth: "400px",
        margin: "2rem auto 0 auto",
      }}
    >
      {/* Avatar Replacement */}
      {reviewImage ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            height: "96px",
            width: "96px",
            overflow: "hidden",
            borderRadius: "50%",
          }}
        >
          <img
            src={reviewImage}
            alt={document?.displayed.name || "Reviewer"}
            style={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
            }}
          />
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "96px",
            width: "96px",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            backgroundColor: "#e0e0e0",
            color: "#555",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          {document?.displayed.name?.charAt(0) || "?"}
        </div>
      )}

      {/* Review Content */}
      {document?.displayed.content && (
        <div style={{ 
          fontSize: "18px", 
          color: "#000", 
          textAlign: "center", 
          textWrap: "balance",
          margin: "-18px 0",
        }}>
          <SimpleText content={document?.displayed.content} />
        </div>
      )}

      {/* Reviewer Info */}
      <div style={{ textAlign: "center", color: "#000", marginTop: "2.5rem" }}>
        {document?.displayed.name && (
          <h3 style={{ 
            fontSize: "1.5rem", 
            fontWeight: "700",
            fontFamily: "Inknut Antiqua",
            margin: "0",
            lineHeight: "2rem",
          }}>
            {document?.displayed.name}
          </h3>
        )}
        {document?.displayed.title && (
          <p style={{ 
            fontSize: "18px", 
            padding: "0",
            color: "#000",
            margin: "0",
          }}>
            {document?.displayed.title}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;