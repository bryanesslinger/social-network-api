import { Thoughts } from "../models/index.js";
// get all thoughts
// /thoughts
export const getAllThoughts = async (_req, res) => {
    try {
        const thoughts = await Thoughts.find();
        res.json(thoughts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// get single thought by id
// /thoughts/:id
export const getThoughtById = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thoughts.findById(thoughtId);
        if (thought) {
            res.json(thought);
        }
        else {
            res.status(404).json({ message: "Thought not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// create a thought
// /thoughts
export const createThought = async (req, res) => {
    try {
        const thought = await Thoughts.create(req.body);
        res.json(thought);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// update thought
// /thoughts/:id
export const updateThought = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// delete thought
// /thoughts/:id
export const deleteThought = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json({ message: "Thought deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// add a reaction to a thought
// /thoughts/:thoughtId/reactions
export const addReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, { $addToSet: { reactions: req.body } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// remove reaction from a thought
// /thoughts/:thoughtId/reactions/:reactionId
export const removeReaction = async (req, res) => {
    try {
        const thought = await Thoughts.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: "Thought not found" });
        }
        return res.json(thought);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
