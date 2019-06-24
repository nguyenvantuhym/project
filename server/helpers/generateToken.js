const jwt = require( './jwt' );
//const mysecret = 'taolatu';
module.exports = async( ctx )=>{
	const token = await jwt.Encode( {
		username: ctx.state.user.username,
		roles: ctx.state.user.roles,
		_id: ctx.state.user._id,
	} );
	ctx.cookies.set( 'token', token, { signed: true } );

	ctx.body = {
		token: token,
		success: true,
		data: ctx.state.user,
	};
};

