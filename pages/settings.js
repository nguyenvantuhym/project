import React from 'react';
import Nav from './../components/nav';
import { Container,Label,Form,Button, Modal, Table } from 'semantic-ui-react';

export default class setting extends React.Component {
  state={
    listprops:{ name:"String", email : "String",age:"String",sdt : "String"},
    openModal: false,currentkey:'',currentvalue :'',keyCurrent:''
  }

  closeConfigShow = (closeOnEscape, closeOnDimmerClick, key) => () => {

    this.setState({ closeOnEscape, closeOnDimmerClick, openModal: true , currentkey :key,currentvalue :this.state.listprops[key]})
  }

  closeModal = () => this.setState({ openModal: false });

  handleChange = (field) => {
    return(
      (event)=>{
        this.setState({[field]:event.target.value});
      }
    )
  }
  handleClick = () => {
    this.closeModal();
    this.setState({
      listprops:{
        ...this.state.listprops,
        [this.state.currentkey]:this.state.currentvalue
      }
    });

  }

	render() {
		return (
			<div>
				<Nav />
        <Container style={ { marginTop: '7em' } }>
        <Button
            onClick={this.closeModal}
            positive
            labelPosition='right'
            icon='checkmark'
            content='Yes'
          />
        <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>Tao thong tin khach hang</Table.HeaderCell>

          </Table.Row>
        </Table.Header>
        <Table.Body>

          {
            Object.keys(this.state.listprops).map((key,index)=>{
              return(
              <Table.Row>
                <Table.Cell>
                    {key}
                </Table.Cell>
                <Table.Cell>{this.state.listprops[key]}</Table.Cell>
                <Table.Cell textAlign='right' collapsing>
                  <Label color='red' onClick={this.closeConfigShow(true,false,key)}>
                    edit
                  </Label>
              </Table.Cell>
              </Table.Row>
              )
            })


          }

          <Modal
          open={this.state.openModal}
          closeOnEscape={this.state.closeOnEscape}
          closeOnDimmerClick={this.state.closeOnDimmerClick}
          onClose={this.state.closeModal}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Field>
                <label>First Name</label>
                <input placeholder='First Name' value={this.state.currentkey} onChange={this.handleChange('currentkey')}/>
              </Form.Field>
              <Form.Field>
                <label>Last Name</label>
                <input placeholder='Last Name' value={this.state.currentvalue} onChange={this.handleChange('currentvalue')}/>
              </Form.Field>
              <Form.Field>

              </Form.Field>

            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.closeModal} negative>
              No
            </Button>
            <Button
              onClick={this.closeModal}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
              onClick={this.handleClick}
            />
          </Modal.Actions>
        </Modal>

        </Table.Body>
      </Table>
				</Container>
			</div>
		);
	}
}
