"use client";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createOrg, deleteOrg } from "@/actions/create-org";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { SubmitButton } from "@/components/submit-button";
import { Plus, Trash2Icon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

export default function OrgForm() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} size="icon">
        <Plus className=" h-4 w-4" />
      </Button>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        className="w-full p-6 space-y-4 "
      >
        <h1 className="text-xl font-bold">Create Organisation</h1>
        <form
          action={(d) => {
            createOrg(d);
            setShowModal(false);
          }}
          className="flex flex-col items-center gap-y-4"
        >
          <Label htmlFor="orgname" className="w-full flex items-center gap-x-2">
            Org Name
            <Input
              type="text"
              name="orgname"
              id="orgname"
              placeholder="organisation name"
            />
          </Label>

          <SubmitButton>Create</SubmitButton>
        </form>
      </Modal>
    </>
  );
}

export function DeleteOrgForm({ id }: { id: string }) {
  const [localOrg, setLocalOrg] = useLocalStorage<Record<string, string>>(
    "s-org",
    {}
  );

  return (
    <form
      action={(data) => {
        deleteOrg(data);
        data.get("orgid") === localOrg.id && setLocalOrg({});
      }}
    >
      <input type="text" name="orgid" id="orgid" hidden value={id} />
      <SubmitButton variant="destructive" size="icon">
        <Trash2Icon className="w-4 h-4" />
      </SubmitButton>
    </form>
  );
}
