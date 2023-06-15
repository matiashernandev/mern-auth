import { mongoose } from 'mongoose'
import bcrypt from 'bcrypt'


const UserSchema = new mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true }
})

UserSchema.pre("save", function (next) {

  if (this.isModified("password") || this.isNew) {

    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err)
      } else {
        document.password = hash
        next()
      }
    })

  } else {
    next()
  }
})

UserSchema.methods.usernameExist = async function (username) {

  const result = await mongoose.model("User").findOne({ username })
  return !!result
}

UserSchema.methods.coparePassword = async function (password, hash) {

  const same = await bcrypt.compare(password, hash)
  return same
}









export default mongoose.model("User", UserSchema)