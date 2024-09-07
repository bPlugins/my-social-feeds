import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserURL, getMediaURL } from '../utils/links';

const useInstagramData = (accounts, isStore = true, key = 'ifbData-0', cacheTimeMs = 180000) => {
	const [instagramData, setInstagramData] = useState({});

	const fetchData = async () => {

		if (isStore) {
			const cachedData = localStorage.getItem(key);

			if (cachedData) {
				const { value, expiry } = JSON.parse(decodeURIComponent(escape(atob(cachedData))));

				if (expiry >= new Date().getTime() && value?.users?.length) {
					setInstagramData(value);
					return;
				}
			}
		}

		try {
			const requests = accounts?.map(async (account) => {
				const { access_token, user_id, connectType = 'personal' } = account;
				const userURL = getUserURL(access_token, user_id, connectType);
				const mediaURL = getMediaURL(access_token, user_id, connectType);

				const [userRes, mediaRes] = await Promise.all([
					axios.get(userURL),
					axios.get(mediaURL)
				]);

				const user = userRes?.data;
				const userData = {
					[user?.username]: {
						media: mediaRes?.data?.data,
						page: mediaRes?.data?.paging?.cursors
					}
				};

				return { user, userData };
			});

			const responses = await Promise.all(requests);

			const users = responses.map(({ user }) => user);
			const usersData = responses.map(({ userData }) => userData).reduce((result, item) => {
				const key = Object.keys(item)[0];
				result[key] = item[key];
				return result;
			}, {});

			setInstagramData({ users, usersData });

			if (isStore && users?.length) {
				const item = {
					value: { users, usersData },
					expiry: new Date().getTime() + cacheTimeMs,
				};

				localStorage.setItem(key, btoa(unescape(encodeURIComponent(JSON.stringify(item)))));
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('Error fetching Instagram data:', error);
		}
	};

	useEffect(() => {
		if (accounts?.length && !instagramData?.users) {
			fetchData();
		}
	}, [accounts, cacheTimeMs, fetchData, instagramData]);

	return instagramData;
};
export default useInstagramData;