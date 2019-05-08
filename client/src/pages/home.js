import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getRecipes, addRecipe, deleteRecipe, updateRecipe } from '../actions/recipes';
import CircleButton from '../components/common/circleButton';
import Menu_dropdown from '../components/common/menu_dropdown';
import EditableInput from '../components/common/editableInput';

export class Home extends Component {


      constructor(props) {
        super(props);
        this.state = {
          _id: '',
          title: '',
          thumbnail: '',
          titleEdited: '',
          thumbnaileEdited: '',
          indexEdited: '',
          errors: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
        this.updateRecipe = this.updateRecipe.bind(this)

    }



      componentWillMount() {
        this.props.getRecipes();
      }


   

    onDeleteClick(id) {
      this.props.deleteRecipe(id);
    }

    onSubmit(e) {
      e.preventDefault();
      // const { user } = .props.auth;
      const newRecipe = {
        title: this.state.title,
        thumbnail: this.state.thumbnail
        // name: user.name,
        // avatar: user.avatar
      }
        this.props.addRecipe(newRecipe);
        // this.setState({ text: ''});
    }


       updateRecipe() {

        let newRecipe = {
          thumbnail: 'https://photos.smugmug.com/Test/i-MkMvn4H/0/31787075/S/worker-S.jpg',
          title: "Mazarelas11"
        }

        // console.log(this.state.indexEdited)
         console.log(`your newRecipe ${newRecipe}`)
        this.props.updateRecipe(this.state.indexEdited, newRecipe)


       }


        handleChange = input => evt => {
          this.setState({
            [input.title]: evt.target.value,
            thumbnaileEdited: input.thumbnail,
            titleEdited: input.title,
            indexEdited: input._id
          })

          

          // console.log(`${this.state.indexEdited}, ${this.state.titleEdited}`)


      } 

      // handleChange (id, event) {
      //   let label = event.target.value
      //   this.props.updateRecipe(index, label)
      //   console.log(id)
      // }

  render() {
    const { recipes } = this.props;
    
    

    const Recipes = recipes.map((item) => (
      <div className='Card RecipeCard'>
         <div className='SpaceBetween'>
            <div>         
              <h5> 
              {/* <EditableInput 
              HandleChange={this.handleChange(item._id)} 
              value={item.title} 
              name='title'
              />   */}
              <input placeholder='Insert Title...' defaultValue={item.title} name={item.id} onChange={this.handleChange(item)} onBlur={this.updateRecipe}  />
              </h5>
            </div>

            <div> 
              <Menu_dropdown deleteItem={this.onDeleteClick.bind(this, item._id)} />
            </div>
      </div>

         <img src={item.thumbnail} />
      </div>
    ))

    console.log(recipes)

    return (
      <div className='Grid_wrapper'>
        <form onSubmit={this.onSubmit}>
        <div className='SpaceBetween'>
            <div>  </div>

            <div> 
              <CircleButton type="submit" color='primary' size='small' icon='add' onClick={this.onSubmit} /> 
            </div>
        </div>
       
        {Recipes}
        </form> 
      </div>

     
    )
  }
}


const mapStateToProps = state => ({
  recipes: state.recipes.items,
})

export default connect(mapStateToProps, {getRecipes, addRecipe, deleteRecipe, updateRecipe})(Home)
// export default Home