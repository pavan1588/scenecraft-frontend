"use client";
import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  useEffect(() => { signIn("google", { callbackUrl: "/" }); }, []);
  return (
    <div style={{display:"grid",placeItems:"center",minHeight:"70vh"}}>
      <p>Redirecting to Google</p>
    </div>
  );
}
