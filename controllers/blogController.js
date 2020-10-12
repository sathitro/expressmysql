const models = require('../models/index');

exports.index = async (req, res, next) => {

    try{
        24.05
        const blogs = await models.User.findAll({
            // JOIN
            include: [{
                model: models.User,
                as: 'user',
                //attributes: ['id', 'title']
            }],
            order: [['id', 'desc']]
        });

        res.status(200).json({
            message: blogs
        });
    }catch(error){
        res.status(400).json({
            errorMessage: error
        });
    }
}










