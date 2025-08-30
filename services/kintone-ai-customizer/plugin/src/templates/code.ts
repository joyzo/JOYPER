import { NAMESPACE } from '../core/constants';

export const jsTemplate = () => `export function init() {\n  console.log('${NAMESPACE}:init');\n}`;
export const cssTemplate = () => `.${NAMESPACE}-root {}`;
