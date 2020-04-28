/**
 * @func correctFormEmail - regEx
 * @desc validates if a value is correctly formatted to be an email
 * @param {String} value Value to validate
 * @returns {Boolean} Value formatted correctly
 */
const correctFormEmail = (value = "") =>
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    value
  );

/**
 * @func trimAndLowerCase - regEx
 * @desc Take a string to convert to lowercase and remove spaces, ideal to do searches in the db
 * @param {String} value
 * @returns {String} Value input in lowercase and without spaces
 */
const trimAndLowerCase = (value = "") => value.replace(/ /g, "").toLowerCase();

module.exports = {
  correctFormEmail,
  trimAndLowerCase,
};
