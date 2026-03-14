### Installation procees of Convex (backend databasr)

```
pnpm i convex (as i used pnpm)
            |
            |
            \/
pnpm dlx convex dev (in documentation its npx convex dev but we will use "pnpm dlx convex dev" everytime it should be run in the terminal)
            |
            |
           \/
now as per documentation (for nextjs) create "sampleData.jsonl" in root and paste the sample data and run the command "pnpm dlx convex import --table tasks sampleData.jsonl"
            |
            |
           \/
Now follow the rest of the flow as per documentation

```

### Using authentication using Better-auth & Convex

- see the documentation "https://better-auth.com/docs/integrations/convex" and end to "Wrap your app with the ConvexClientProvider component"
- also read that document "https://labs.convex.dev/better-auth/basic-usage/authorization"
- to implement follow the Navbar.tsx file
