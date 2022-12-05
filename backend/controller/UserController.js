// Import Async Handler For Async Operation
const asyncHandler = require("express-async-handler");
// Import Crypto For Generate Email Token
const crypto = require("crypto");
// Import JWT Token For User Authentication
const generateToken = require("../utils/GenerateToken");
// Import Node-Mailer For Send Confirmation Link To User Mail
const nodeMailer = require("nodemailer");
// Import User Schema
const User = require("../models/UserModel");
// Import Confirmation Mail File
const sendConfirmationEmail = require("../utils/Mailer");

// User Registration Controller Method
const userRegistration = asyncHandler(async (req, res) => {
  const { username, email, password, gender, dob, pic, isAdmin, isActive } =
    req.body;

  // Check User Exists Or Not
  const userExists = await User.find({ email: email.toLowerCase() });
  const getExistingUser = userExists.find((obj) => {
    return obj;
  });

  if (
    userExists.length > 0 &&
    !getExistingUser.isEmailVerified &&
    getExistingUser.emailToken !== null
  ) {
    res.status(400);
    throw new Error(
      "Already registered with this email. Please check your mail inbox/spam folder & activate your account."
    );
  }

  if (userExists.length > 0 && getExistingUser.isActive) {
    res.status(400);
    throw new Error("Email already exists, Please go to login screen");
  }

  if (userExists.length > 0 && !userExists.isActive) {
    res.status(400);
    throw new Error(
      "Email exists, Register with new email to access our site or else activate your account with the existing email address."
    );
  }

  //If User Not Exists, Create New User
  const user = await User.create({
    username,
    email: email.toLowerCase(),
    password,
    gender,
    dob,
    pic,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isEmailVerified: false,
    isActive: false,
  });

  // Send Account Activation Link to User Registered Email
  const emailResponse = await sendConfirmationEmail(
    "new-user",
    user.email,
    user.username,
    user.emailToken
  );

  if (emailResponse.accepted.length > 0) {
    res.status(201).json({
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      statusCode: 201,
      message: "Account created successfully",
    });
  } else {
    res.status(400);
    throw new Error("Account verification link not sent, Please try again!");
  }
});

// User Account Verification Controller Method
const userAccountConfirmation = asyncHandler(async (req, res) => {
  const verificationToken = req.params.token;

  const user = await User.find(
    { emailToken: verificationToken },
    {
      password: 0,
      _v: 0,
    }
  );

  const getUserFields = user.find((obj) => {
    return obj;
  });

  if (user.length === 0) {
    res.status(400);
    throw new Error("Your account does not exist, Please register again!");
  } else if (getUserFields.isActive && getUserFields.isEmailVerified) {
    res.status(400);
    throw new Error("Your account is already activated, Please try to login!");
  } else if (!getUserFields.isActive && getUserFields.isEmailVerified) {
    res.status(400);
    throw new Error(
      "Your account is de-activated, Please activate your account."
    );
  } else {
    const userAccountConfirmation = await User.findOne({
      emailToken: verificationToken,
      isActive: false,
    });

    if (userAccountConfirmation) {
      userAccountConfirmation.isActive = true;
      // userAccountConfirmation.emailToken = null;
      userAccountConfirmation.isEmailVerified = true;

      const accountActivated = await userAccountConfirmation.save();

      res.status(201).json({
        // accountActivated,
        statusCode: 201,
        message: "Your account is activated successfully.",
      });
    } else {
      res.status(404);
      throw new Error(
        "Your account already activated (Or) Some technical issues, Please try again!"
      );
    }
  }
});

// User Login Controller Method
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });

  if (user && (await user.matchPassword(password))) {
    if (!user.isEmailVerified && !user.isActive) {
      res.status(404);
      throw new Error(
        "Please check your mail inbox/spam folder & activate your account."
      );
    } else if (user.isEmailVerified && !user.isActive) {
      res.status(404);
      throw new Error(
        "Your account is deactivated. Please activate your registered account."
      );
    } else {
      res.status(201).json({
        userId: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        isActive: user.isActive,
        token: generateToken(user._id),
      });
    }
  } else if (user === null) {
    res.status(404);
    throw new Error("User not exist or invalid email address.");
  } else {
    res.status(400);
    throw new Error("Invalid credentials!");
  }
});

// User Forgot Controller Method
const userForgotPassword = asyncHandler(async (req, res) => {
  const { newPassword } = req.body;

  const user = await User.findOne(
    {
      email: req.params.userEmail.toLowerCase(),
    },
    { __v: 0 }
  );

  if (!user) {
    res.status(400);
    throw new Error(
      "Incorrect email address. Please enter correct email or register newly!"
    );
  } else if (user && !(await user.matchPassword(newPassword))) {
    user.password = newPassword || user.password;
    await user.save();

    res.status(202).json({ message: "Password changed successfully!" });
  } else if (user && (await user.matchPassword(newPassword))) {
    res.status(400);
    throw new Error("Password should not be same as old password.");
  } else {
    res.status(400);
    throw new Error("Your password not changed, contact support team");
  }
});

