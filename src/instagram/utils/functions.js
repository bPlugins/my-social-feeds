// export const isEmptyObject = obj => obj && Object.keys(obj).length === 0 && obj.constructor === Object;

export const hasObjProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

export const isEmptyObject = (obj) => {
	for (var key in obj) {
		if (hasObjProperty(obj, key)) {
			return false;
		}
	}
	return true;
}

export const truncate = (text = '', length) => text.length > length ? `${text.slice(0, length)}...` : text;

export const popupOpen = (url, width, height, cb) => {
	const top = top || (screen.height / 2) - (height / 2);
	const left = left || (screen.width / 2) - (width / 2);
	const win = window.open(url, '', `location=1,status=1,resizable=yes,width=${width},height=${height},top=${top},left=${left}`);

	const check = () => {
		if (!win || win.closed != false) {
			cb();
		} else {
			setTimeout(check, 100);
		}
	}

	setTimeout(check, 100);
}

export const generateString = (length) => {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result.trim();
}

export const isSameArray = (array1, array2, key) => {
	if (array1.length !== array2.length) {
		return false;
	}

	for (var i = 0; i < array1.length; i++) {
		if (array1[i][key] !== array2[i][key]) {
			return false;
		}
	}

	return true;
}

export const hasIdInAccounts = (accounts = [], user_id) => accounts?.map(a => a.user_id)?.includes(user_id);

export const addHashtagLinks = (caption = '') => {
	const hashtagRegex = /#[\w]+/g;

	const linkedText = caption?.replace(hashtagRegex, (match) => {
		const hashtag = match.slice(1);
		const link = `<a href='https://www.instagram.com/explore/tags/${hashtag}' target='_blank' rel='noreferrer nofollow noopener'>${match}</a>`;
		return link;
	});

	return linkedText;
}

export const remHashtag = (caption = '') => {
	return caption.replace(/#[\w]+/g, '').trim().replace(/\s\s+/g, ' ');
}