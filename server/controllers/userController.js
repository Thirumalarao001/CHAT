// RADHAKRISHNALOVEPERMANELUTUUUUUUUUUIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUANUHYAPERMANENT
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050AMMA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050NANNA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050AMMAANUHYA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050NANNATHAMMUDHU
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNIGON5050ANUHYATHAMMUDHUS
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNANUHYA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNANUHYA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNUIUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUANUHYA
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNNNUHYAPERMANT
const user = require("../model/userModel.js")
const bcrypt = require("bcrypt")



module.exports.register = async (req, res, next) => {
    console.log(req.body);
    try {
        const { username, email, password } = req.body;
        const check_user_name = await user.findOne({ username });
        const check_email = await user.findOne({ email });
        console.log(check_user_name, check_email)
        if (check_user_name) {
            return res.status(400).json({ message: "Username already existy" });

        }
        if (check_email) {
            return res.status(400).json({ message: "Email already exist" });

        }
        const hash_password = await bcrypt.hash(password, 10);
        const user_data = new user({
            email,
            username,
            password: hash_password,
        });
        const user_saved = await user_data.save()
        console.log(user_saved)

        res.status(201).json({ user_saved, message: "User created successfully" });

    }
    catch (err) {
        next(err)
    }
}


module.exports.login = async (req, res, next) => {
    console.log("RADHAKRISHNACONNECTEDSUCCESSFULLY");
    // console.log("radhakrishnalovepermanltuuuuu")
    console.log(req.body);

    try {
        const { username, password } = req.body;
        const user_data = await user.findOne({ username });
        if (!user_data) {
            return res.status(400).json({ message: "User not found" });

        }
        const check_password = await bcrypt.compare(password, user_data.password);
        console.log(check_password);
        return res.status(200).json({ user_data, message: "User logged in successfully" });
        if (!check_password) {
            return res.status(400).json({ message: "Invalid Password" });
        }


    }
    catch (err) {
        next(err)
    }

}

module.exports.setAvatar = async (req, res, next) => {
    console.log("RADHAKRISHNALOVEPERMANELTUPERMANENKSVIDKIRETY00007");
    const userId = req.params.id
    const avatarImage = req.body.image;
    const userData = await user.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage,
    });
    return res.json({ isSet: userData.isAvatarImageSet, image: userData.avatarImage });

    console.log("RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUU")
}


// module.exports.getAllUsers = async (req, res, next) => {
//     console.log("RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUUALLSOULS");
//     // const users = await user.find({ _id: { $ne: req.params._id } }).select([
//     //     "email", "username", "avatarImage", "_id"

//     // ])
//     // return res.json(users)
//     return res.json({message:"RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUUALLSOULS"})

// }
module.exports.getAllUsers = async (req, res, next) => {
    console.log("RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUUALLSOULS");

    // return res.json({ message: "RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUUALLSOULS" });
    try {
        const users = await user.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "name",        // <-- you might have used "username" before, but you used "name" in frontend
            "avatarImage ",
            "_id"
        ]);
        return res.json({ message: "RADHAKRISHNALOVEPERMANELTUUUUPERMANETLUUUALLSOULS", data: users }); // important: wrap users in { data: users }
    } catch (error) {
        console.error(error);
        next(error);
    }


};