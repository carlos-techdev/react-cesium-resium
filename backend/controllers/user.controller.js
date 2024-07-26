// External Import
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Internal Import
const userModel = require("../models/user.model.js");
const sendMail = require("../utils/sendMail.js");
const uniqueString = require("../utils/uniqueString.js");
const {
  validateRegistrationFields,
  validateLoginFields,
} = require("../utils/validator");

// User View
const userView = () => {
  return async (req, res) => {
    try {
      const existUser = req.user;
      if (existUser) {
        let sendableUser = existUser;
        sendableUser["password"] = "";
        sendableUser["randString"] = "";
        res.status(200).json({
          result: sendableUser,
          msg: "Successfully Viewed User Profile",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Register
const userRegister = () => {
  return async (req, res) => {
    try {
      const { email, firstName, lastName, password } = req.body;
      const errors = validateRegistrationFields(
        email,
        firstName,
        lastName,
        password
      );

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      const existUser = await userModel.findOne({ email: email });

      if (!existUser) {
        const hashedPass = await bcrypt.hash(password, 5);

        const randString = uniqueString();
        // const sendMailResult = await sendMail(
        //   email,
        //   randString,
        //   `${firstName} ${lastName}`,
        //   "signup"
        // );
        const sendMailResult = true;

        if (sendMailResult) {
          const newUser = await userModel({
            email: email,
            name: {
              first: firstName,
              last: lastName,
            },
            randString: randString,
            password: hashedPass,
          });
          await newUser.save();

          // res.status(201).json({
          //   msg: `Successfully Registered. Please Check Your Email for verification. Also please check your spam box.`,
          // });
          const existUser = await userModel.findOne({
            email: email,
            // verified: true,
            active: true,
          });
          if (existUser) {
            const token = jwt.sign(
              {
                userID: newUser._id,
              },
              process.env.JWT_TOKEN,
              {
                expiresIn: "1d",
              }
            );
            const {
              password,
              _id,
              randString,
              created_at,
              updated_at,
              __v,
              ...sendableUser
            } = newUser._doc;
            res.status(201).json({
              token: token,
              user: sendableUser,
              msg: "Successfully Logged In",
            });
          } else {
            throw "couldn't find saved user";
          }
        } else {
          res.status(503).json({
            errors: [{ msg: `We couldn't send email` }],
          });
        }
      } else {
        res.status(409).json({
          errors: [{ field: email, msg: "Already Registered" }],
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [{ msg: "Server Error" }],
      });
    }
  };
};

// User Login
const userLogin = () => {
  return async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;

    const errors = validateLoginFields(email, password);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    try {
      const existUser = await userModel.findOne({
        email: email,
        // verified: true,
        active: true,
      });
      if (existUser) {
        const isValidPass = await bcrypt.compare(password, existUser.password);
        if (isValidPass) {
          const token = jwt.sign(
            {
              userID: existUser._id,
            },
            process.env.JWT_TOKEN,
            {
              expiresIn: "30d",
            }
          );
          const {
            password,
            _id,
            randString,
            created_at,
            updated_at,
            __v,
            ...sendableUser
          } = existUser._doc;
          res.status(200).json({
            token: token,
            user: sendableUser,
            msg: "Successfully Logged In",
          });
        } else {
          res.status(403).json({
            errors: [{ field: "password", msg: "Password Wrong." }],
          });
        }
      } else {
        res.status(404).json({
          errors: [{ field: "email", msg: "User Not Found" }],
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errors: [{ msg: "Server Error" }],
      });
    }
  };
};

// User Email Verify
const userEmailVerify = () => {
  return async (req, res) => {
    try {
      const { username, randString } = req.params;
      const existUser = await userModel.findOne({
        username: username,
        randString: randString,
      });
      const existUserAlreadyVerified = await userModel.findOne({
        username: username,
      });
      if (
        existUserAlreadyVerified &&
        existUserAlreadyVerified.verified == true
      ) {
        res.status(200).json({
          msg: "Congratulation! Your email is already Verified.",
        });
      } else if (existUser) {
        await userModel.updateOne(
          { randString: randString },
          { $set: { verified: true, active: true, randString: uniqueString() } }
        );
        res.status(200).json({
          msg: "Successfully Verified Email",
        });
      } else {
        res.status(200).json({
          msg: "Wrong Verify Token Or UserID. Please Check your mail and try again.",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Update User
// const userUpdate = async (req, res, userType) => {
//   try {
//     const existUser = await userModel.findOne({
//       _id: req.userID,
//       role: userType,
//     });
//     if (existUser) {
//       if (
//         existUser.phone == req.body.phone ||
//         existUser.facebook == req.body.phone
//       ) {
//         res.status(200).json({
//           msg: "Facebook ID & Phone Has To Be Unique",
//         });
//       } else {
//         await userModel.updateOne(
//           { _id: req.userID, role: userType },
//           {
//             $set: { ...req.body, updated_at: Date.now() },
//             $push: {
//               notifications: {
//                 text: "Successfully updated your profile.",
//                 status: "unread",
//               },
//             },
//           }
//         );
//         res.status(200).json({
//           msg: "Successfully Updated User",
//         });
//       }
//     } else {
//       res.status(200).json({
//         msg: "User Not Found",
//       });
//     }
//   } catch (err) {
//     // console.log(err)
//     res.status(500).json({
//       msg: "Server Error",
//     });
//   }
// };

// User Change Password
const userPassChange = () => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        _id: req.userID,
      });
      if (existUser) {
        const isOldPassword = await bcrypt.compare(
          req.body.oldPassword,
          existUser.password
        );
        if (isOldPassword) {
          const newHashedPass = await bcrypt.hash(req.body.newPassword, 5);
          await userModel.updateOne(
            { _id: req.userID },
            {
              $set: {
                password: newHashedPass,
              },
            }
          );
          res.status(200).json({
            msg: "Successfully Changed Password",
          });
        } else {
          res.status(200).json({
            msg: "Did not matched your old password",
          });
        }
      } else {
        res.status(200).json({
          msg: "User Not Found",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Forgot Password
const userForgotPassword = () => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        email: req.body.email,
      });
      if (existUser) {
        const randString = uniqueString();
        await userModel.updateOne(
          { _id: existUser._id },
          { $set: { randString: randString } }
        );
        sendMail(existUser.email, randString, existUser.username, "resetPass");
        res.status(200).json({
          msg: "Please Check Your Email For Details. Also check your spam box.",
        });
      } else {
        res.status(200).json({
          msg: "User Not Found",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Valid Random Check
const userRandStringCheck = () => {
  return async (req, res) => {
    // console.log(req.params)
    try {
      const { randString } = req.params;
      const existUser = await userModel.findOne({
        randString: randString,
      });
      if (existUser) {
        res.status(200).json({
          msg: "Correct Random String",
        });
      } else {
        res.status(200).json({
          msg: "Wrong Token :3",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Reset Password
const userResetPassword = () => {
  return async (req, res) => {
    try {
      const { randString } = req.params;
      const existUser = await userModel.findOne({
        randString: randString,
      });
      // console.log(req.body)
      if (existUser) {
        const hashedPass = await bcrypt.hash(req.body.newPassword, 5);
        await userModel.updateOne(
          { randString: randString },
          {
            $set: {
              password: hashedPass,
              randString: uniqueString(),
            },
          }
        );
        res.status(200).json({
          msg: "Successfully Reset Password",
        });
      } else {
        res.status(200).json({
          msg: "Wrong Token :3",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

// User Delete
const userDelete = () => {
  return async (req, res) => {
    try {
      const existUser = await userModel.findOne({
        _id: req.userID,
      });
      if (existUser) {
        const passwordMatched = await bcrypt.compare(
          req.body.password,
          existUser.password
        );
        if (passwordMatched) {
          await userModel.deleteOne({ _id: req.userID });
          res.status(200).json({
            msg: "Successfully Deleted User",
          });
        } else {
          res.status(200).json({
            msg: "Wrong Password",
          });
        }
      } else {
        res.status(200).json({
          msg: "User Not Found",
        });
      }
    } catch (err) {
      // console.log(err)
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };
};

module.exports = {
  userView,
  userRegister,
  userLogin,
  userEmailVerify,
  userPassChange,
  userForgotPassword,
  userRandStringCheck,
  userResetPassword,
  userDelete,
};
