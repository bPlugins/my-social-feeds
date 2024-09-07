import { useEffect } from 'react';

import { useWPAjax, useWPOptionQuery } from '../../../react-utils/hooks';

const usePremiumInEditor = () => {
    const { data: msfbpUtils } = useWPOptionQuery('msfbpUtils');
    const { data = null, refetch, isLoading = true } = useWPAjax('msfbPipeChecker', { _wpnonce: msfbpUtils?.nonce }, true);
    const isPremium = (!isLoading && data?.isPipe) || false;

    useEffect(() => {
        refetch()
    }, [msfbpUtils]);

    return { isPremium, isLoading };
};
export default usePremiumInEditor;