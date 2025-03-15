"use server"

import { revalidatePath } from "next/cache"

export async function registerContestant(formData: FormData) {
  // In a real app, this would save to a database
  // For this example, we'll just simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Revalidate the contestants page to show the new contestant
  revalidatePath("/contestants")

  return { success: true }
}

export async function voteForContestant(id: string) {
  // In a real app, this would update a database
  // For this example, we'll just simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Revalidate the contestants and vote pages
  revalidatePath("/contestants")
  revalidatePath("/vote")

  return { success: true }
}

