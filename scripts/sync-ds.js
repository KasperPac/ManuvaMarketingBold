import { cp, mkdir, rm } from 'node:fs/promises';

const OUT = 'public/_ds';
await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('_ds/tokens', `${OUT}/tokens`, { recursive: true });
await cp('_ds/assets', `${OUT}/assets`, { recursive: true });
console.log('synced _ds → public/_ds');
