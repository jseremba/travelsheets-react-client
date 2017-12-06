import React from "react";
import {Button, ButtonGroup, Glyphicon, ListGroup, ListGroupItem} from "react-bootstrap";

export default class AttachmentsListComponent extends React.PureComponent {
    createListItem(item) {
        console.log(item);

        return (
            <ListGroupItem key={`attachment-${item['@id']}`}>
                <Glyphicon glyph="file"/>&nbsp;{item.name}
                <ButtonGroup style={{float: 'right'}}>
                    <Button bsSize="xsmall">
                        <Glyphicon glyph="save"/>
                    </Button>
                    <Button bsSize="xsmall">
                        <Glyphicon glyph="trash"/>
                    </Button>
                </ButtonGroup>
            </ListGroupItem>
        );
    }

    render() {
        const {attachments} = this.props;

        return (
            <ListGroup className="attachments-container">
                {
                    attachments && attachments.map((attachment) => {
                        return this.createListItem(attachment);
                    })
                }
            </ListGroup>
        );
    }
}