const Order = require('../Models/Order')

exports.listOrder = async (req, res) => {
    try {
        const order = await Order.find({})
            .exec()

        res.send(order)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listOrderStatus = async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;
        let query;

        if (userEmail) {
            query = { email: userEmail };
        } else {
            query = { email: { $exists: false } };
        }

        const orders = await Order.find(query).sort({ createdAt: -1 }).exec();
        console.log("Orders:", orders);
        res.send(orders);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

exports.changeStatus = async (req, res) => {
    try {
        const { id, status } = req.body.data
        const order = await Order.findOneAndUpdate({ _id: id }, { status: status }, { new: true })
            .select('-password')
            .exec()

        res.send(order)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.changeStatusUser = async (req, res) => {
    try {
        const { id, status } = req.body.data;
        const order = await Order.findOneAndUpdate({ _id: id }, { status: status }, { new: true })
            .select('-password')
            .exec();

        res.send(order);
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};
