import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"

const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    index:true,
    trim:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    index:true,
    trim:true,
  },
  name:{
    type:String,
    required:true,
    trim:true
  },
  password:{
    type:String,
    required:[true,"password is required"]
  },
  refreshToken:{
    type:String,
    
  }
},
  {timestamps:true}
)


userSchema.pre("save",async function(next)
{
    if(!this.modified("password")) return next();

    this.password=bcrypt.hash(this.password,10);
    next();
}
)

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password);
}


export const User=mongoose.model("User", userSchema);