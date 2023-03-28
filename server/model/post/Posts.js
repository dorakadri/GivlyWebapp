const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 
  location: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },
  postPicture: {
    type: String,
    default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  createdAt: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['object', 'food'],
    required: true
  },
  isTaken: {
    type: Boolean,
   default:false
  }
}, {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
