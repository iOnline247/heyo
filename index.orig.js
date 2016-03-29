var config = require('./config/secrets.js');
var google = require('googleapis');
// var OAuth2 = google.auth.OAuth2;
// var oauth2Client = new OAuth2(config.client_id, config.client_secrets, config.redirect_uris);

// Utils
var dateUtil = require('./utils/dateHelpers.js');
/*
// https://www.googleapis.com/auth/contacts.readonly
// https://www.googleapis.com/auth/calendar.readonly


var request = require('request-promise');
var options = {
    uri: 'https://people.googleapis.com/v1/people/me/connections',
    qs: {
        key: config.google.calendarApiKey 
    },
    json: true
};

request(options)
	.then(function(json) {
		debugger;
	})
	.catch(function(err) {
		debugger;
	});

*/

/*
var options = {
	auth: config.google.calendarApiKey,
	calendarId: 'primary'

};

calendar.events.list(options, function(err, user) {
  console.log('Result: ' + (err ? err.message : user.displayName));
});


google.auth.getApplicationDefault(function(err, authClient) {
	if (err) {
		console.log('Failed to get the default credentials: ' + String(err));
		return;
	}
	// The createScopedRequired method returns true when running on GAE or a local developer
	// machine. In that case, the desired scopes must be passed in manually. When the code is
	// running in GCE or a Managed VM, the scopes are pulled from the GCE metadata server.
	// See https://cloud.google.com/compute/docs/authentication for more information.
	if (authClient.createScopedRequired && authClient.createScopedRequired()) {
		// Scopes can be specified either as an array or as a single, space-delimited string.
		authClient = authClient.createScoped(['https://www.googleapis.com/auth/calendar.readonly']);
	}
	// Fetch the list of GCE zones within a project.
	// NOTE: You must fill in your valid project ID before running this sample!
	var calendar = google.calendar({ version: 'v3', auth: authClient });
	// var compute = google.compute({ version: 'v1', auth: authClient });

	calendar.events.list(options, function(err, user) {
		console.log('Result: ' + (err ? err.message : user.displayName));
	});
});
*/

/*
var scopes = ['https://www.googleapis.com/auth/calendar.readonly'];
var jwtClient = new google.auth.JWT(config.client_email, null, config.private_key, scopes, null);

jwtClient.authorize(function(err, tokens) {
	if (err) {
		console.log(err);
		return;
	}

	debugger;

	var queryTimeSpan = dateUtil.getDates(new Date());
	var options = {
		calendarId: 'primary',
		timeMax: queryTimeSpan.endTime,
		timeMin: queryTimeSpan.startTime
	};
	var calendar = google.calendar({ version: 'v3', auth: jwtClient });

	calendar.events.list(options, function(err, resp) {
		console.log('Result: ' + (err ? err.message : resp));
	});
});
*/

var queryTimeSpan = dateUtil.getDates(new Date());
var options = {
	calendarId: 'primary',
	timeMax: queryTimeSpan.endTime,
	timeMin: queryTimeSpan.startTime
};
var calendar = google.calendar({ version: 'v3', auth: config.google.calendarApiKey });

calendar.events.list(options, function(err, resp) {
	console.log('Result: ' + (err ? err.message : resp));
});