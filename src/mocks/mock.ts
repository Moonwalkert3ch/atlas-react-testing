import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/api/v1/data", () => {
      return HttpResponse.json([
       {
         id: 1,
         title: "MoonWalker Music",
         artist: "chris brown",
         duration: "4:44"
       },
       {
         id: 2,
         title: "The Bradford Hour",
         artist: "jaheem",
         duration: "11:11"
       }
      ]);
    }
  ),
];

export const server = setupServer(...handlers);