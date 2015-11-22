module.exports = function( config ){
	var module = {
		config: config
	};

	module.isAuthorized = function( response, error, body ){
		if ( 401 === response.statusCode ) {
			console.log( 'Error: '.error + 'Cannot connect to Central' );
			if ( typeof this.config.apiKey === 'undefined' ) {
				console.log( '@'.error + 'Your API key is not defined' );
			} else if ( '' === this.config.apiKey ) {
				console.log( '@'.error + 'Your API key is empty' );
			} else {
				console.log( '@'.error + 'Your API key is invalid' );
			}

			process.exit(1);
		}
	}

	module.ticketEntries = function( id ){
		return this.ticket( id ) + '/time_entries';
	}

	module.ticketLog = function( id ){
		return this.ticketEntries( id ) + '/new';
	}

	return module;
};

