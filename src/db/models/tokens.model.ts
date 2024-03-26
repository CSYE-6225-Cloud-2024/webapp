import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import { db } from '../../util/db'
import logger from '../../util/logger'

export interface tokenModel
  extends Model<
    InferAttributes<tokenModel>,
    InferCreationAttributes<tokenModel>
  > {
  token: CreationOptional<string>
  username: string
  sent_at: Date
  expires_at: Date
}

export const tokens = db.define<tokenModel>(
  'tokens',
  {
    token: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
)

export const tokensInit = async () => {
  try {
    await tokens.sync()
  } catch (err) {
    logger.error(`Error syncing token model to database: ${err}`)
  }
}
