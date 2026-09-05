import {
  SignedIn,
  SignedOut,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
        <SignedOut>
          <SignUpButton />
        </SignedOut>
       <SignedIn>
        <SignOutButton />
       </SignedIn>
     

    </div>
  );
}
