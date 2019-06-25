import React from 'react'
import Router from 'next/router'

import Nav from './../components/nav'
import axios from 'axios';
import {Container, Dimmer, Loader, Image, Segment} from 'semantic-ui-react'


export default class index extends React.Component {
	constructor(props)
	{
		super(props);
		this.state = {
			loading:false,
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
			url:'/api/checklogin'
		});

		if(res.data.success !== true)
			Router.push("/login");
		console.log(res.data);


	}


	render() {
		return (
			<div>


				<Nav activeItem='home'/>

					<Container >
						 <h2>user list</h2>
					{
						this.state.listUser.map((user,i)=>{
							return(
								<li  key={'name-' + i} >{user.username}</li>
							)
						})
					}
					</Container>

			</div>
		)
	}
}
