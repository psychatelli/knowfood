import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProfiles } from '../actions/profileActions';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import CircleButton from '../components/common/circleButton';
import Button from '@material-ui/core/Button';


  const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    DrawerContainer: {
      width: 400,
      padding: 20
    }
    
  };

export class Profiles extends Component {

      constructor(props) {
        super(props);
        this.state = {
          errors: {},
        }
    }

      componentWillMount() {
        this.props.getProfiles();
      }

      render() {
      const { profiles, classes } = this.props;
      
  

    const Profiles = profiles.map((profile) => (
      <div className='Card RecipeCard'>
          <div className='SpaceBetween'>
              <div>    
                <Link to={`/profiles/${profile._id}`}> 
                <div className='Info'>
                  <div> <img className='Avatar' src={profile.avatar} /> </div>
                  <div>  {profile.username} </div>
               </div> 
                </Link>     
              </div>

              <div> 
                
              </div>
          </div>
      </div>
    ))

    
    return (
      <div className='Grid_wrapper'>
       
 
          {Profiles}

         
      </div>

     
    )
  }
}




const mapStateToProps = state => ({
  profiles: state.profiles.items,
})


export default connect(mapStateToProps, {getProfiles})(withStyles(styles)(Profiles));
 