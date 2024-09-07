import { useState, useEffect } from 'react';

import { getUserURL } from '../utils/links';

const useUser = (account) => {
	const { access_token, user_id, connectType = 'personal' } = account || {};

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const fetchUser = async () => {
			if (access_token) {
				await fetch(getUserURL(access_token, user_id, connectType))
					.then(res => res.json())
					.then(data => {
						setData(data);
					})
					// eslint-disable-next-line no-console
					.catch(console.error)
					.finally(() => {
						setLoading(false);
					});
			} else {
				setLoading(false);
			}
		}

		fetchUser();
	}, [access_token]);

	return { data, loading }
}
export default useUser;