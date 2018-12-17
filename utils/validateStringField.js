const validateStringField = (name, value) => {
  if (typeof value !== "string" || !value.length) {
    return false;
  }
  return true;
};

module.exports = {
  validateStringField
};
