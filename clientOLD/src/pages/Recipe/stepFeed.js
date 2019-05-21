import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Step from './step';

class StepFeed extends Component {
  render() {
    const { steps, stepId } = this.props;

    return steps.map(item => (
    <div>
    {/* <Step  Item={step} stepId={stepId} /> */}
        <h2>{item.text}</h2>
    </div>
    ));
  }
}

export default StepFeed;




