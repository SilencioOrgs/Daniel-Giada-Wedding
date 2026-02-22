// Fallback implementation of cn without external dependencies
// because npm install failed to install clsx and tailwind-merge.
// TODO: When npm install works, revert to:
// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export function cn(...inputs: (string | undefined | null | false)[]) {
    return inputs.filter(Boolean).join(" ");
}
