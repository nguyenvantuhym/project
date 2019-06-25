const dotenv = require( 'dotenv' );
const jsonwebtoken = require( 'jsonwebtoken' );
dotenv.config();
class jwt {
	constructor() {
		this.mysecret = process.env.JWT_KEY;
	}
	//this.mysecret = 'taolatu';
	async Encode( data ) {
		return await jsonwebtoken.sign( data, this.mysecret );
	}

	async Decode( data ) {
		return await jsonwebtoken.verify( data, this.mysecret );
	}
}
module.exports = new jwt();
