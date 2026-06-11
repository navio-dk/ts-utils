# Nomad Solutions Typescript Utility Library

This library contains both utility functions and utility types.

## Install
This package is published to **GitHub Packages**. The registry install (below) is recommended — `github:` refs are incompatible with `bun install --frozen-lockfile`. The `github:` method still works and is kept for repos still mid-migration.

### Registry (recommended)
First, add a scoped registry + auth to your project's `.npmrc` (next to `package.json`)

```ini
# .npmrc
@navio-dk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

- **Local:** create a GitHub [personal access token **(classic)**](https://github.com/settings/tokens/new) with the `read:packages` scope (GitHub Packages does **not** support fine-grained tokens; if `navio-dk` enforces SAML SSO, click **Configure SSO** on the token and authorize it for the org), then export it in your shell — keep it in the env, never paste it into the committed `.npmrc`:

  ```bash
  export NODE_AUTH_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx   # add to ~/.zshrc (or ~/.bashrc) to persist across sessions
  ```

- **CI (GitHub Actions):** set `NODE_AUTH_TOKEN` to `${{ secrets.GITHUB_TOKEN }}` and grant this package "Actions access" to the consuming repo (Package → Settings → Manage Actions access).

Then add the dependency in your `package.json`:

```json5
// package.json
{
	"devDependencies": {
		"@navio-dk/ts-utils": "^{version}"
	}
}
```

### GitHub ref (legacy — being phased out)
<!-- eslint-disable-next-line markdown/no-missing-label-refs -->
> [!NOTE]
> `github:` refs break `bun install --frozen-lockfile`. Prefer the registry install above; these remain for repos still on the old approach.

**Specific tag**
```json5
// package.json
{
	"devDependencies": {
		"@navio-dk/ts-utils": "github:navio-dk/ts-utils#v{version}"
	}
}
```

**Latest commit**
```json5
// package.json
{
	"devDependencies": {
		"@navio-dk/ts-utils": "github:navio-dk/ts-utils"
	}
}
```

## Usage
After installation, you can import any utility with as such:

```typescript
import { createShutdownHandler } from '@navio-dk/ts-utils';
import type { MergeArrayOfObjects } from '@navio-dk/ts-utils';
```

## Utilities
Go digging in the source code in `./lib/`. All utilites should be documented in the code.

## Development

### Developing with other application
When developing on this package, it might be beneficial to see how changes interact with your source code in your application. To do this, you can use [bun link](https://bun.sh/docs/cli/link).

**TLDR**:
1. Execute `bun link` from the root of this repository.
2. Execute `bun link @navio-dk/errors` in the root of your application.

This package should now be usable in your application (see [Usage section](#usage)), and updates to this package will be reflected instantly in your application (by the magic of symlinks).

<!-- eslint-disable-next-line markdown/no-missing-label-refs -->
> [!IMPORTANT]  
> This will not add the dependency to your `package.json`, so you will need to [install](#install) this package manually if you wish to do use it.
