"use client";

import React, { useState } from "react";

import { useSignInModal } from "./sign-in-modal";
import { Button } from "./ui/button";

export default function UserSignIn() {
  const { UserSignInModal, setShowSignInModal } = useSignInModal();

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowSignInModal(true)}>Login</Button>{" "}
      <UserSignInModal />
    </>
  );
}
