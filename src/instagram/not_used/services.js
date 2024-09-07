export const fetchUser = async token => {
	const user = await fetch(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${token}`).then(res => res.json());

	return user;
}

export const fetchUserData = async token => {
	const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,comments_count,like_count,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res.json());

	return {
		media: data.data,
		page: data.paging.cursors
	}
}

export const fetchUserWithData = async token => {
	const user = await fetch(`https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=${token}`).then(res => res.json());

	const data = await fetch(`https://graph.instagram.com/me/media?fields=id,username,media_type,media_url,thumbnail_url,caption,permalink,timestamp,comments_count,like_count,children{id,media_type,media_url,thumbnail_url,permalink,timestamp}&access_token=${token}&limit=100`).then(res => res.json());

	return {
		user,
		userData: {
			[user.username]: {
				media: data.data,
				page: data.paging.cursors
			}
		}
	}
}

export const setLocalWithExpiry = (key, value, ms) => {
	const now = new Date().getTime();

	const localData = localStorage.getItem(key);
	const existingData = localData ? JSON.parse(decodeURIComponent(escape(atob(localData)))) : '';

	if (!existingData || existingData?.expiry <= now) {
		const item = {
			value,
			expiry: now + ms,
		}
		localStorage.setItem(key, btoa(unescape(encodeURIComponent(JSON.stringify(item)))));
	}
}
export const remLocal = (key) => {
	localStorage.removeItem(key);
}
export const getLocalWithExpiry = (key) => {
	const now = new Date().getTime();

	const localData = localStorage.getItem(key);
	const data = localData ? JSON.parse(decodeURIComponent(escape(atob(localData)))) : '';

	return data && data?.expiry >= now ? data?.value : null;
}