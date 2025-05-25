// This file is for SERVER COMPONENTS ONLY
import { hashPassword, verifyPassword, generateToken } from "./auth-utils";
import { getUserByEmail, createUser } from "./server-db";

// Register a new user
export async function registerUser(userData) {
  // Check if user already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Create user
  const newUser = {
    first_name: userData.fname,
    last_name: userData.lname,
    email: userData.email,
    password: hashedPassword,
    role: "user",
    phone: userData.phone,
  };

  const createdUser = await createUser(newUser);

  // Remove password from returned user
  const { password, ...userWithoutPassword } = createdUser;

  return userWithoutPassword;
}

// Login user
export async function loginUser(email, password) {
  // Find user
  const user = await getUserByEmail(email);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Verify password
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  // Generate token
  const token = generateToken(user);

  // Remove password from returned user
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
}