// User Account Activation Controller Method
const userAccountActivation = asyncHandler(async (req, res) => {
  const user = await User.findOne(
    {
      email: req.params.userEmail.toLowerCase(),
    },
    { __v: 0 }
  );

  if (!user) {
    res.status(400);
    throw new Error("Your account does not exist, Please register newly!");
  } else if (user.isActive && user.isEmailVerified) {
    res.status(400);
    throw new Error("Your account is already activated, Please try to login!");
  } else if (user.isActive && !user.isEmailVerified) {
    res.status(400);
    throw new Error(
      "Your account is in-active, Please check your email inbox/spam folder to confirm your account."
    );
  } else if (!user.isActive && user.isEmailVerified) {
    user.isActive = true;
    await user.save();

    res
      .status(202)
      .json({ message: "Account activated successfully! Please login" });
  } else {
    res.status(404);
    throw new Error("Some technical issues, Please try again!");
  }
});

// Get User By Id Controller Method
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId, { __v: 0 });

  if (user) {
    res.status(201).json({
      user,
    });
  } else {
    res.status(400).json({ message: "User not found" });
  }
});

// User Forgot Controller Method
const userResetPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.params.userId, { __v: 0 });

  if (!user) {
    res.status(400);
    throw new Error(
      "Incorrect email address. Please enter correct email or register newly!"
    );
  } else if (user && (await user.matchPassword(newPassword))) {
    res.status(400);
    throw new Error("Password should not be same as old password.");
  } else if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword || user.password;
    await user.save();

    res.status(202).json({ message: "Password updated successfully!" });
  } else {
    res.status(400);
    throw new Error("Your password not changed, contact support team");
  }
});

// User Reset Email Controller Method
const userResetEmail = asyncHandler(async (req, res) => {
  const { userEmail } = req.body;

  const user = await User.findById(req.params.userId, { __v: 0 });

  if (user) {
    const otherUser = await User.findOne(
      {
        email: userEmail.toLowerCase(),
      },
      { __v: 0 }
    );

    if (otherUser) {
      res.status(400);
      throw new Error(
        "Already having another account for this e-mail address, Please try with new e-mail."
      );
    } else if (user.email.toLowerCase() === userEmail.toLowerCase()) {
      res.status(400);
      throw new Error("New email address should not be same as existing one");
    } else {
      user.email = userEmail.toLowerCase() || user.email;
      user.isEmailVerified = false;
      user.isActive = false;
      await user.save();

      // Send Account Activation Link to User Modified Email
      const emailResponse = await sendConfirmationEmail(
        "email-modify",
        user.email,
        user.username,
        user.emailToken
      );

      if (emailResponse.accepted.length > 0) {
        res.status(201).json({
          email: user.email,
          isEmailVerified: user.isEmailVerified,
          statusCode: 201,
          message: "Your E-Mail address modified successfully",
        });
      } else {
        res.status(400);
        throw new Error(
          "Account verification link not sent, Please try again!"
        );
      }
    }
  } else {
    res.status(400);
    throw new Error("User does not exist, Please register newly!");
  }
});

// User update controller method
const userUpdateById = asyncHandler(async (req, res) => {
  const { username, email, gender, dob, pic, isActive } = req.body;

  const user = await User.findById(req.params.userId, { password: 0, __v: 0 });

  if (user) {
    user.username = username || user.username;
    user.email = email || user.email;
    user.gender = gender || user.gender;
    user.dob = dob || user.dob;
    user.pic = pic || user.pic;
    user.isActive = isActive;

    const updatedUser = await user.save();

    res.status(201).json({
      statusCode: 201,
      username: user.username,
      pic: user.pic,
      message: "Updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// User Delete Controller Method
const userDeleteById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId, { password: 0, __v: 0 });

  if (user) {
    user.isActive = false;

    await user.save();

    res.status(202).json({
      statusCode: 202,
      username: user.username,
      message: `Dear ${user.username}, your account removed successfully`,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// User List Controller Method
const getAllUser = asyncHandler(async (req, res) => {
  const adminStatus = req.user.isAdmin;

  //const users = await User.find({ _id: req.user._id }, { password: 0, _v: 0 });
  const totalUsers = await User.find({ isActive: true }).count();
  const users = await User.find(
    req.user.isAdmin
      ? { isActive: true }
      : { _id: req.user._id, isActive: true },
    {
      password: 0,
      _v: 0,
    }
  );

  if (users.length > 0) {
    res.status(201).json({
      totalLength: totalUsers,
      users,
    });
  } else if (users.length === 0) {
    res.status(404).json({
      totalLength: totalUsers,
      message: "No record found",
    });
  } else {
    res.status(400);
    throw new Error("Users not found");
  }
});

// Export All User API Controller Method
module.exports = {
  userRegistration,
  userAccountConfirmation,
  userLogin,
  userForgotPassword,
  userAccountActivation,
  getUserById,
  userResetPassword,
  userResetEmail,
  userUpdateById,
  userDeleteById,
  getAllUser,
};
