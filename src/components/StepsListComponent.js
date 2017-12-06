import React, { PureComponent } from 'react';

import {Button, ButtonGroup, Panel, PanelGroup} from "react-bootstrap";
import AccomodationStepInfosComponent from "./Step/AccomodationStepInfosComponent";
import AttachmentsContainer from "../containers/AttachmentsContainer";
import TransportationStepInfosComponent from "./Step/TransportationStepInfosComponent";
import TourStepInfosComponent from "./Step/TourStepInfosComponent";

export default class StepsListComponent extends PureComponent {
    createListItem(item) {
        const {onEdit, onDelete, activePanel} = this.props;

        let type = item['@type'];

        return (
            <Panel eventKey={item['@id']} key={`step-${item['@id']}`} header={[
                <ButtonGroup style={{float: 'right'}} key={`step-${item['@id']}-actions`}>
                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => { onEdit(item) }}>
                        <i className="glyphicon glyphicon-pencil"/>
                    </Button>
                    <Button bsStyle="primary" bsSize="xsmall" onClick={() => { onDelete(item) }}>
                        <i className="glyphicon glyphicon-trash"/>
                    </Button>
                </ButtonGroup>,
                <div key={`step-${item['@id']}-title`}>
                    <i className={`icon-step ${item['@type'].toLowerCase()} ${item.type}`}/>&nbsp;&nbsp;{item.name}
                </div>,
            ]}>
                {item.summary ? (
                    <p>{item.summary}</p>
                ) : ''}

                <h4>Informations</h4>

                {
                    type === 'TransportationStep' ? (
                        <TransportationStepInfosComponent step={item} />
                    ) : (
                        type === 'AccomodationStep' ? (
                            <AccomodationStepInfosComponent step={item} />
                        ) : (
                            <TourStepInfosComponent step={item} />
                        )
                    )
                }

                <h4>Fichiers</h4>

                {
                    activePanel === item['@id'] ? (
                        <AttachmentsContainer step={item}/>
                    ) : ''
                }

            </Panel>
        );
    }

    render() {
        const {steps, activePanel, handleSelect} = this.props;

        if(!steps) {
            return '';
        }

        return (
            <PanelGroup activeKey={activePanel} onSelect={handleSelect} accordion>
                {
                    steps && steps.map(step => {
                        return this.createListItem(step);
                    })
                }
            </PanelGroup>
        )
    }
}