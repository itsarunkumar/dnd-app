import {
  useCallback,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import Modal from "./modal";
import { signIn } from "next-auth/react";

const SingInModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [signInClicked, setSignInClicked] = useState(false);

  return (
    <Modal showModal={showModal} setShowModal={setShowModal}>
      <div className="w-full h-80 border shadow-lg gap-5 flex flex-col justify-center items-center ">
        <h1 className="text-xl font-semibold">Welcome to Spaces</h1>
        <h1>Sign in</h1>
        <button
          onClick={() => {
            setSignInClicked(true);
            signIn("google");
          }}
          className="px-5 py-2 border outline-none shadow-sm bg-slate-800 text-slate-50 rounded-md"
        >
          {signInClicked ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInUser = useCallback(() => {
    return (
      <SingInModal
        showModal={showSignInModal}
        setShowModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, UserSignInModal: SignInUser }),
    [setShowSignInModal, SignInUser]
  );
}
