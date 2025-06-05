import argon2 from "argon2";

const hashPassword = async () => {
  const hash = await argon2.hash("admin123"); 
  console.log("Hashed password:", hash);
};

hashPassword();
