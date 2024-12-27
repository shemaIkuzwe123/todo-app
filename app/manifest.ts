import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Todo App",
    description: "Next js Todo App",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icons/icon1.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        src: "/icons/icon1.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  };
}
