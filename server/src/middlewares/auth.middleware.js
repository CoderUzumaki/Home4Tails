import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const accessToken = req.Cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized Access");
        }
        const decodedToken = jwt.verify( accessToken, process.env.ACCESS_TOKEN_SECRET );

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Unauthorized");
    }
});


const protect = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { verifyJWT, protect, isAdmin };
