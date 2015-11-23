var _ = require( 'lodash' );

module.exports = function( config ){
	var module = {
		config: config
	};

	module.timeEntries = function( type, args ){
		var options = {
				method: 'GET',
				url: this.config.central.baseUrl,
				headers: {
					"X-ChiliProject-API-Key": config.apiKey,
				},
				json: true,
				body: {}
			},
			keys = Object.keys( args );

		switch( type ){
			case 'create':
				// Check for the required Arguments
				if ( 0 !== _.difference( [ 'ticket', 'date', 'spent', 'activity', 'comment' ], keys ).length ) {
					return false;
				}

				options.method = 'POST';
				options.url += '/time_entries.json'
				break;

			case 'search':
				options.method = 'GET';
				options.url += '/time_entries.json'
				break;

			case 'update':
				// Check for the required Arguments
				if ( 0 !== _.difference( [ 'ticket', 'date', 'spent', 'activity', 'comment' ], keys ).length ) {
					return false;
				}

				options.method = 'PUT';
				options.url += '/time_entries/' + args.ticket + '.json'
				break;

			case 'delete':
				options.method = 'DELETE';
				options.url += '/time_entries/' + args.ticket + '.json'
				break;

			case 'get':
				options.method = 'GET';
				options.url += '/time_entries/' + args.ticket + '.json'
				break;

			default:
				return false;
		}

		options.body.time_entry = {
			issue_id: args.ticket,
			spent_on: args.date,
			hours: args.spent,
			activity_id: args.activity,
			comments: args.comment
		};

		return options;
	}

	return module;
};