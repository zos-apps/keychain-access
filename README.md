# 🔐 Keychain Access

Manage passwords and secure notes

## Category
`system`

## Installation

```bash
npm install @anthropic/keychain-access
# or
pnpm add @anthropic/keychain-access
```

## Usage

```tsx
import App from '@anthropic/keychain-access';

function MyComponent() {
  return <App onClose={() => console.log('closed')} />;
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Watch mode
pnpm dev
```

## zOS Integration

This app is designed to run within zOS, a web-based operating system. It follows the zOS app specification with:

- Standalone React component
- TypeScript support
- Tailwind CSS styling
- Window management integration

## License

MIT
