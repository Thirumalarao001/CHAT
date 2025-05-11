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
const { addMessage } = require("../controllers/messagesController.js");
const { getAllMessage } = require("../controllers/messagesController.js");

router.post("/addmsg/",addMessage);
router.post("/getmsg/",getAllMessage);

module.exports = router;  