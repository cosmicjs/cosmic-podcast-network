import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFormattedDate = (inputDate: string) => {
  const dateParts = inputDate.split("-")

  const year = parseInt(dateParts[0])
  const month = parseInt(dateParts[1]) - 1
  const day = parseInt(dateParts[2])

  // Create a new Date object using UTC timezone
  const date = new Date(Date.UTC(year, month, day))

  // Format the date in UTC
  const formattedDate = date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return formattedDate
}
