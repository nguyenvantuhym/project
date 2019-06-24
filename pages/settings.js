import React from 'react';
import Nav from './../components/nav';
import { Container } from 'semantic-ui-react';

export default class setting extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				<Container text style={ { marginTop: '7em' } }>
					setting
				</Container>
			</div>
		);
	}
}
