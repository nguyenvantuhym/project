import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import axios from 'axios';
import { Input, Menu, Container } from 'semantic-ui-react'

export default class Nav extends Component {
	constructor(props)
	{
		super(props)
		this.logout = this.logout.bind(this);

	}

	logout = async()=>{
		let res = await axios({
			method:'get',
			url:'/api/logout'
		});
		if(res.data.success === true)
		{
			Router.push('/login');
		}
	}

	render() {
		const { activeItem } = this.props;

		return (
			<div>

			<Menu inverted>
				<Container>
					<Link href="/">
						<Menu.Item name='home' active={activeItem === 'home'}  />
					</Link>

					<Link href="/settings">
						<Menu.Item
							name='setting'
							active={activeItem === 'settings'}
							/>
					</Link>

					<Link href="/manager">
						<Menu.Item
							name='manager'
							active={activeItem === 'manager'}
							/>
					</Link>

					<Menu.Menu position='right'>
						<Menu.Item>
							<Input icon='search' placeholder='Search...' />
						</Menu.Item>

						<Menu.Item
							name='logout'
							onClick={this.logout}
						/>

				</Menu.Menu>
				</Container>
			</Menu>
			</div>
		)
	}
}
