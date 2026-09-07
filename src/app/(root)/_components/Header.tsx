import { currentUser } from '@clerk/nextjs/server'
import React from 'react'
import { api } from "../../../../convex/_generated/api";
import { ConvexHttpClient } from 'convex/browser'

async function Header () {
    const convex= new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const user= await currentUser();
    const convexUser= await convex.query(api.users.getUsers,{
        userId:user?.id || ""
    } )
    console.log(convexUser);
  return (
    <div>Header</div>
  )
}

export default Header