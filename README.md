# Cosmic Podcast Network

<a href="https://cosmic-podcast-network.vercel.app/">
  <img src="https://imgix.cosmicjs.com/daec0820-4dd1-11ef-b1ea-f56c65dfade9-podcast-network-screenshot-3.png?w=2000&auto=forat,compression" />
</a>

[[View the demo](https://cosmic-podcast-network.vercel.app)]

[[Install the template](https://www.cosmicjs.com/templates/podcast-network)]

A podcast network website powered by the [Cosmic CMS](https://www.cosmicjs.com/) and Next.js. NOTE: uses a canary version of the [Cosmic JavaScript SDK](https://www.npmjs.com/package/@cosmicjs/sdk) that includes experimental features including [media data fetching](https://github.com/cosmicjs/cosmic-sdk-js/pull/38) and [props graph syntax](https://github.com/cosmicjs/cosmic-sdk-js/pull/37).

## Features

✨ NEW: Now inlucdes account creation and login using the [User Management Block](https://blocks.cosmicjs.com/blocks/user-management)

🔥 Performance optimized

🪄 Partial prerendering

📱 Mobile ready

🌓 Dark mode

<img width="1161" alt="performance" src="https://github.com/user-attachments/assets/ec815177-7443-4a44-b8b7-7453028d374a">

## Getting Started

First, clone this repo.

```bash
git clone https://github.com/cosmicjs/cosmic-podcast-network
cd cosmic-podcast-network
```

Then install packages.

```bash
npm i
# or
yarn
# or
pnpm
# or
bun i
```

## Install the template and connect to Cosmic

1. Log in to the [Cosmic dashboard](https://app.cosmicjs.com/) and create a new Project and select the [Podcast Network template](https://www.cosmicjs.com/templates/podcast-network).

2. Then copy the `.env.copy` to a new `.env.local` file. And add your API keys found in the Cosmic dashboard at _Project / API keys_.

```
# .env.local
COSMIC_BUCKET_SLUG=your_bucket_slug
COSMIC_READ_KEY=your_bucket_read_key
COSMIC_WRITE_KEY=your_bucket_write_key

RESEND_API_KEY=change_to_your_resend_api_key
NEXT_PUBLIC_APP_URL=change_to_your_app_url
NEXT_PUBLIC_APP_NAME="Change to your app name"
SUPPORT_EMAIL=change_to_your_support_email
CONTACT_EMAIL=change_to_your_contact_email
```

## Run the app

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see your message app. Add / delete your messages. See your messages in the Cosmic dashboard as well.

## Contributing

Contributions welcome!
