### Installation process of Convex (backend database)

```
pnpm i convex (as i used pnpm)
            |
            |
            \/
pnpm dlx convex dev (in documentation its npx convex dev but we will use "pnpm dlx convex dev" every time it should be run in the terminal)
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

### For creating blogs for create-blog route as per convex documentation(database/documentation) first create schema in convex/schema.ts this is the best practice.

### As the create Blog page is created according to the tutorial (React Hook form and convex) but create task is created according to the traditional react hook form and create with server actions (according to the documentation "https://docs.convex.dev/client/nextjs/app-router/server-rendering#server-actions-and-route-handlers") with the help of convex. Working routes are following:

- convex\tasks.ts
- app/(shared-layout)/create-task/page.tsx
- convex\taskActions.ts
- app\schema\create-task.ts
