export const validatePassword = (password) => {
  const EIGHT_CHAR_REGEX = /^.{8,24}$/;
  const UPPERCASE_REGEX = /[A-Z]/;
  const LOWERCASE_REGEX = /[a-z]/;
  const NUMBER_REGEX = /\d/;
  const SPECIAL_CHAR_REGEX = /[!@#$%]/;

  return {
    hasEightChar: EIGHT_CHAR_REGEX.test(password),
    hasUppercaseLetter: UPPERCASE_REGEX.test(password),
    hasLowercaseLetter: LOWERCASE_REGEX.test(password),
    hasNumber: NUMBER_REGEX.test(password),
    hasSpecialChar: SPECIAL_CHAR_REGEX.test(password),
  };
};
