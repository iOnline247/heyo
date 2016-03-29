module.exports = {
	getDates: function(d) {
		var today = padDate(d);

		return {
			startTime: today + lowerBoundTime(),
			endTime: today + upperBoundTime()
		};
	}
};

function padDate (d){
	function pad (n) { return n < 10 ? '0' + n : n }

	return d.getUTCFullYear() + '-'
		+ pad(d.getUTCMonth() + 1 ) + '-'
		+ pad(d.getUTCDate()) + 'T';
}

function lowerBoundTime() {
	return '00:00:00Z';
}

function upperBoundTime() {
	return '23:59:59Z';
}