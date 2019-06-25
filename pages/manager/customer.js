import React from 'react';
//import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import Nav from './../../components/nav';
import { Icon, Label, Menu, Table, Container, Form,Button, Header, Modal} from 'semantic-ui-react'

export default class user extends React.Component {

		state = {
			listCustomer:[{
        username :"vantu",
        std:"03567224563",
        email:"vantu",
        localtion:"vantu"
      },{
        username :"vantu",
        email:"vantu",
        std:"03567224563",
        localtion:"vantu"
      }],
			customer:{
      username :"vantu",
      email:"vantu",
      std:"03567224563",
      localtion:"vantu"},

    }

		closeConfigShowEdit = ( closeOnEscape, closeOnDimmerClick, index ) => () => {
			this.setState({
        ...this.state,
        closeOnEscape,
        closeOnDimmerClick,
        modalOpenEdit: true,
        indexCustomer:index,
        user: this.state.listCustomer[index]
      });
    }

    closeConfigShowcreate = ( closeOnEscape, closeOnDimmerClick ) => () => {
			this.setState({
        ...this.state,
        closeOnEscape,
        closeOnDimmerClick,
        modalOpenCreate: true,

      });
    }

		closeConfigShowDelete = ( closeOnEscape, closeOnDimmerClick, index ) => () => {
			this.setState({
        ...this.state,
        closeOnEscape,
        closeOnDimmerClick,
        modalOpenDelete: true,
        indexCustomer:index,
        user: this.state.listCustomer[index]
      });
    }

    closeEdit = () => this.setState({...this.state, modalOpenEdit: false })
    closeCreate = () => this.setState({...this.state, modalOpenCreate: false })
		closeDelete = () => this.setState({...this.state, modalOpenDelete: false })
		static async getInitialProps() {


				const ls = ['van tu','duy manh'];
				return {listCustomer:ls};

		}
		updateState = async ()=>{

			console.log("test");
			this.setState({
				...this.state,
				listCustomer:[
					...this.state.listCustomer.slice(0,this.state.indexCustomer),
					{
						...this.state.customer
					},
					...this.state.listCustomer.slice(this.state.indexCustomer + 1)
        ],
        modalOpenEdit:false
      });
      //post server
      /*console.log(this.state.user);
      const res = await axios({
        method:'post',
        url: '/updateuser',
        data: this.state.user
      });
      console.log(res);*/

		}

    deleteitem = async() =>{
      console.log(this.state);
      this.setState({
        ...this.state,
        listCustomer:[
					...this.state.listCustomer.slice(0,this.state.indexCustomer),

					...this.state.listCustomer.slice(this.state.indexCustomer + 1)
        ],
        modalOpenDelete:false
      })
    }
    handleSubmit = async (event)=>{
      this.closeCreate();
      //const data = new FormData(event.target)
      const datasubmit = {
        username :event.target.elements.username.value,
        password :event.target.elements.password.value,
        email: event.target.elements.email.value,
        name :event.target.elements.name.value,
        localtion :event.target.elements.localtion.value
      }

     /* const res =  await axios({
        method:'post',
        url: '/api/signup',
        data: datasubmit
      });
      console.log(res);
      if(res.data.success === true)
      this.setState({
        listCustomer:[...this.state.listCustomer,{...res.data.data}]
      });*/

    }

