const userRoute = require('../Routes/UserRoutes');
const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');


const userController = {


    test :(req,res)=>{
        res.send("test route");
    },

    register: async (req, res) => {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }

        try {

            const isExistUser = await User.findOne({ email: req.body.email });
            if (isExistUser) {
                return res.status(400).send({ message: "User already exists" });
            }


                 const hash = await bcrypt.hash(req.body.password,10);
            if(!hash)
            {
                return res.status(500).send({message: "Error in hashing password"});
            }


            const user = new User({ name, email, password: hash });
            await user.save();
            res.status(201).send({ message: "User registered successfully" });

            
        } catch (error) {
            res.status(500).send({ message: "Internal server error" });
        }
    }
};


module.exports = userController;