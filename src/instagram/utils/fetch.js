const $ = jQuery;

export const fetchTransientData = () => new Promise((resolve, reject) => {
	$.ajax({
		url: ifbLocal?.ajaxURL,
		type: 'POST',
		data: {
			action: 'ifbAjaxRequest'
		},
		success: res => resolve(res?.data),
		error: err => reject(err)
	});
});


export const clearCache = () => {
	$.ajax({
		url: ifbLocal?.ajaxURL, 
		type: 'POST',
		data: {
			action: 'ifbDeleteTransient'
		},
		success: () => {
			// eslint-disable-next-line no-console
			console.log('Cached cleared!');
		},
		error: (error) => {
			// eslint-disable-next-line no-console
			console.error('Error on clear cache:', error);
		},
	});
};

export const fetchUserWithData = async token => {
	const user = await fetch(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${token}`).then(res => res?.json());

	const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res?.json());
	// const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,comments_count,like_count,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res?.json());

	console.log(data);
	return {
		user,
		userData: {
			[user?.username]: {
				media: data?.data,
				page: data?.paging?.cursors
			}
		}
	}
}