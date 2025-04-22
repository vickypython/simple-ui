import jwt, { JwtPayload } from "jsonwebtoken";
import Users from "../model/userSchema";
import { Request, Response,NextFunction } from "express";
export const verifyingToken = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
 /* const head=req.headers
  console.log("headers:",head);*/
  try {
    const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res
        .status(401)
        .send({ message: "Authorization header missing or invalid" });
    }
    //extracting the token from auth header
    const token = (authHeader || "").split(" ")[1];
    //verify token using api secret key
    const secretKey = process.env.ACCESS_TOKEN as string;
    const decode = jwt.verify(token, secretKey) as JwtPayload;

    //find user by decoded id
    const user = await Users.findById({ _id: decode.id });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    } else {
      // Attach the user object to the request
      req.user = user;
      next(); //call the next function in the stack
    }
  } catch (error:any){
    // Handle different types of errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Token has expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Invalid token" });
    }

    // For other errors, set the user to undefined and proceed

    console.error("Token verification error:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
