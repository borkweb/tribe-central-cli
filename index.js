var path = require( 'path' ),
	moment = require( 'moment' ),
	argv = require( 'optimist' ).argv,
	_ = require( 'lodash' ),
	request = require( 'request' ),
	colors = require( 'colors' );

// Use console grouping
require( 'console-group' ).install();

// Setup Colors for terminal
colors.setTheme({
  error: ['red', 'bold'],
  warning: ['yellow', 'bold'],
  success: ['green', 'bold']
});

// Get our configurations file
var config = require( './config.json' );
config.central = {
	baseUrl: "https://central.tri.be",
};

// Configure central
var central = require( './inc' )( config );

// Setup Arguments variables
var action,
	args = {};

argv._.forEach( function ( val, index, array ) {
	switch (index) {
		case 0:
			action = val;
			break;
	}
});

if ( 'log' === action ){
	args.ticket = argv._[1];
	args.date = argv._[2];
	args.spent = argv._[3];
	args.comment = argv._[4];
	args.activity = argv._[5];

	if ( ! _.isFinite( args.ticket ) ) {
		if ( typeof config.tickets[ args.ticket ] !== 'undefined' ) {
			// Fetch from Configuration
			var ticket = config.tickets[ args.ticket ];

			args.ticket = ticket.id;
			args.comment = ticket.comment;
			args.activity = ticket.activity;
		} else {
			console.log( 'Error: '.error + 'Unknown Ticket' )
			process.exit(1);
		}
	}

	if ( ! _.isFinite( argv.activity ) ) {
		if ( typeof config.activity[ argv.activity ] !== 'undefined' ) {
			args.activity = config.activity[ argv.activity ];
		}
	}

	if ( argv.comment ) {
		args.comment = argv.comment;
	}

	if ( argv.spent ){
		args.spent = argv.spent;
	}

	if ( argv.date ){
		if ( _.isFinite( argv.date ) ){
			args.date = moment().subtract( parseInt( argv.date, 10 ), 'days' ).format( 'YYYY-MM-DD' );
		} else {
			args.date = moment( argv.date ).format( 'YYYY-MM-DD' );
		}
	} else {
		if ( ! args.date ){
			args.date = moment().format( 'YYYY-MM-DD' );
		} else {
			args.date = moment( args.date ).format( 'YYYY-MM-DD' );
		}
	}

	request( central.opt.timeEntries( 'create', args ), function ( error, response, body ) {
		central.response.isAuthorized( response, error, body );

		if ( 201 === response.statusCode ){
			console.log( 'Success: '.success + 'Logged time' );
			console.log( body );
		} else {
			console.log( 'Error: '.error + 'Cannot log this entry' );
			console.log( body );
			process.exit(1);
		}
	} );

} else {
	console.log( 'Error: '.error + '"' + action +  '"' + ' is not a defined command' );
	process.exit(1);
}


