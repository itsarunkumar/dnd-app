"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useMemo,
  ElementRef,
} from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

import { Button, ButtonProps as BtnProps } from "@/components/ui/button";
import {
  Textarea,
  TextareaProps as TextAreaProps,
} from "@/components/ui/textarea";

interface ButtonProps extends BtnProps {
  text?: string;
}

interface TextareaProps extends TextAreaProps {
  value?: string;
}

interface EditInputProps {
  buttonProps?: ButtonProps;

  textareaProps?: TextareaProps;
}

interface EditInputState {
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export function useEditTextarea(): [React.FC<EditInputProps>, EditInputState] {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);

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

  const EditTextareaComponent: React.FC<EditInputProps> = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      ({ buttonProps, textareaProps }) => {
        if (isEditing) {
          return <Textarea ref={formRef} {...textareaProps} />;
        }

        return (
          // @ts-ignore
          <div role="button" onClick={enableEditing} {...buttonProps}>
            {buttonProps?.text || "Add description"}
          </div>
        );
      },
    [isEditing, enableEditing]
  );

  EditTextareaComponent.displayName = "EditInput";

  return [EditTextareaComponent, { isEditing, enableEditing, disableEditing }];
}
