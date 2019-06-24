import React from 'react';
//import Link from 'next/link'
import Nav from './../components/nav';
import { Container } from 'semantic-ui-react';

export default class manager extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Container text style={ { marginTop: '7em' } }>
				</Container>
			</div>
		);
	}
}
