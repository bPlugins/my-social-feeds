import { useState, useEffect } from 'react';

const useBlockAccounts = (allAccounts, attributes) => {
	const { accounts: blockAccounts, accessToken } = attributes;

	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);

		if (allAccounts?.length) {
			const filteredAccounts = blockAccounts?.length ? allAccounts.filter(aA => blockAccounts.filter(bA => bA.user_id === aA.user_id)) : [];
			// const filteredAccounts = blockAccounts?.length ? allAccounts.filter(aA => !blockAccounts.some(bA => bA.user_id === aA.user_id)) : [];

			setAccounts(filteredAccounts);
		} else if (accessToken?.length) {
			accessToken?.[0] && setAccounts([{ access_token: accessToken?.[0], user_id: null }]);
		} else {
			setAccounts([]);
		}

		setLoading(false);
	}, [allAccounts, blockAccounts, accessToken]);

	return { accounts, loading };
};
export default useBlockAccounts;