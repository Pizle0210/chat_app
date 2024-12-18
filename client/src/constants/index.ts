export const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset"
];

type UserMessagePreview = {
  id: number;
  name: string;
  messages: string[];
  isSent: boolean;
};

export const previewMessage: UserMessagePreview[] = [
  {
    id: 1,
    name: "John",
    isSent: true,
    messages: [
      `Hey Alex, I’ve been diving into Next.js lately, and it’s such a game-changer for server-side rendering (SSR). Have you checked it out?`,
      `The built-in routing is a lifesaver. No need for react-router setup—it just works out of the box. Plus, the API routes make building backend logic so seamless. How does Vite compare when you need SSR?`,
      `Maybe for super small projects, yeah. But for anything scalable, Next.js’s static generation and incremental static regeneration are hard to beat. Does Vite give you flexibility for large-scale apps, or does it feel limited?`,
      `Really solid! Optimized by default with automatic code splitting and pre-fetching. But Vite’s dev server is unbeatable in terms of speed, right?`,
      `Agreed! They both have their sweet spots. I might give Vite a try for my next small project. You’ve got me curious now!`,
      `Deal. Tech talk always leads to better code! 😄`
    ]
  },
  {
    id: 2,
    name: "Alex",
    isSent: true,

    messages: [
      `Oh yeah, I’ve heard about Next.js. But I’ve been using Vite with React for my projects—it’s insanely fast with the dev server. What’s your favorite feature in Next.js so far?`,
      `Vite itself doesn’t do SSR natively, but you can integrate it with frameworks like Remix or even Astro for SSR use cases. I like its simplicity for pure client-side apps. Do you find Next.js overkill for smaller projects?`,
      `It’s actually super flexible—Vite's plugin ecosystem is fantastic for custom setups. But I’ll admit, for a full-stack approach, Next.js does seem more cohesive. How’s the performance in production for Next.js apps?`,
      `Totally. It’s like instant hot module replacement (HMR). No delays at all. I guess it boils down to what the project needs—Next.js for full-stack SSR, Vite for blazing-fast client-side development.`,
      `And I’ll give Next.js a spin when I need SSR. Let’s trade notes when we do!`,
      `Always! 🚀`
    ]
  }
];
