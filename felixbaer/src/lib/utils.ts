/**
 * Utility function to merge CSS classes
 * A lightweight alternative to clsx + tailwind-merge
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter(Boolean)
    .join(' ')
    .trim();
}