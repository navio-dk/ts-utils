# Nomad Solutions Typescript Utility Library

This library contains both utility functions and utility types.

## Install
Add this repository as a dependency in your `package.json`:

**Specific tag (recommended)**
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
