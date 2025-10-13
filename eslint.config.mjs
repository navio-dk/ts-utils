import tseslint from 'typescript-eslint';
import base from '@navio-dk/dev-env/eslint/typescript';

export default tseslint.config(
	base,
	{ 
		ignores: [ 'CHANGELOG.md' ]
	}
);

