function ttpHandleShortcode(id) {
	var input = document.querySelector('#ttpFrontShortcode-' + id + ' input');
	var tooltip = document.querySelector('#ttpFrontShortcode-' + id + ' .tooltip');
	input.select();
	input.setSelectionRange(0, 30);
	document.execCommand('copy');
	tooltip.innerHTML = wp.i18n.__('Copied Successfully!', 'my-social-feeds');
	setTimeout(() => {
		tooltip.innerHTML = wp.i18n.__('Copy To Clipboard', 'my-social-feeds');
	}, 1500);
}