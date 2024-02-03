import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../../util/db'
import logger from '../../util/logger'

interface userModel
  extends Model<
    InferAttributes<userModel>,
    InferCreationAttributes<userModel>
  > {
  id: string
  firstName: string
  lastName: string
  password: string
  userName: string
}

const userInit = async () => {
  const user = db.define<userModel>(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userName: {
        field: 'user_name',
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'account_created',
      updatedAt: 'account_updated',
    }
  )

  user
    .sync()
    .then(() => {
      logger.info('user table initated succesfully')
    })
    .catch((err: Error) => {
      logger.error(err)
    })
}

export default userInit
