# Blob Monorepo

A full-stack TypeScript monorepo with Hono API and Expo mobile app, connected via tRPC.

## Project Structure

```
blob/
├── apps/
│   ├── api/          # Hono API server with tRPC
│   └── mobile/       # Expo React Native app
├── packages/
│   └── trpc/         # Shared tRPC configuration
└── turbo.json        # Turborepo configuration
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
pnpm install
```

## Development

### Running the API Server

```bash
cd apps/api
pnpm dev
```

The API will be available at `http://localhost:8787` with tRPC endpoint at `/trpc`.

### Running the Expo App

```bash
cd apps/mobile
pnpm start
```

This will start the Expo development server. Press:

- `a` for Android
- `i` for iOS
- `w` for Web

### How Dynamic IP Detection Works

The mobile app automatically detects the development server's IP address, so you don't need to manually configure it:

1. **Development Mode**: The app uses Expo's `Constants.expoConfig.hostUri` to extract the IP address of your development machine
2. **Platform-Specific Fallbacks**:
   - Android emulator: Uses `10.0.2.2` (emulator's localhost mapping)
   - iOS simulator: Uses `localhost`
   - Physical devices: Automatically uses your machine's local network IP

This is implemented in `apps/mobile/utils/api.ts`.

### Production Configuration

For production, set the `EXPO_PUBLIC_API_URL` environment variable:

```bash
# In apps/mobile/.env
EXPO_PUBLIC_API_URL=https://your-production-api.com
```

## tRPC Setup

### Adding New API Routes

Edit `packages/trpc/src/router.ts`:

```typescript
export const appRouter = router({
  myNewRoute: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return { data: `Item ${input.id}` };
    }),
});
```

### Using tRPC in the Mobile App

```typescript
import { trpc } from '@/providers/trpc';

export default function MyScreen() {
  const { data, isLoading } = trpc.myNewRoute.useQuery({ id: '123' });

  return (
    <View>
      {isLoading && <Text>Loading...</Text>}
      {data && <Text>{data.data}</Text>}
    </View>
  );
}
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **API**: Hono (Cloudflare Workers)
- **Mobile**: Expo + React Native
- **RPC**: tRPC v11
- **Validation**: Zod
- **Styling**: NativeWind (Tailwind for React Native)
- **State Management**: Zustand
- **Type Safety**: TypeScript

## Deployment

### API

```bash
cd apps/api
pnpm deploy
```

### Mobile App

```bash
cd apps/mobile
pnpm prebuild
# Follow Expo's deployment guide for iOS/Android
```
