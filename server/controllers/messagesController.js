// RADHAKRISHNALOVEPERMANTLUUUUUANUHYATHAMMUHDHU
// SHIVAPARVATHIVINAAYAKALOVEPERMANTLUUU
// SITARAMALOVEPERMANLTUUUTHAMMUDHU
// SITARAMALOVEPERMANLTUUU
// AMMANANNA
const messageModel = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    console.log("RADHAKRISHNAAMMANANNASHIVAPARVATHIVAINABYALOVEPERMANENLTUUUU ")
    try {
        // const message=req.body.message;
        const { from, to, message } = req.body;
        const data = await messageModel.create({ message: { text: message }, users: [from, to], sender: from });
        if (data) {


            res.status(201).json({ message: data });
        }
        else {
            res.status(400).json({ message: "Failed to add message" });
        }

    }
    catch (e) {
        next(e);
    }
}
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to],
            }
        })
            .sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectedMessages);

    }
    catch (e) {
        next(e);
    }
}