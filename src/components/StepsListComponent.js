import React, { PureComponent } from 'react';

import StepItemComponent from './StepItemComponent';

export default class StepsListComponent extends PureComponent {
    render() {
        const {steps} = this.props;

        if(!steps) {
            return '';
        }

        return (
            <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                {
                    steps && steps.map(step => {
                        return (
                            <StepItemComponent step={step} key={step['@id']}/>
                        );
                    })
                }
            </div>
        )
    }
}