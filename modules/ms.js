let s = 1000;
let m = s * 60;
let h = m * 60;
let d = h * 24;
let w = d * 7;
let y = d * 365.25;
module.exports = (val, options) => {
	options = options || {}
	let type = typeof val
	if(type === "string" && val.length > 0) {return parse(val)
	}else if(type === "number" && isNaN(val) === false) {return options.long ? fmtLong(val, options): fmtShort(val, options)
	}else {throw new Error("ms.js given value isn't a valid number or string")}
}
function parse(str) {
	str = String(str);
	if (str.length > 100) return
	let match = /^((?:\d+)?\-?\d?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str)
	if (!match) return
	let n = parseFloat(match[1]);
	let type = (match[2] || 'ms').toLowerCase();
	switch (type) {
	  case 'years':
	  case 'year':
	  case 'yrs':
	  case 'yr':
	  case 'y':
		return n * y;
	  case 'weeks':
	  case 'week':
	  case 'w':
		return n * w;
	  case 'days':
	  case 'day':
	  case 'd':
		return n * d;
	  case 'hours':
	  case 'hour':
	  case 'hrs':
	  case 'hr':
	  case 'h':
		return n * h;
	  case 'minutes':
	  case 'minute':
	  case 'mins':
	  case 'min':
	  case 'm':
		return n * m;
	  case 'seconds':
	  case 'second':
	  case 'secs':
	  case 'sec':
	  case 's':
		return n * s;
	  case 'milliseconds':
	  case 'millisecond':
	  case 'msecs':
	  case 'msec':
	  case 'ms':
		return n;
	  default:
		return undefined;
	}
}
function fmtShort(ms, options) {
	if (ms < 1000) return `${ms}ms`
	const ret = []
	const add = (val, short) => {
		if (val === 0) return
		if(ret.length > 1) return 
		ret.push(val + short)
	}
	const parsed = parseMs(ms);
	add(Math.trunc(parsed.days / 365), 'y');
	add(parsed.days % 365, 'd');
	add(parsed.hours, 'h');
	add(parsed.minutes, 'm');
	add(parsed.seconds,"s")
	return ret.join(' ');
}
function fmtLong(ms, options) {
	if (ms < 1000) return `${ms}ms`
	const ret = [];
	const add = (val, long) => {
		if (val === 0) return
		if(ret.length > 1) return 
		ret.push(`${val} ${long}`);
	};
	const parsed = parseMs(ms);
	add(Math.trunc(parsed.days / 365), plural(Math.trunc(ms / 365), y, "year"));
	add(parsed.days % 365, plural(ms, d, "day"));
	add(parsed.hours, plural(ms, h, "hour"));
	add(parsed.minutes, plural(ms, m, "minute"));
	add(parsed.seconds, plural(ms, s, "second"))
	return ret.join(' ');
}
function parseMs(ms) {
	let roundTowardZero = ms > 0 ? Math.floor : Math.ceil;
	return {
		days: roundTowardZero(ms / 86400000),
		hours: roundTowardZero(ms / 3600000) % 24,
		minutes: roundTowardZero(ms / 60000) % 60,
		seconds: roundTowardZero(ms / 1000) % 60,
		milliseconds: roundTowardZero(ms) % 1000
	};
}
function plural(ms, n, name) {
	let msAbs = Math.abs(ms)
	let isPlural = msAbs >= n * 1.5
	isPlural ? res = `${name}s` : res = `${name}`
  return res
}