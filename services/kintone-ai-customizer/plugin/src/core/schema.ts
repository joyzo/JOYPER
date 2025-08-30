import { z } from 'zod';

export const configSchema = z.object({
  kintoneDomain: z.string().url(),
  appId: z.string().min(1),
  apiToken: z.string().min(1),
  applyScope: z.array(z.enum(['index', 'detail', 'create', 'edit'])).default(['index']),
  injectPosition: z.enum(['header', 'footer', 'button']).default('header'),
  rollbackRetention: z.number().int().min(1).max(20).default(5),
  safeMode: z.boolean().default(true),
  requirements: z.string().min(1),
});

export type Config = z.infer<typeof configSchema>;
