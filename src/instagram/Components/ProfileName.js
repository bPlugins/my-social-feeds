import useUser from '../hooks/useUser';
import Error from './Error';
import UserLoading from './UserLoading';

export const ProfileName = ({ account }) => {
	const { data, loading } = useUser(account);

	if (loading) {
		return <UserLoading />
	}

	if (data?.error) {
		// eslint-disable-next-line no-console
		console.error(data.error?.message);
		return <Error message='There is an error while fetching the user' />
	}

	return <p className='ifbProfileName'>
		{data?.username}
		<br />
		<span>{account?.connectType}</span>
	</p>
}
export default ProfileName;