import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl, Button } from '@wordpress/components';
import { Label } from '../../../bpl-tools/Components';

const Authorization = ({ isPremium, authorizationProps, options, onChangeAccount, onChangeBoardName, blockType, getData, attributes }) => {
    // const slug = isPremium ? '/wp-admin?page=my-social-feeds#/settings' : '/wp-admin/tools.php?page=my-social-feeds#/settings';

    const slug = '/wp-admin/edit.php?post_type=msfbp&page=my-social-feeds-settings#/authorization-settings';

    const redirect = `${location.origin}${slug}`;
    const { accountInfo } = attributes;
    const { userName, boardName } = accountInfo || {};

    return (
        <div className="ttpUnAuthor">
            <h2>{authorizationProps.title}</h2>
            <p>{authorizationProps.description}</p>
            <div className="bpChooseToken">
                {
                    blockType !== "pinterest" && <>
                        <Label className="mb"> {authorizationProps.selectControlLabel} </Label>
                        <SelectControl value={blockType === "pinterest" ? userName : ''} options={options} onChange={(value) => onChangeAccount(value)} />
                    </>
                }
            </div>

            {blockType === "pinterest" && (
                <>
                    <div className='bpChooseToken bpInputRow'>
                        <Label className="mb">{__('User Name', 'my-social-feeds')}</Label>
                        <TextControl className="bpTextControl" value={blockType === "pinterest" ? userName : ''} placeholder={__('Enter Your UserName', 'my-social-feeds')} onChange={(value) => onChangeAccount(value)} />
                    </div>

                    <div className="bpChooseToken bpInputRow">
                        <Label className="mb">{__('Board Name', 'my-social-feeds')}</Label>
                        <TextControl className="bpTextControl" value={boardName} placeholder={__('Enter Your BoardName', 'my-social-feeds')} onChange={(val) => onChangeBoardName(val)} />
                    </div>

                    <Button className="bpFetchBtn" onClick={getData}>
                        {__('Fetch', 'my-social-feeds')}
                    </Button>
                </>
            )}
            <a href={redirect} target="_blank" rel="noreferrer">{authorizationProps.button}</a>
        </div>
    );
};
export default Authorization;
