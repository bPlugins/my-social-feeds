import { instagramIcon } from '../../instagram/utils/icons';
import { gridIcon, masonryIcon, pinterest, sliderIcon, tickerIcon, tiktok, twitter } from '../../utils/icons';
import { elementorTabIcon, gutenbergTabIcon, phpTabIcon, shortcodeTabIcon } from './icons';

const slug = 'my-social-feeds';

export const dashboardInfo = (info) => {
    const { version, isPremium, hasPro, adminUrl, licenseActiveNonce, deleteDataOnUninstall = false, uninstallNonce = '' } = info;

    const proSuffix = isPremium ? ' Pro' : '';

    return {
        name: `My Social Feeds${proSuffix}`,
        displayName: `My Social Feeds${proSuffix} - Social Feeds Embedder Plugin for WordPress`,
        description: 'Embed Instagram, TikTok, Pinterest, and Twitter feeds easily using Gutenberg blocks.',
        slug,
        version,
        isPremium,
        hasPro,
        displayOurPlugins: true,
        media: {
            logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
            banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
            thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
            // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
            video: 'https://www.youtube.com/watch?v=9zLjvdAV60A',
            isYoutube: true
        },
        pages: {
            org: `https://wordpress.org/plugins/${slug}/`,
            // landing: `https://bplugins.com/products/${slug}/`,
            docs: `https://bplugins.com/docs/social-feed-block/`,
            pricing: `https://bplugins.com/products/my-social-feeds/pricing/`,
        },
        freemius: {
            product_id: 16150,
            plan_id: 27386,
            public_key: 'pk_5a1e06dcd48a4bcb7184e0d809e08'
        },
        adminUrl,
        licenseActiveNonce,
        deleteDataOnUninstall,
        uninstallNonce,
        startButton: {
            label: 'Start Now',
            url: `wp-admin/post-new.php?post_type=msfbp`
        }
    }
}

export const demoInfo = {
    allInOneLabel: 'See All Demos',
    allInOneLink: 'https://bplugins.com/products/social-feed-block/#demos',
    demos: [
        {
            icon: tiktok('#000'),
            title: 'TikTok Feed',
            children: [
                {
                    title: 'Default',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default/',
                },
                {
                    title: 'Card',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/card/',
                },
                {
                    title: 'Compact',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/compact/',
                },
                {
                    title: 'Only Videos',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/only-videos/',
                },
                {
                    title: 'Column',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/column/',
                },
                {
                    title: 'Load 5 Videos',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/load-5-video/',
                },
                {
                    title: 'Default Profile Slider Horizontal',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default-profile-slider-horizontal/',
                },
                {
                    title: 'Default Profile Slider Horizontal',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default-profile-slider-landscape/',
                },
                {
                    title: 'Default Profile Slider Square',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default-profile-slider-square/',
                },
                {
                    title: 'Default Profile Slider Vertical',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default-profile-slider-vertical/',
                },
                {
                    title: 'Horizontal Profile Default Center',
                    type: 'iframe',
                    url: 'http://wptiktokfeed.com/demo/horizontal-profile-default-center/',
                },
                {
                    title: 'Landscape Profile Default Center',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/landscape-profile-default-center/',
                },
                {
                    title: 'Portrait Profile Default Center',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/portrait-profile-default-center/',
                },
                {
                    title: 'Profile Default Center',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/profile-default-center/',
                },
                {
                    title: 'Profile Masonry',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/profile-masonry/',
                },

                {
                    title: 'Vertical Profile Default Center',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/vertical-profile-default-center/',
                },
            ]
        },
        {
            icon: instagramIcon('#000', 27),
            title: 'Instagram Feed',
            children: [
                {
                    title: 'Default',
                    type: 'iframe',
                    url: 'https://wptiktokfeed.com/demo/default/',
                },
                {
                    title: 'Just Feed with Image Zoom Out',
                    type: 'iframe',
                    url: 'https://social.bplugins.com/demo/just-feed-image-zoom-out/',
                },
                {
                    title: 'No Caption with Image Rotate',
                    type: 'iframe',
                    url: 'https://social.bplugins.com/demo/no-caption-image-rotate-in/',
                },
                {
                    title: 'Load More with Image Shine',
                    type: 'iframe',
                    url: 'https://social.bplugins.com/demo/load-more-image-shine/',
                },
            ]
        },
        {
            icon: pinterest('#000'),
            title: 'Pinterest Feed',
            children: [
                {
                    title: 'Default',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-default',
                },
                {
                    title: 'Only Pins',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/only-pins',
                },
                {
                    title: 'Only Profiles',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/only-profiles',
                },
                {
                    title: 'Masonry',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/masonry',
                },
                {
                    title: 'Slider',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-slider/',
                },
                {
                    title: 'Default Landscape',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-default-landscape/',
                },
                {
                    title: 'Default Horizontal',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-default-horizontal/',
                },
                {
                    title: 'Default Square',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-square/',
                },
                {
                    title: 'Default Vertical',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-default-vertical/',
                },
                {
                    title: 'Default Portrait',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/b-pinterest-default-portrait/',
                },
            ]
        },
        {
            icon: twitter('#000'),
            title: 'Twitter Feed',
            children: [
                {
                    title: 'Follow Button',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/twitter-follow-button/',
                },
                {
                    title: 'Tweet Button',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/twitter-tweet-button/',
                },
                {
                    title: 'Has Tag Button',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/twitter-has-tag-button/',
                },
                {
                    title: 'Single Video',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/single-demo/',
                },
                {
                    title: 'Single Post',
                    type: 'iframe',
                    url: 'https://bblockswp.com/demo/twitter-single-post/',
                },
            ]
        },

    ]
}

