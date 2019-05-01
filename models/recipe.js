const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Schema
const RecipeSchema = new Schema({
      thumbnail: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      ingredients: {
        type: String
      },
      username: {
        type: String
      },
      avatar: {
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


module.exports = Recipe = mongoose.model('recipe', RecipeSchema);
