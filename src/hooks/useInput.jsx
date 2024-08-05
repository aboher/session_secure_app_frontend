import { useState, useEffect } from "react";

const useInput = (regex) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(regex.test(value));
  }, [value, regex]);

  return [value, setValue, isValid];
};

export default useInput;
