const { model, Schema } = require('mongoose')
const  PLM = require('passport-local-mongoose')

const userSchema = new Schema(
    {
    email : String,
    name : String,
    googleID: String,
    places : [{
        type: Schema.Types.ObjectId,
        ref: 'Place'
    }],
   
    
  },  

  
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }


)

userSchema.plugin(PLM,{usernameField:"email"})
module.exports = model("User", userSchema)