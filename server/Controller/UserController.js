const AsyncHandler = require("express-async-handler")
const { userModel } = require("../Model/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SignupUser = AsyncHandler(async (req, res) => {
    try {
        let { firstname, lastname, email, password } = req.body
        if (!firstname || !lastname || !email || !password) {
            res.json({
                message: "please enter all details"
            })
        }
        else {
            let exitsUser = await userModel.findOne({ email: email })
            if (exitsUser) {
                res.json({ message: "user already exist" })
            } else {
                let hashedPassword = bcrypt.hashSync(password, 12)
                let user = new userModel({ firstname, lastname, email, password: hashedPassword })
                await user.save()

                let token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY)
                res.json({ token: token, user: user })
            }

        }

    } catch (error) {
        console.log("Signup err", error.message)
    }

})

const LoginUser = AsyncHandler(async (req, res) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            res.json({
                message: "please enter all details"
            })
        }
        else {
            let userExist = await userModel.findOne({ email: email })
            if (!userExist) {
                res.json({ message: "User Does't exist" })
            }
            else {
                let hashedPassword = await bcrypt.compare(password, userExist.password)
                if (!hashedPassword) {
                    return res.json({ message: "please Enter correct passwords" })
                }
                else {
                    let token = jwt.sign({ _id: userExist._id }, process.env.SECRET_KEY)
                    return res.json({ token: token, user: userExist })
                }

            }
        }
    } catch (error) {
        console.log("login user error", error.message)
    }
})

module.exports = { SignupUser, LoginUser }