import jwt from 'jsonwebtoken'
const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token
        console.log("Token: ", token)
        if(!token) {
            return res.status(200).json({
                message: "Please Login...!",
                error: true,
                success: false
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            console.log("Error: ", error)
            console.log("Decoded: ", decoded)

            if(error) {
                console.log("Authorization Error: ", error)
            }

            req.userId = decoded?.id
            next()
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: [],
            error: true,
            success: false
        })
    }
}

export default authToken
