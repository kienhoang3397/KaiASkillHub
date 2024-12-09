import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function calculateProgress(
  currentExp: number,
  xpPerLevel: number
): number {
  return Math.floor(((currentExp % xpPerLevel) / xpPerLevel) * 100);
}

export function getAchievementLevel(
  level: number,
  levels: typeof ACHIEVEMENT_LEVELS
) {
  return (
    Object.values(levels).find(
      (l) => level >= l.minLevel && (!l.maxLevel || level <= l.maxLevel)
    ) || levels.BEGINNER
  );
}
