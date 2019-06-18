class Car extends React.Component {

    
    YOUR updateRecipeStep {"thumbnail":"https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg","title":"new post ","ingredients":[],"_id":"5cfc373ffc2258921932472a","username":"Adam Juan","avatar":"//www.gravatar.com/avatar/23e9d550e766de28ddff7a8a81a490fb?s=200&r=pg&d=mm","user":"5cf52f27bd0aaf08a5879191","date":"2019-06-08T22:31:27.005Z","step":
    [
        {"_id":"5cfc3d75e2d4d39514df325f","thumbnail":"https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg","text":"EDITED NOW"},{"_id":"5cfc3d7be2d4d39514df3260","thumbnail":"https://photos.smugmug.com/Test/i-W5SXVkM/0/1d663a9e/S/fettuccine-S.jpg","text":"another step"}],"likes":[],"comments":[],"__v":6}
    
    state = {
      car: {make: 'Toyota', model: 'Camry', features: []},
    }
  
  
    handleChange = (e, index,) => {
        let array = this.state.car.features.slice() // create mutable copy of the array
        array[index] = e.target.value // set the value of the feature at the index in question to e.target.value
        const newObj = { ...this.state.car, features: array } // create a new object by spreading in the this.state.car and overriding features with our new array 
        this.setState({ car: newObj }) // set this.state.car to our new object
      }
  
    handleAddFeature = () => {
      let features = this.state.car.features.slice()
      features.push('')
      this.setState({...this.state.car, features: features})
    }
  
    render() {
      return (
        {
          this.state.car.features.map((f, index) => { return <input key={index} onChange={e => this.handleChange(e, index)}>{feature}</input>
        }
        <button onClick={this.handleAddFeature}>Add Feature</button>
      )
    }
  }