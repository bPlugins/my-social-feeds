export const apiURL = 'localhost' === window.location.host ? 'http://localhost/development' : 'https://api.bplugins.com';

const graphFBUrl = 'https://graph.facebook.com';
const graphIGUrl = 'https://graph.instagram.com';

const businessUserFields = 'biography,id,ig_id,followers_count,follows_count,name,profile_picture_url,username,website';
const personalUserFields = 'account_type,id,media_count,username';

const businessMediaFields = 'caption,comments_count,id,ig_id,is_comment_enabled,is_shared_to_feed,like_count,media_product_type,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp,username,children{id,ig_id,media_type,media_url,permalink,shortcode,thumbnail_url,timestamp},comments{from,hidden,id,like_count,media,text,timestamp,replies{from,hidden,id,like_count,media,parent_id,text,timestamp}}';
const personalMediaFields = 'caption,id,is_shared_to_feed,media_type,media_url,permalink,thumbnail_url,timestamp,username,children{id,media_type,media_url,permalink,thumbnail_url,timestamp}';

export const getUserURL = (accessToken, user_id, connectType) => 'business' === connectType ?
    `${graphFBUrl}/${user_id}?fields=${businessUserFields}&access_token=${accessToken}` :
    `${graphIGUrl}/me?fields=${personalUserFields}&access_token=${accessToken}`;

export const getMediaURL = (accessToken, user_id, connectType, limit = 200) => 'business' === connectType ?
    `${graphFBUrl}/${user_id}/media?fields=${businessMediaFields}&limit=${limit}&access_token=${accessToken}` :
    `${graphIGUrl}/me/media?fields=${personalMediaFields}&limit=${limit}&access_token=${accessToken}`;