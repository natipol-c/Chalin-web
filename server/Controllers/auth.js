const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')

const { notifyLine, getIPClient } = require('../Functions/Notify')
const tokenLine = 'pavFlXXI6ZpvEQTueazG8eHladGZDUGEE9HnSOCaPZW'


exports.register = async (req, res) => {
    try {
        //CheckUser
        const { email, password } = req.body
        var user = await User.findOne({ email })
        if (user) {
            return res.send('User Already Exists!!!').status(400)
        }
        //Encrypt
        const salt = await bcrypt.genSalt(10)
        user = new User({
            email,
            password
        })
        user.password = await bcrypt.hash(password, salt)
        //save
        await user.save()
        res.send('Register Success!!')

    } catch (err) {

        console.log(err)
        res.status(500).send('Server Error')
    }
}
exports.login = async (req, res) => {
    try {
        
        // 1. Check User
        const ip = await getIPClient(req);

        const { email, password } = req.body;
        var user = await User.findOneAndUpdate({ email }, { ip: ip }, { new: true });
        console.log(user);
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).send("Password Invalid!!!");
            }
            // 2. Payload
            var payload = {
                user: {
                    email: user.email,
                    role: user.role,
                    _id: user._id,  
                    ip: user.ip,
                    orderCount: user.orderCount
                },
            };
            // notify
            const text = "User " + user.email + " Login ที่  Ipaddress :" + ip;
            await notifyLine(tokenLine, text);

            // 3. Generate
            jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
                if (err) throw err;
                res.json({ token, payload });
            });
        } else {
            const text = "User " + email + " พยายาม Login ที่ Ipaddress :" + ip;
            await notifyLine(tokenLine, text);
            return res.status(400).send("User not found!!!");
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};

exports.loginLine = async (req, res) => {
    try {
        const { userId, displayName, pictureUrl } = req.body
        var data = {
            email: userId,
            displayName: displayName,
            picture: pictureUrl
        }
        //Check
        var user = await User.findOneAndUpdate({ email: userId }, { new: true })
        if (user) {
            console.log('User Updated!!!')
        } else {
            user = new User(data)
            await user.save()
        }
        //Payload
        var payload = {
            user
        }
        //Generate
        jwt.sign(payload, 'jwtsecret', { expiresIn: '1d' }, (err, token) => {
            if (err) throw err;
            res.json({ token, payload })
        })

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}

exports.loginFacebook = async (req, res) => {
    try {
        //code
        const { userID, name, email } = req.body;
        var data = {
            name: userID,
            displayName: name,
            email: email,
        };
        // 1 Check
        var user = await User.findOneAndUpdate({ name: userID }, { new: true });
        if (user) {
            console.log("User Updated!!!");
        } else {
            user = new User(data);
            await user.save();
        }
        // 2. Payload
        var payload = {
            user,
        };

        // 3. Generate
        jwt.sign(payload, "jwtsecret", { expiresIn: "1d" }, (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};
exports.currentUser = async (req, res) => {
    try {
        console.log('currentUser', req.user)
        const user = await User.findOne({ email: req.user.email })
            .select('-password')
            .exec()

        res.send(user)

    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
}