import { models } from '../models/index.js';

export const getDetails = async (req, res) => {
  const { email } = req.body;

  const user = await models.users.findOne({
    where: {
      email,
    },
  });

  if (user) {
      return res.json({
          success: true,
          name:user.dataValues.name
      })
    }
  else return res.json({
      success: false,
      message:"User not found"
    })
};

export const deleteUser = async(req,res) => {
    const { email } = req.body;

    const user = await models.users.findOne({
      where: {
        email,
      },
    });

    if (user) {
        await models.users.destroy({
            where: {
                email
            }
        })
    }
    return res.json({
        success:true
    })
}
