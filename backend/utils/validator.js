const validator = require("validator");

const validateRegistrationFields = (email, firstName, lastName, password) => {
  const errors = [];

  // Validate email
  if (!validator.isEmail(email)) {
    errors.push({ field: "email", msg: "Invalid email" });
  }

  // Validate firstName
  if (!validator.isLength(firstName, { min: 1 })) {
    errors.push({ field: "firstName", msg: "First name is required" });
  }

  // Validate lastName
  if (!validator.isLength(lastName, { min: 1 })) {
    errors.push({ field: "lastName", msg: "Last name is required" });
  }

  // Validate password
  if (!validator.isStrongPassword(password, { minLength: 8 })) {
    errors.push({ field: "password", msg: "Invalid password" });
  }

  return errors;
};

const validateLoginFields = (email, password) => {
  const errors = [];

  // Validate email
  if (!validator.isEmail(email)) {
    errors.push({ field: "email", msg: "Invalid email" });
  }

  // Validate password
  if (!validator.isStrongPassword(password, { minLength: 8 })) {
    errors.push({ field: "password", msg: "Invalid password" });
  }

  return errors;
};

const validateOrderFields = async (orders, payment) => {
  const errors = [];

  let orderOkay = true;
  orderOkay = orders?.length > 0 ?? false;

  if (orderOkay) {
    await orders.map((order) => {
      if (!validator.isEmpty(order.mainCategory)) {
        orderOkay = false;
      }
      if (order.count < 1) {
        orderOkay = false;
      }
      if (order.skill.length === 0) {
        orderOkay = false;
      }
      return order;
    });
  }

  if (!orderOkay) {
    errors.push({ field: "order", msg: "Invalid order" });
  }

  if (!validator.isMongoId(payment)) {
    errors.push({ field: "payment", msg: "Invalid payment id" });
  }

  // // Validate email
  // if (!validator.isEmail(email)) {
  //   errors.push({ field: "email", msg: "Invalid email" });
  // }

  // // Validate password
  // if (!validator.isStrongPassword(password, { minLength: 8 })) {
  //   errors.push({ field: "password", msg: "Invalid password" });
  // }

  return errors;
};

module.exports = {
  validateRegistrationFields,
  validateLoginFields,
  validateOrderFields,
};
