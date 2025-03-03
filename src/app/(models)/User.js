import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.MONGODB_URI)
mongoose.Promise=global.Promise
const userRoles = {
    SPONSOR: 'sponsor',
    AGENT: 'agent',
    MEDICAL: 'medical',
    ADMIN: 'admin',
  };
  
  const UserSchema = new mongoose.Schema(
    {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            return Object.values(userRoles).includes(value);
          },
          message: 'Invalid role',
        },
      },
      phone: String,
    },
    {
      timestamps: true,
    }
  );

const User= mongoose.models.User || mongoose.model("User",UserSchema)
export default User;