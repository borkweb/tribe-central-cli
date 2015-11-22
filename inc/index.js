module.exports = function( config ){
	this.opt = require( './opt.js' )( config );
	this.link = require( './link.js' )( config );
	this.response = require( './response.js' )( config );

	return this;
};
