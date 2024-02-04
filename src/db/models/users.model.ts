import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../../util/db'
import logger from '../../util/logger'

export interface userModel
  extends Model<
    InferAttributes<userModel>,
    InferCreationAttributes<userModel>
  > {
  id: CreationOptional<string>
  first_name: string
  last_name: string
  password: string
  username: string
  account_created: CreationOptional<Date>
  account_updated: CreationOptional<Date>
}

export const users = db.define<userModel>(
  'users',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      field: 'first_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      field: 'last_name',
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      field: 'username',
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    account_created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    account_updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
  }
)

export const usersInit = async () => {
  try {
    await users.sync()
  } catch (e) {
    logger.error('Error syncing user model')
    logger.error(e)
  }
}
