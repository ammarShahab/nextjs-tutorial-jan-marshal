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

## #Flow

1.0 Create schema for create task functionality
1.1 Create a task api in convex
1.2 create zod schema in frontend
1.3 create task form in frontend
1.4 create task actions in frontend
2.0 to make any server components remain server components we will use fetchQuery using react feature streaming (i.e in tasks page the client component Navbar and static component in the server component do not render only dynamic data will render with Skeleton Loading). But realtime updates will not be possible using fetchQuery for its limitations. to make server components realtime we will use preloadQuery which we will learn later.
2.1 fetch query in a server component and make it separate because we only want to stream the dynamic data
2.2 Created a Skeleton loading
3.1 define the schema for the image as an id type. As per convex doc the image storage is works with id
3.2 Create a mutation to generate an upload URL according to the convex documentation
3.3 Add the imageStorageId to the schema
3.4 Add the imageStorageId
3.5 call the generateImageUploadUrl
3.6 created an image id (it has a flow of 3.6.1 to 3.6.4)
4.0 as in build mode when Unauthorized the ui not showing the Unauthorized message. Following we use the Unauthorized error to show the message
4.1 create type for error message
4.2 return the Promise of ActionMessage
4.3 and 4.4 use try catch
5.0 as the task route is dynamic because its a shared layout with using token, so to make it static we will use force-static and in build mode. Note: to make any dynamic server component static (cached) we will use force-static. now after build when create any task it will show the stale data.
6.0 to revalidate the data there are two types of revalidation i. time based revalidation ii. on demand revalidation. Note: it is also called ISR (Incremental Static Regeneration).
6.1 time based revalidation in every 30 seconds i.e. after 30 seconds the data will be updated
6.2 on demand revalidation are two types i. revalidatePath ii. revalidateTag. Note: as we use revalidatePath so time based revalidation will not work now. It will work only in server environment and route handlers. Not work in client component and proxy.
7.0 show individual blog using params. Note: await params is used only in server component
7.1 Create query for individual blog
7.2 also extract the imageStorageId
7.3 create blog schema
8.0 my requirement is implement a blog comment feature so first create a comment table
8.1 created a backend api for comments.ts and Get all comments for a specific blog using filter index
8.2 Post a comment
8.3 created a comment schema in frontend
8.4 create a CommentSection
8.5 get the blogId using useParams. Note: useParams is used to get the id in the client side. so we can avoid props drilling also.
8.6 call the CommentSection in blogId route
9.0 as we want to instant update the comments, we need to use useQuery to fetch the comments.(currently commented because we will to render it using usePreloadQuery)
10.0 as we want to show the comments in sever component without loading so as documentation we use preloadQuery but for performance optimization as the two fetching blog and preloadedComments are fetch sequentially which causes unnecessary loading time. But we want to fetch them in parallel using Promise.all thats why commented both blog and preloadedComments.
10.1
10.2 passed as props
10.3 as per documentation we will pass the props following
10.4 as per documentation we will use usePreloadedQuery which show the comments without loading
10.5 to make the comments realtime we will use useQuery
11.0 my requirement is use metadata for SEO benefits. Remember metaData (static page) and generateMetadata (dynamic page) both are server only. So we commented the use client and change the useQuery(client side query for live instant update) to fetchQuery(server side query but update upon refresh) and make the function async.
11.1 use generateMetadata for seo in dynamic page
12.0 There is feature like user who is currently viewing the blog get Realtime presence not implemented yet (but u will find in the video https://www.youtube.com/watch?v=MZbwu3-uz3Y&t=10393s from 6:50 - 7:09).
