function formatPrice(value) {
	let result = String(value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	return '€ ' + result;
}

module.exports = formatPrice;