export const pricingInfo = {
    logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`, // Optional
    pluginId: 16150,
    planId: 27386,
    licenses: [
        1,
        3,
        null
    ],
    button: {
        label: 'Buy Now ➜'
    },
    featured: {
        selected: 3, // choose from licenses item
    }
}


export const welcomeInfo = (adminUrl) => ({
    keywords: ['TikTok', 'Instagram', 'Pinterest', 'Twitter'],
    keywordsLabel: 'Feeds',
    gettingStarted: {
        tabs: [
            {
                key: 'gutenberg',
                label: 'Gutenberg',
                icon: gutenbergTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Open the Block Editor',
                        body: 'Create a new post or page — or edit an existing one. Click the <strong>+</strong> inserter in the top-left, or just type <strong>/</strong> followed by a network name such as <strong>/tiktok</strong> or <strong>/instagram</strong> to drop in a feed block.',
                        link: { url: `${adminUrl}post-new.php`, label: 'Open Editor' }
                    },
                    {
                        num: 2,
                        title: 'Pick a Network & Connect',
                        body: 'Choose your platform below — <strong>TikTok</strong>, <strong>Instagram</strong>, <strong>Pinterest</strong>, or <strong>Twitter</strong> — then connect your account or paste your source right inside the block.'
                    },
                    {
                        num: 3,
                        title: 'Customize & Publish',
                        body: 'Fine-tune the layout, columns, and colors from the block settings sidebar, then hit <strong>Publish</strong> — your feed goes live instantly. 🎉'
                    }
                ]
            },
            {
                key: 'shortcode',
                label: 'ShortCode',
                icon: shortcodeTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a New Feed',
                        body: 'Go to <strong>My Social Feeds &rsaquo; Add New</strong> to create a reusable feed you can embed anywhere with a single shortcode.',
                        link: { url: `${adminUrl}post-new.php?post_type=msfbp`, label: 'Add New Feed' }
                    },
                    {
                        num: 2,
                        title: 'Build Your Feed',
                        body: 'Pick your network (<strong>TikTok</strong>, <strong>Instagram</strong>, <strong>Pinterest</strong>, or <strong>Twitter</strong>), connect your account, and style the feed to match your site.'
                    },
                    {
                        num: 3,
                        title: 'Publish & Copy the Shortcode',
                        body: 'Click <strong>Publish</strong>, then open the <strong>My Social Feeds</strong> list. Click the value in the <strong>ShortCode</strong> column — e.g. <code>[msfbp-social-feeds id=2460]</code> — to copy it to your clipboard.',
                        link: { url: `${adminUrl}edit.php?post_type=msfbp`, label: 'All Feeds' }
                    },
                    {
                        num: 4,
                        title: 'Paste Anywhere',
                        body: 'Drop the shortcode into any post, page, widget area, or a <strong>Shortcode</strong> block — your feed renders instantly on the front end.'
                    }
                ]
            },
            {
                key: 'elementor',
                label: 'Elementor',
                icon: elementorTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a Feed Shortcode',
                        body: 'Go to <strong>My Social Feeds &rsaquo; Add New</strong>, build and customize your feed, then <strong>Publish</strong>. Copy its shortcode from the <strong>My Social Feeds</strong> list.',
                        link: { url: `${adminUrl}post-new.php?post_type=msfbp`, label: 'Add New Feed' }
                    },
                    {
                        num: 2,
                        title: 'Add the Shortcode Widget',
                        body: 'Edit any page with Elementor, search for the <strong>Shortcode</strong> widget, and drag it onto the canvas where you want the feed to appear.'
                    },
                    {
                        num: 3,
                        title: 'Paste & Preview',
                        body: 'Paste your shortcode — e.g. <code>[msfbp-social-feeds id=2460]</code> — into the widget’s <strong>Shortcode</strong> field. Elementor renders a live preview right away.'
                    }
                ]
            },
            {
                key: 'php',
                label: 'Theme / PHP',
                icon: phpTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a Feed Shortcode',
                        body: 'Go to <strong>My Social Feeds &rsaquo; Add New</strong>, build and customize your feed, then <strong>Publish</strong>. Copy its shortcode from the <strong>My Social Feeds</strong> list.',
                        link: { url: `${adminUrl}post-new.php?post_type=msfbp`, label: 'Add New Feed' }
                    },
                    {
                        num: 2,
                        title: 'Open Your Theme Template',
                        body: 'Open the template file where the feed should appear — for example <code>single.php</code>, <code>page.php</code>, or a custom template part.'
                    },
                    {
                        num: 3,
                        title: 'Render with do_shortcode()',
                        body: 'Add <code>&lt;?php echo do_shortcode( \'[msfbp-social-feeds id=2460]\' ); ?&gt;</code> to your template (swap in your feed’s ID) to output the feed on the front end.'
                    }
                ]
            }
        ]
    },

    changelogsLimit: 6,
    changelogsReadMoreLabel: 'View More Changelogs',
    changelogs: [
        {
            version: '1.0.4 - 18 April, 2026',
            type: 'security',
            list: [
                'Security Fix: Resolved a Wordfence-identified Missing Authorization vulnerability to prevent unauthenticated access.',
            ]
        },
        {
            version: '1.0.3 - 11 April, 2026',
            type: 'new',
            list: [
                'Added a new modern dashboard;'
            ]
        },
        {
            version: '1.0.2 - 5 Feb, 2026',
            type: 'new',
            list: [
                'New: Three new Gutenberg blocks have been added: TikTok Feeds, Pinterest Pins, and Twitter',
            ]
        },
        {
            version: '1.0.1 – 24 Nov, 2025',
            type: 'new',
            list: [
                'Modern dashboard added;',
            ]
        }

    ],
    proFeatures: [
        "(TikTok Feed) Videos per page",
        "Show Hide Video Overly like, share, and view.",
        "Video overly icon style",
        "Share button text change",
        "Share button style",
        "Cache time set profile and video",
        "Profile 3 layout",
        "(Instagram Feed) Popup: Show feed details in the popup modal.",
        "(Instagram Feed) Name: Show Name in the profile area.",
        "(Instagram Feed) Biography: Show the Biography in the profile area.",
        "(Instagram Feed) Follow Button: Set the Follow button in the footer area.",
        "(Instagram Feed) Profile Photo: Set different Profile Photo sizes in the popup area.",
        "(Instagram Feed) Caption: Remove Caption hashtag",
        "(Pinterest Feed) Show/Hide Pins.",
        "(Pinterest Feed) There are four types of layouts: Default, Masonry, Slider, and Justified.",
        "(Pinterest Feed) Change image ratio.",
        "(Pinterest Feed) Popup options for show/hide: Zoom In, Zoom Out, Toggle 1:1, etc.",
        "(Pinterest Feed) Set image overlay, transform, and overlay color.",
        "(Pinterest Feed) Set typography for Name, About, Count, and button."
    ],
})