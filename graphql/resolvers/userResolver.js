const UserModel = require("../../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUserValidate = require("../../utils/validators/LRvaidator");

module.exports = {
  loginUser: async (_, args) => {
    const { userphonenumber, password } = args;
    const userExist = await UserModel.findOne({
      where: { phonenumber: userphonenumber },
    });
    if (!userExist) {
      throw new Error("User not found");
    }
    const { username, phonenumber, role } = userExist;
    const comparePassword = await bcrypt.compare(password, userExist.password);
    if (!comparePassword) {
      throw new Error("incurect pasword");
    }

    const tokenPayload = {
      username,
      phonenumber,
      role,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "7d", // Token valid for 7 days
    });
    return {
      token,
      user: userExist,
    };
  },
  registerUser: async (_, args) => {
    const argsValatetion = registerUserValidate(args);
    if (argsValatetion[0]) {
      throw new Error(argsValatetion[0].message);
    }

    const { username, password, phonenumber } = args;

    // Determine user role
    const isAdmin =
      phonenumber === "09187012481" || phonenumber === "09183378522"
        ? "admin"
        : "user";

    // Check if user already exists
    const userExist = await UserModel.findOne({ where: { username } });
    if (userExist) {
      throw new Error("User already exists!");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object
    const newUser = {
      username,
      phonenumber,
      password: hashedPassword,
      role: isAdmin,
    };

    // Save user to database
    const createUser = await UserModel.create(newUser);

    // Generate token
    const tokenPayload = {
      username,
      phonenumber,
      role: isAdmin,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "7d", // Token valid for 7 days
    });

    // Return response
    return {
      token,
      user: createUser,
    };
  },
  users: async () => {
    return await UserModel.findAll();
  },
};
