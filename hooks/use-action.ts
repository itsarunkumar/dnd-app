import { useState, useCallback } from "react";

type ServerFunction<Result> = (...args: any[]) => Promise<Result>;

interface UseServerFunctionProps<Result> {
  onSuccess?: (result: Result) => void;
  onError?: (error: Error) => void;
}

interface UseServerFunction<Result> extends UseServerFunctionProps<Result> {
  executeServerFunction: (...args: any[]) => Promise<void>;
  isLoading: boolean;
  error: Error | null;
}

const useServerFunction = <Result>(
  serverFunction: ServerFunction<Result>,
  { onSuccess, onError }: UseServerFunctionProps<Result> = {}
): UseServerFunction<Result> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeServerFunction = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await serverFunction(...args);

        if (onSuccess) {
          onSuccess(result);
        }
      } catch (err: Error | any) {
        // Ignore the error if the request was aborted
        if (err.name !== "AbortError") {
          setError(err);

          if (onError) {
            onError(err);
          }
        }
      } finally {
        setIsLoading(false);
      }
    },
    [serverFunction, onSuccess, onError]
  );

  return {
    executeServerFunction,
    isLoading,
    error,
    onSuccess,
    onError,
  };
};

export default useServerFunction;
