import { useState, useEffect } from 'react';

import useWPOptionQuery from './useWPOptionQuery';

const useAllAccounts = () => {
	const [allAccounts, setAllAccounts] = useState([]);

	const { data: firstData = {}, fetchData, isLoading: loading } = useWPOptionQuery('ifbData');

	useEffect(() => {
		if (!loading) {
			setAllAccounts(firstData?.iAccounts?.length ? firstData?.iAccounts : []);
		}

		window.addEventListener('ifbEvent', () => {
			fetchData();
		});
	}, [loading]);

	return { allAccounts, loading }
}
export default useAllAccounts;