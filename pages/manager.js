import React from 'react';
import Link from 'next/link'
import axios from 'axios'
import Nav from './../components/nav';
import { Container,Card, Icon, Image } from 'semantic-ui-react';
import user from './manager/user';

export default class manager extends React.Component {
  state={
    roles:''
  }
  componentDidMount = async ()=>{
    let res = await axios( {
      method:'get',
      url:'/api/checklogin'
    } );
    console.log(res);
    if(res.data.success === true){
      if(res.data.roles === 'boss' )
        this.setState({roles:'boss'})
      else
        this.setState({roles:'user'})
    }


  }
  renderUserLink()
  {
    if(this.state.roles === 'boss' )
    return(
      <Link href="/manager/user">
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Quản Lý Danh Sách User</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Link>)
  }
  renderCustomerLink()
  {
    if(this.state.roles === 'user' ||this.state.roles === 'boss' )
    return(
      <Link href="/manager/user">
        <Card>
          <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Quản Lý Danh Sách Khach Hang</Card.Header>
            <Card.Meta>
              <span className='date'>Joined in 2015</span>
            </Card.Meta>
            <Card.Description>
              Matthew is a musician living in Nashville.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user' />
              22 Friends
            </a>
          </Card.Content>
        </Card>
      </Link>)
  }

	render() {
		return (
			<div>
				<Nav />
        <Container style={ { marginTop: '3em' } }>
          <Card.Group>
            {this.renderUserLink()}
            {this.renderCustomerLink()}
          </Card.Group>
				</Container>
			</div>
		);
	}
}
