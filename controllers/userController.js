
const models = require('../models/index');
const bscrypt = require('bcryptjs');

exports.index = async (req, res, next) => {

    // SELECT * FROM users
    // const user = await models.User.findAll({
    //     //attributes: ['id', 'name', 'email'],
    //     attributes: { exclude: ['password'] },
    //     where: { email: 'ikeng@gmail.om'},
    //     order: [['id','desc']]
    // });

    // const user = await models.User.findAll({
    //     // ... email AS username ...
    //     attributes: ['id', 'name', ['email', 'username'],'create_at'],
    //     order: [['id','desc']]
    // });

    const sql = 'SELECT id,name,email,created_at FROM users ORDER BY id DESC';
    const user = await models.sequelize.query(sql, {
        type: models.sequelize.QueryTypes.SELECT
    });

    res.status(200).json({
        message: user
    });

}

exports.showUserByID = async (req, res, next) => {
    try{
        const { id } = req.params;
        const user = await models.User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });

        if(!user){
            let error = new Error('There is no user in database with id '+ id);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: user
        });

    }catch (error){
        res.status(error.statusCode).json({
            error: {
                message: error.message
            }
        });
    }
};

exports.insert = async (req, res, next) => {

    try{
        const {name, email, password} = req.body

        //Check email ซ้ำ
        await checkDuplicateEmail();
        
        // hash password
        const passwordHash = hashPassword(password)
        part6 -> 30:44

        //INSERT
        const user = await models.User.create({
            name: name,
            email: email,
            password: passwordHash
        })

        res.status(201).json({
            message: 'Data added',
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error){
        res.status(error.statusCode).json({
            error: {
                message: error.message
            }
        });
    }

};

async function checkDuplicateEmail(){
    let existEmail = await models.User.findOne({where: {email: email}});
    if(existEmail){
        const error = new Error('Duplicater Email');
        error.statusCode = 400;
        throw error; 
    }
}

async function hashPassword(password){
    const salt = await bscrypt.genSalt(8);
    const passwordHash = await bscrypt.hash(password, salt);
    return passwordHash;
}



