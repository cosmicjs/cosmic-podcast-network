import { createBucketClient } from "@cosmicjs/sdk"

if (!process.env.COSMIC_BUCKET_SLUG)
  console.error(
    "Error: Environment variables missing. You need to create an environment variable file and include COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, and COSMIC_WRITE_KEY environment variables."
  )
// Make sure to add/update your ENV variables
export const cosmic = createBucketClient({
  bucketSlug:
    process.env.COSMIC_BUCKET_SLUG ||
    "You need to add your COSMIC_BUCKET_SLUG environment variable.",
  readKey:
    process.env.COSMIC_READ_KEY ||
    "You need to add your COSMIC_READ_KEY environment variabl.",
  writeKey:
    process.env.COSMIC_WRITE_KEY ||
    "You need to add your COSMIC_WRITE_KEY environment variable.",
})