    handleChange = (field) => {
      return (value) => {
        this.setState( {customer:{ ...this.state.customer,[field]: value.target.value} } )
      }
    }
		render() {
			return (
				<div>
						<Nav activeItem="manager"/>
						<Container style={ { marginTop: '7em' } }>
								<h2>Danh sách Khach Hang đang quản lý</h2>
								<Table celled>
										<Table.Header>
												<Table.Row>
														<Table.HeaderCell>Họ Và Tên</Table.HeaderCell>
														<Table.HeaderCell>email</Table.HeaderCell>
                            <Table.HeaderCell>Địa Chỉ</Table.HeaderCell>
                            <Table.HeaderCell>SDT</Table.HeaderCell>
												</Table.Row>
										</Table.Header>

										<Table.Body>

								{
										this.state.listCustomer.map( ( customer,i )=>{

												return(
														<Table.Row key={i}>
																<Table.Cell>
															{customer.username}
																</Table.Cell>
																<Table.Cell>
																	{customer.email}
																</Table.Cell>
																<Table.Cell>
																		{customer.localtion}
                                </Table.Cell>
                                <Table.Cell>
																		{customer.std}
																</Table.Cell>
																<Table.Cell collapsing>
																<Button onClick={this.closeConfigShowEdit(false, true, i)}>edit</Button>
																<Button onClick={this.closeConfigShowDelete(false, true, i)}>delete</Button>
																</Table.Cell>

														</Table.Row>
												)
										})

								}
									</Table.Body>

												<Table.Footer>
                        <Table.Row>

														<Table.HeaderCell colSpan='5'>
														<Menu floated='right' pagination>
																<Menu.Item as='a' icon>
																<Icon name='chevron left' />
																</Menu.Item>

																<Menu.Item as='a' icon>
																<Icon name='chevron right' />
																</Menu.Item>
                            </Menu>
                            <Button
                              positive
                              labelPosition='right'
                              icon='checkmark'
                              content='Thêm user'
                              onClick={this.closeConfigShowcreate(false, true)}
                            />
														</Table.HeaderCell>
                        </Table.Row>
												</Table.Footer>
								</Table>
								<Modal
									open={this.state.modalOpenEdit}
									closeOnEscape={this.state.closeOnEscape}
									closeOnDimmerClick={this.state.closeOnDimmerClick}
									onClose={this.closeEdit}
								>
									<Modal.Header>Delete Your Account</Modal.Header>
									<Modal.Content>
										<Form>
											<Form.Field>
												<label>Tai khoan</label>
												<input placeholder='First Name'
													value={this.state.customer.username}
													onChange={this.handleChange('username')}
												/>
											</Form.Field>
											<Form.Field>
												<label>Email</label>
												<input placeholder='Last Name'
													value={this.state.customer.email}
													onChange={this.handleChange('email')}
												/>
											</Form.Field>
											<Form.Field>
											<label>dia chi</label>
											<input placeholder='Last Name'
												value={this.state.customer.localtion}
												onChange={this.handleChange('localtion')}
											/>
                      </Form.Field>
                      <Form.Field>
                        <label>SDT</label>
                        <input placeholder='Last Name'
                          value={this.state.customer.std}
                          onChange={this.handleChange('std')}
                        />
											</Form.Field>
										</Form>
									</Modal.Content>
									<Modal.Actions>
										<Button onClick={this.closeEdit} negative>
											No
										</Button>
										<Button
											positive
											labelPosition='right'
											icon='checkmark'
											content='Yes'
											onClick={this.updateState}
										/>
									</Modal.Actions>
								</Modal>
								<Modal
									open={this.state.modalOpenDelete}
									closeOnEscape={this.state.closeOnEscape}
									closeOnDimmerClick={this.state.closeOnDimmerClick}
									onClose={this.closeDelete}
								>
									<Modal.Header>Delete Your Account</Modal.Header>
									<Modal.Content>
										<p>ban chac chan muon xoa khong?</p>
									</Modal.Content>
									<Modal.Actions>
										<Button onClick={this.closeDelete} negative>
											No
										</Button>
										<Button
											onClick={this.deleteitem}
											positive
											labelPosition='right'
											icon='checkmark'
											content='Yes'
										/>
									</Modal.Actions>
                </Modal>

                <Modal
									open={this.state.modalOpenCreate}
									closeOnEscape={this.state.closeOnEscape}
									closeOnDimmerClick={this.state.closeOnDimmerClick}
									onClose={this.closeDelete}
								>
									<Modal.Header>Create Account</Modal.Header>
									<Modal.Content>
                  <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                    <label>Tai khoan</label>
                    <input placeholder='First Name'
                      value={this.state.customer.username}
                      name="username"
                      //onChange={this.handleChange('username')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='Last Name'
                      value={this.state.customer.email}
                      name="email"
                      //onChange={this.handleChange('email')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>password Mac dinh</label>
                    <input placeholder='Last Name'
                      value={this.state.customer.localtion}
                      name="password"
                      //onChange={this.handleChange('localtion')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Ho va ten</label>
                    <input placeholder='Last Name'
                      value={this.state.customer.localtion}
                      name="name"
                      //onChange={this.handleChange('localtion')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>dia chi</label>
                    <input placeholder='Last Name'
                      value={this.state.customer.localtion}
                      name="localtion"
                      //onChange={this.handleChange('localtion')}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Button onClick={this.closeCreate} negative>
                      No
                    </Button>
                    <Button
                      //onClick={this.handleSubmit}
                      positive
                      labelPosition='right'
                      icon='checkmark'
                      content='Yes'
                      type="submit" value="Submit"
                    />
                  </Form.Field>
                </Form>
									</Modal.Content>
									<Modal.Actions>

									</Modal.Actions>
								</Modal>
						</Container>
				</div>
			)
		}
}
