import { User, Thoughts } from "../models/index.js";
import { Request, Response } from "express";

// get all users
// /users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// get single user by id
// /users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// create a new user
// /users
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// update a user
// /users/:id
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// delete user (BONUS: and delete associated thoughts)
// /users/:id
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await Thoughts.deleteMany({ username: user.username });
    return res.json({ message: "User and associated thoughts deleted" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// add friend to friend list
// /users/:userId/friends/:friendId
export const addFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// remove friend from friend list
// /users/:userId/friends/:friendId
export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
