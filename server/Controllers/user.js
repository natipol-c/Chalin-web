const User = require('../Models/User')


exports.list = async (req, res) => {
    try {
        const user = await User.find({})
            .select('-password')
            .exec()

        res.send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeRole = async (req, res) => {
    try {
        const {id, role} = req.body.data
        const user = await User.findOneAndUpdate({_id:id},{role:role},{new:true})
            .select('-password')
            .exec()

        res.send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.resetOrderCount = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findOneAndUpdate(
            { _id: userId },
            { orderCount: 0 },
            { new: true }
        ).select('-password');

        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
};