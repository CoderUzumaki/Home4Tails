import User from '../../models/userModel.js'

const AdminRemoveUserController = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from request body

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Find and delete the user
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({
            success: true,
            message: "User removed successfully.",
        });
    } catch (error) {
        console.error("Error removing user:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default AdminRemoveUserController;
