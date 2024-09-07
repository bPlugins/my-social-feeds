import { useState, useEffect } from 'react';

import useUser from '../hooks/useUser';
import { getMediaURL } from '../utils/links';

const useUserData = (account) => {
	const { access_token, user_id, connectType } = account || {};

	const { data: user, loading: userLoading } = useUser(account);

	const [userData, setUserData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		const fetchData = async () => {
			if (access_token && !userLoading) {
				await fetch(getMediaURL(access_token, user_id, connectType))
					.then(res => res.json())
					.then(data => {
						setUserData({
							[user?.username]: {
								media: data?.data,
								page: data?.paging?.cursors
							}
						});
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

		fetchData();
	}, [access_token, user, userLoading]);

	return { user, userData, loading }
}
export default useUserData;