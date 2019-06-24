const jwt = require( './jwt' );

module.exports = async( ctx, next ) => {
	const token = ctx.cookies.get( 'token' );
	console.log( token );
	if ( token !== null && token !== '' && token !== undefined ) {
		const jwtBody = await jwt.Decode( token );
		console.log( jwtBody );
		if ( jwtBody.username ) {
			ctx.state = {
				success: true,
				rules: jwtBody.roles,
				username: jwtBody.username,
			};
			await next();
		} else {
			ctx.state = {
				success: false,
			};
		}
	} else {
		ctx.body = {
			success: false,
		};
	}
};
