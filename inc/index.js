module.exports = function( config ){
	this.login = require( './login.js' );
	this.link = require( './link.js' )( config );

	return this;
};
