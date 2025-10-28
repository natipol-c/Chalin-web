const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
    orderId: { type: Number },
    delivery: { type: String, required: true },
    address: { type: String },
    payment: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            detail:{ type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            quantity: { type: Number, required: true },
        }
    ],
    slipFile: { type: String },
    totalAmount: { type: Number, required: true },
    email: { type: String, required: true },
    status: { type: String, default: 'รอยืนยัน' },
    createdAt: { type: Date, default: Date.now }
});


orderSchema.plugin(AutoIncrement, { inc_field: 'orderId' });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
