// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNN
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUN
// const RADHAKRISHNALOVEPERMANELTUUUUANDSERVERRUNN

// router.post("/setAvatar/:id", 
//     // async(req, res) => {
//     // console.log("RADHAKRISHNALOVEPERMANELTUPERMANENKSVIDKIRETY00007");
//     // const userId=req.params.idl
//     // const avatarImage=req.body.image;
//     // const userData= await User.findByIdAndUpdate(userId,{
//     //     isAvatarImageSet:true,
//     //     avatarImage,
//     // })
//     // return res.json({
//     //     isSet:userData.isAvatarImageSet,
//     //     image:userData.avatarImage,
//     // });

// })
const router = require("express").Router();
const { register } = require("../controllers/userController.js");
const { login } = require("../controllers/userController.js");
const { setAvatar } = require("../controllers/userController.js");
const { getAllUsers } = require('../controllers/userController.js');

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get('/allusers/:id', getAllUsers);
module.exports = router;  