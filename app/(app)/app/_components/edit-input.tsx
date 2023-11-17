import { Button, ButtonProps as BtnProps } from "@/components/ui/button";
import { Input, InputProps as InpProps } from "@/components/ui/input";
import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  ElementRef,
} from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface ButtonProps extends BtnProps {
  text?: string;
}

interface InputProps extends InpProps {
  placeholder?: string;
}

interface EditInputProps {
  buttonProps: ButtonProps;
  inputProps: InputProps;
}

interface EditInputState {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export function useEditInput(): [React.FC<EditInputProps>, EditInputState] {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef<ElementRef<"input">>(null);

  const enableEditing = useCallback(() => {
    setIsEditing(true);
  }, []);

  const disableEditing = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        disableEditing();
      }
    },
    [disableEditing]
  );

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const EditInputComponent: React.FC<EditInputProps> = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ buttonProps, inputProps }) => {
        if (isEditing) {
          return <Input ref={formRef} {...inputProps} />;
        }

        return (
          <Button onClick={enableEditing} {...buttonProps}>
            {buttonProps.text || "Add List"}
          </Button>
        );
      },
    [isEditing, enableEditing]
  );

  EditInputComponent.displayName = "EditInput";

  return [EditInputComponent, { isEditing, enableEditing, disableEditing }];
}
