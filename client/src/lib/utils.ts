import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isBase64Image(imageData: string): boolean {
  if (!imageData || typeof imageData !== "string") {
    return false;
  }

  const base64Regex =
    /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/=]+$/;
  return base64Regex.test(imageData);
}