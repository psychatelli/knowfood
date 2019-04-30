const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const RecipeSchema = new Schema({
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      title: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      ingredients: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
    },
    step: [
        {
            thumbnail: {
                type: String
            },
            text: {
                type: String,
                required: true
            }, 
        }
      ],
      comments: [ 
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
          },
          text: {
            type: String,
          },
          name: {
            type: String
          },
          avatar: {
            type: String
          },
          date: {
            type: Date,
            default: Date.now
          }
        }
      ]  
})

const Recipe = module.exports = mongoose.model('User', RecipeSchema);


