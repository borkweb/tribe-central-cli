var path = require('path');
var moment = require('moment');
var argv = require('optimist').argv;
var _ = require('lodash');
var colors = require('colors');

colors.setTheme({
  error: ['red', 'bold'],
  warning: ['yellow', 'bold'],
  success: ['green', 'bold']
});

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

	if ( argv.spent ){
		args.spent = argv.spent;
	}

	if ( argv.date ){
		if ( _.isFinite( argv.date ) ){
			args.date = moment().subtract( parseInt( argv.date, 10 ), 'days' ).format( 'YYYY-MM-DD' );
		} else {
			args.date = moment( argv.date ).format( 'YYYY-MM-DD' );
		}
	}

	if ( ! args.date ){
		args.date = moment().format( 'YYYY-MM-DD' );
	}
}

// Require and Setup Horseman
var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0")
	.viewport( 1280, 1024 )
	.cookies( {} );


// Get our configurations file
var config = require( './config.json' );
config.central = {
	baseUrl: "https://central.tri.be",
};


// Configure central
var central = require( './inc' )( config );

if ( ! _.isFinite( args.ticket ) ) {
	if ( typeof config.tickets[ args.ticket ] !== 'undefined' ) {
		// Fetch from Configuration
		var ticket = config.tickets[ args.ticket ];

		args.ticket = ticket.id;
		args.comment = ticket.comment;
		args.activity = ticket.activity;
	} else {
		console.log( 'Error: '.error + 'Unknown Ticket' )

		horseman.close();
		process.exit(1);
	}
}

// Login!
central.login( horseman, config )

	// After this point you are logged in
	.open( central.link.ticketLog( args.ticket ) )
	.value( '#time_entry_spent_on', args.date )
	.value( '#time_entry_hours', args.spent )
	.value( '#time_entry_comments', args.comment )
	.value( '#time_entry_activity_id', args.activity )
	.click( '#content input[name="commit"]' )
	.waitForNextPage()
	.count( '#errorExplanation' )
	.then(function( qty ) {
		if ( qty === 0 ){
			console.log( 'Success: '.success + 'Logged time' );
			console.log( args );
		} else {
			console.log( 'Error: '.success + 'Cannot log this entry' )
			console.log( args );

			horseman.close();
			process.exit(1);
		}
	})

	.close();
