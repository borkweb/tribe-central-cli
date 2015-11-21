module.exports = function( horseman, config, print ){
	return horseman
		.open( config.central.baseUrl + '/login' )
		.type( '#content #username', config.username )
		.type( '#content #password', config.password )
		.click( '#content input[name="login"]' )
		.waitForNextPage()
		.cookies()
		.then(function( cookies ) {
			var is_logged = false;
			cookies.forEach(function ( cookie, index, array ) {
				if ( '_chiliproject_session' === cookie.name ) {
					is_logged = true;
				}
			});

			if ( is_logged ) {
				console.log( 'Success: '.success + 'Completed Login to Central' )
			} else {
				console.log( 'Error: '.success + 'Cannot login to Central' )

				horseman.close();
				process.exit(1);
			}

		});
};