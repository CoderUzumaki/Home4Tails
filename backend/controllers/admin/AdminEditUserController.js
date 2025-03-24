import User from '../../models/userModel.js'

const AdminEditUserController = async (req, res) => {
    try {
        const { userId, role } = req.body; // Extract data from request body

        // Check if userId is provided
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Update user details
        if (role) user.role = role;

        // Save the updated user
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user,
        });
    } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
};

export default AdminEditUserController;
