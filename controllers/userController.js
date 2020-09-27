
const models = require('../models/index');

exports.index = async (req, res, next) => {

    // SELECT * FROM users
    // const user = await models.User.findAll({
    //     //attributes: ['id', 'name', 'email'],
    //     attributes: { exclude: ['password'] },
    //     where: { email: 'ikeng@gmail.om'},
    //     order: [['id','desc']]
    // });

    const user = await models.User.findAll({
        // ... email AS username
        attributes: ['id', 'name', ['email', 'username'],'create_at'],
        order: [['id','desc']]
    });



    res.status(200).json({
        message: user
    });

}

// part 5 -> 21.30









