const Product = require('../Models/Product')
const Order = require('../Models/Order')
const fs = require('fs')
const User = require('../Models/User')

exports.read = async (req, res) => {
    try {
        const id = req.params.id
        const producted = await Product.findOne({ _id: id }).exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.list = async (req, res) => {
    try {
        const producted = await Product.find({}).exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.listby = async (req, res) => {
    try {
        const { limit, sort, order } = req.body
        const producted = await Product.find({})
            .limit(limit)
            .sort([[sort, order]])
            .exec();
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}


exports.Cartby = async (req, res) => {
    try {
        const { delivery, address, payment, totalAmount, email } = req.body;
        const items = JSON.parse(req.body.items);
        
        let slipFile = null;
        if (req.file) {
            slipFile = req.file.filename;
        }

        const newOrder = new Order({
            delivery,
            address,
            payment,
            items,
            totalAmount,
            slipFile,
            email: email || 'null',
            status: 'รอยืนยัน'
        });

        await newOrder.save();

        await User.findOneAndUpdate(
            { email: email },
            { $inc: { orderCount: 1 } }
        );

        res.send(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to save order');
    }
};


exports.create = async (req, res) => {
    try {

        var data = req.body
        if (req.file) {
            data.file = req.file.filename
        }
        const producted = await Product(data).save()
        res.send(producted)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        var newData = req.body

        if (typeof req.file !== 'undefined') {
            newData.file = req.file.filename
            await fs.unlink('./uploads/' + newData.fileold, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Edit    success')
                }
            })
        }
        const updated = await Product
            .findOneAndUpdate({ _id: id }, newData, { new: true })
            .exec()
        res.send(updated)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.remove = async (req, res) => {
    try {
        const id = req.params.id
        const removed = await Product
            .findOneAndDelete({ _id: id }, req.body, { new: true })
            .exec()
        if (removed?.file) {
            await fs.unlink('./uploads/' + removed.file, (err) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Remove success')
                }
            })
        }
        res.send(removed)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}