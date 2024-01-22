const user = require("../models/user.model")

exports.createNewUser = async (req,res) => {

    const newUser = await user.findOne({
        id : req.body.id
    });
    if (newUser) {
        return res.json({status: "error", error: "id number already in use!"})
    } else {
        await user.create({
            name: req.body.name,
            surname: req.body.surname,
            id: req.body.id,
            dob: req.body.dob
        });
        res.json({status: "ok"})
    }
}
