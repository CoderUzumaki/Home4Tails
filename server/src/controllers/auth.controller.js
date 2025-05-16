import User from "../models/UserModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new ApiError(409, "User already exists");
    }

    let avatarUrl = "https://res.cloudinary.com/demo/image/upload/avatar_placeholder.png";
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (avatarLocalPath) {
      const avatarUpload = await uploadOnCloudinary(avatarLocalPath);
      if (avatarUpload?.url) {
        avatarUrl = avatarUpload.url;
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      avatar: avatarUrl,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    if (!createdUser) {
      throw new ApiError(500, "Failed to create user");
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
  } catch (err) {
    next(err);
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save();

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

        return res
        .status(200)
        .cookie("refreshToken", refreshToken, options)
        .cookie("accessToken", accessToken, options)
        .json(
            new ApiResponse(200, loggedInUser, "User logged in successfully")
        )
    } else {
      throw new ApiError(401, "Invalid user email or password");
    }
  } catch (err) {
    next(err);
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(
        new ApiResponse(200, {}, "User logged out successfully")
    )
});

export { registerUser, loginUser, logoutUser };
