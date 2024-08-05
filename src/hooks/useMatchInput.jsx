import { useState, useEffect } from "react";

const useMatchInput = (regex) => {
  const [value, setValue] = useState("");
  const [valueIsValid, setValueIsValid] = useState(false);

  const [matchValue, setMatchValue] = useState("");
  const [matchValueIsValid, setMatchValueIsValid] = useState("");

  useEffect(() => {
    setValueIsValid(regex.test(value));
    setMatchValueIsValid(value === matchValue);
  }, [value, matchValue, regex]);

  return [
    value,
    setValue,
    valueIsValid,
    matchValue,
    setMatchValue,
    matchValueIsValid,
  ];
};

export default useMatchInput;
