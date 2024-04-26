import { createClient } from "@/database/supabase"
import Profile from "./profile/page"
import { useEffect } from "react"


export default async function HomeDesktop() {

  const supabase = await createClient()
  const { data, error} = await supabase.auth.signUp({
    email: 'saasda',
    password: 'dfs'
  })

  console.log(data, error)

  return (
    <Profile />
  )
}
