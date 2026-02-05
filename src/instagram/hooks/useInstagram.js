import { useEffect, useState } from 'react';

import { fetchTransientData, fetchUserWithData } from '../utils/fetch';

const useInstagram = (attributes) => {
	const { accounts, accessToken } = attributes;

	const [users, setUsers] = useState([]);
	const [usersData, setUsersData] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				const data = await fetchTransientData();
				const { users = [], usersData = {} } = data;

				const fUsers = users.filter(u => accounts.some(a => a.user_id == parseInt(u.id)));
				const fUsersData = Object.fromEntries(
					Object.entries(usersData).filter(([key]) => fUsers.some(user => user.username === key))
				);

				if (fUsers?.length) {
					setUsers(fUsers);
					setUsersData(fUsersData);
				} else {
					if (accessToken?.[0]) {
						fetchUserWithData(accessToken[0]).then(data => {
							const { user, userData } = data || {};
							setUsers([user]);
							setUsersData(userData);
						});
					}
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [accounts, accessToken]);

	return { users, usersData, loading };
};
export default useInstagram;