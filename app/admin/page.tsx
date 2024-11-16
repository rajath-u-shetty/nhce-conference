import { getUserAuth } from "@/lib/auth/utils"

export default async function AdminPage(){
  const session = await getUserAuth()
  if(!session) return <div>Error</div>
  return (
  <div className="">
  <h1>Admin Page</h1>
      <p>{session.session?.user.email}</p>
      <p>{session.session?.user.name}</p>
      <p>{session.session?.user.role}</p>
    </div>
  )
}
