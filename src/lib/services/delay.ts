export function delay(ms = 500) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
