# tRPC Package

This package contains the shared tRPC setup for the Blob monorepo.

## Overview

- `server.ts` - tRPC server initialization
- `router.ts` - Shared tRPC routes
- `client.ts` - tRPC client utilities

## Adding New Routes

To add new routes, edit `src/router.ts`:

```typescript
export const appRouter = router({
  // Your existing routes...

  newRoute: publicProcedure
    .input(
      z.object({
        /* your input schema */
      }),
    )
    .query(({ input }) => {
      // Your logic here
      return { data: "something" };
    }),
});
```

## Usage in Apps

### In the Hono API (Server)

The router is automatically mounted at `/trpc` in `apps/api/src/index.ts`.

### In the Expo App (Client)

Use the `trpc` hooks in your components:

```typescript
import { trpc } from '@/providers/trpc';

export default function MyComponent() {
  const { data, isLoading } = trpc.hello.useQuery({ name: 'World' });

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {data && <Text>{data.greeting}</Text>}
    </View>
  );
}
```
