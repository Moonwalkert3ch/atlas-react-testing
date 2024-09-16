import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://raw.githubusercontent.com/atlas-jswank/atlas-music-player-api/main/playlist", () => {
      return HttpResponse.json([
       {
         id: 1,
         title: "Test MoonWalker Music",
         artist: "Test Artist 1",
         duration: "4:44",
         cover: "https://example.com/cover1.jpg"
       },
       {
         id: 2,
         title: "Test Bradford Hour",
         artist: "Test Artist 2",
         duration: "11:11",
          cover: "https://example.com/cover2.jpg"
       }
      ]);
    }
  ),
];

export const server = setupServer(...handlers);