function sanitizeValue(val: string | undefined, fallback: string): string {
  if (!val || val === '[SENSITIVE]' || !/^[a-z0-9-]+$/.test(val.trim())) {
    return fallback;
  }
  return val.trim();
}

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION?.trim() || '2024-12-04'

export const dataset =
  sanitizeValue(process.env.NEXT_PUBLIC_SANITY_DATASET, 'production')

export const projectId =
  sanitizeValue(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, '2tb1r00m')