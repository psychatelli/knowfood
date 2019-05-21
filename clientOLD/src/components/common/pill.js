
import React from 'react';
import PropTypes from 'prop-types';

const Pill = ({ showDetails, selected, text }) => { 

    return(
        <div> 
            <div onClick={showDetails} className={selected}>{text}</div>
        </div>
    )
}

Pill.propTypes = {
    showDetails: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  };

export default Pill;