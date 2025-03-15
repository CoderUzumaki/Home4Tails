import User from '../../models/userModel.js'

/**
 * @description Admin User Controller
 * @param {Object} req - Request Object
 * @param {Object} res - Response Object
 */
const AdminUserController = async (req, res) => {
  try {

  } catch (error) {
    res.status(400).json({
        message : error.message || error,
        error : true,
        success : false
    })
  }
}

export default AdminUserController
