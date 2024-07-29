# Cosmic Podcast Network

<a href="https://cosmic-podcast-network.vercel.app/">
  <img src="https://imgix.cosmicjs.com/daec0820-4dd1-11ef-b1ea-f56c65dfade9-podcast-network-screenshot-3.png?w=2000&auto=forat,compression" />
</a>

[[View the demo](https://cosmic-podcast-network.vercel.app)]

[[Install the template](https://www.cosmicjs.com/templates/podcast-network)]

A podcast network website powered by the [Cosmic CMS](https://www.cosmicjs.com/) and Next.js.

## Features

🔥 Performance optimized

🪄 Partial prerendering

📱 Mobile ready

🌓 Dark mode

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

1. Log in to the [Cosmic dashboard](https://app.cosmicjs.com/) and create a new Project and select the Podcast Network template.

2. Then copy the `.env.copy` to a new `.env.local` file. And add your API keys found in the Cosmic dashboard at _Project / API keys_.

```
# .env.local
COSMIC_BUCKET_SLUG=your_bucket_slug
COSMIC_READ_KEY=your_bucket_read_key
COSMIC_WRITE_KEY=your_bucket_write_key
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
