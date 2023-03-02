const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../config/token/generateToken");
const User = require("../../model/user/User");
const validateMongodbId = require("../../utils/validateMongodbID");
const cloudinaryUploadImg = require("../../utils/cloudinary");
const fs =require("fs");



//Register


const userRegisterCtrl = expressAsyncHandler(async (req, res) => {


  
  const userExists = await User.findOne({ email: req?.body?.email });
  const localPath = `public/images/profile/${req.file.filename}`;
  const imgUploaded = await cloudinaryUploadImg(localPath);
  if (userExists) throw new Error("User already exists");
  try {
   

    const user = await User.create({
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
      bio: req?.body?.bio,
      role:req?.body.role,
      associationName:req?.body.associationName,
      associationAdress:req?.body.associationAdress,
      associationPhone:req?.body.associationPhone,
      profilePhoto: imgUploaded?.url,

    });
    res.json(user);
    fs.unlinkSync(localPath);
  } catch (error) {
    res.json(error);
  }
});


//Login 
// ban else2 to do 

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
 
  const userFound = await User.findOne({ email });

  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      role:userFound?.role,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("invalid email or password ");
  }
});


//get all user to test 

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.headers);
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});



//User profile


const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const myProfile = await User.findById(id);
    res.json(myProfile);
  } catch (error) {
    res.json(error);
  }
});


//Update profile done

const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  validateMongodbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      ...req.body,
      user: req.user?._id,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});


//Update password  done 


const updateUserPasswordCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req.user;
  const {newpassword, password } = req.body;
  validateMongodbId(_id);
  

  const user = await User.findById(_id);
if(await user.isPasswordMatched(password)){

  if (!newpassword) {
    res.json({
      status:"200",
      message:"please provide the new password",
     
    });

 
  } else {

    user.password = password;
    const updatedUser = await user.save();
    res.json({
      user:updatedUser,
      msg:"password updated "
    });
  }

}else {
  res.json({
    status:"400",
    message:"password incorrect"
  });
}
});







module.exports = {

  userRegisterCtrl,
  loginUserCtrl,
  fetchUsersCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,

};
