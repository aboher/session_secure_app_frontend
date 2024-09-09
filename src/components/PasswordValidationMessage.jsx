import { useState, useEffect } from "react";
import { validatePassword } from "../utils/passwordUtils";

const PasswordValidationMessage = ({ password }) => {
  const [validation, setValidation] = useState({
    hasEightChar: false,
    hasUppercaseLetter: false,
    hasLowercaseLetter: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  useEffect(() => {
    setValidation(validatePassword(password));
  }, [password]);

  const validationRules = [
    { check: validation.hasEightChar, message: "8 to 24 characters." },
    {
      check: validation.hasUppercaseLetter,
      message: "Must include an uppercase letter",
    },
    {
      check: validation.hasLowercaseLetter,
      message: "Must include a lowercase letter",
    },
    { check: validation.hasNumber, message: "Must include a number" },
    {
      check: validation.hasSpecialChar,
      message:
        "Must include a special character. Allowed special Characters: ! @ # $ %",
    },
  ];

  return validationRules.map((rule, index) => (
    <span
      key={index}
      style={rule.check ? { color: "#198754" } : { color: "#dc3545" }}
    >
      <i
        className={
          rule.check ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
        }
      ></i>
      {" " + rule.message} <br/>
    </span>
  ));
};

export default PasswordValidationMessage;
