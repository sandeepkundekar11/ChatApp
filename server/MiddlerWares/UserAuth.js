const AsyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const UserAuthentication = AsyncHandler(async (req, res, next) => {
    try {
        let token = req.headers["authorization"]
        if (!token) {
            return res.json({ message: "User siNot Authorized" })
        }
        else {
            token = token.split[" "][1]
            let encodedData = await jwt.verify(token, process.env.SECRET_KEY)
            if (!encodedData) {
                return res.json({ message: "Token is not valid" })
            }
            req.userId = encodedData._id
            next()

        }
    } catch (error) {
        console.log("auth err", error.message)
    }
})


module.exports = { UserAuthentication }