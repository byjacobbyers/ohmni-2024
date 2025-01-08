import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

// Determine the studio URL based on the environment
const studioUrl =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_LOCAL_URL}/studio`
    : `${process.env.NEXT_PUBLIC_SITE_URL}/studio`;

if (!studioUrl) {
  throw new Error("Studio URL is not defined in the environment variables.");
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  perspective: "published",
  stega: { studioUrl },
})
