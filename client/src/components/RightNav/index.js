import React from 'react';
import PropTypes from 'prop-types';

const RightNav = ({ sideNavToggle, children }) => { 

    return(
        <div className={ sideNavToggle ? "EditNav" : "Hidden"}>
            {children}
        </div>
    )
};

RightNav.propTypes = {
    sideNavToggle: PropTypes.bool,
};
  
export default RightNav; 