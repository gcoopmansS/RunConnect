import { SignedIn, SignedOut, SignIn, UserButton } from "@clerk/clerk-react";
import React from "react";

const AuthRoutes: React.FC = () => (
  <>
    <SignedIn>
      <div style={{ display: "flex", justifyContent: "flex-end", padding: 16 }}>
        <UserButton afterSignOutUrl="/" />
      </div>
    </SignedIn>
    <SignedOut>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <SignIn routing="hash" />
      </div>
    </SignedOut>
  </>
);

export default AuthRoutes;
