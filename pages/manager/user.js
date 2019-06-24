import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import Router from 'next/router'
import Nav from './../../components/nav'
import { Icon, Label, Menu, Table, Container, Form,Button, Header, Modal} from 'semantic-ui-react'

export default class user extends React.Component {
		constructor(props)
		{
				super(props);
				this.state = {
						listUser:[]
				};
		}

		static async getInitialProps() {


				const ls = ['van tu','duy manh'];
				return {listuser:ls};

		}

		componentDidMount = async()=>
		{

				let res = await axios({
						method:'get',
						url:'/api/getalluser'
				});

				if(res.data.success ===true)
						this.setState({...this.state,listUser:res.data.data});
				else
				{
						Router.push("/");
				}
				console.log(res.data.data);

		}
		render() {
			return (
				<div>
						<Nav activeItem="manager"/>
						<Container style={{ marginTop: '7em' }}>
								<h2>Danh sách nhân viên đang quản lý</h2>
								<Table celled>
										<Table.Header>
												<Table.Row>
														<Table.HeaderCell>Họ Và Tên</Table.HeaderCell>
														<Table.HeaderCell>email</Table.HeaderCell>
														<Table.HeaderCell>Địa Chỉ</Table.HeaderCell>
												</Table.Row>
										</Table.Header>

										<Table.Body>

								{
										this.state.listUser.map((user,i)=>{
												return(
														<Table.Row key={i}>
																<Table.Cell>
															{user.username}
																</Table.Cell>
																<Table.Cell>
                                  {user.email}
                                </Table.Cell>
																<Table.Cell>
																		{user.localtion}
																</Table.Cell>
																<Table.Cell collapsing>

                                  <Modal trigger={<Label color="red">edit</Label>}>
                                    <Header icon='archive' content='Archive Old Messages' />
                                    <Modal.Content>
                                      <p>
                                        Your inbox is getting full, would you like us to enable automatic archiving of old messages?
                                      </p>
                                    </Modal.Content>
                                    <Modal.Actions>
                                      <Form>
                                        <Form.Field>
                                        {user.username}
                                          <input placeholder='First Name' />
                                        </Form.Field>
                                        <Form.Field>
                                          <label>{user.email}</label>
                                          <input placeholder='Last Name' />
                                        </Form.Field>
                                        <Form.Field>
                                        <label>{user.localtion}</label>
                                          <input placeholder='Last Name' />
                                        </Form.Field>
                                        <Button type='submit' >Submit</Button>
                                      </Form>
                                    </Modal.Actions>
                                  </Modal>
                                </Table.Cell>

														</Table.Row>
												)
										})

								}
										</Table.Body>

												<Table.Footer>
												<Table.Row>
														<Table.HeaderCell colSpan='3'>
														<Menu floated='right' pagination>
																<Menu.Item as='a' icon>
																<Icon name='chevron left' />
																</Menu.Item>

																<Menu.Item as='a' icon>
																<Icon name='chevron right' />
																</Menu.Item>
														</Menu>
														</Table.HeaderCell>
												</Table.Row>
												</Table.Footer>
								</Table>
						</Container>
				</div>
			)
		}
}
