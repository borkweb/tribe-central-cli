module.exports = function( config ){
	var module = {
		config: config
	}

	module.ticket = function( id ){
		return this.config.central.baseUrl +'/issues/' + id;
	}

	module.ticketLog = function( id ){
		return this.ticket( id ) + '/time_entries/new';
	}

	return module;
};