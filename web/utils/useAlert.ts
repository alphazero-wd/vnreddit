import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const useAlert = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [alert, setAlert] = useState(false);
  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);
  return [alert, setAlert];
};
