const slug = 'my-social-feeds';

export const dashboardInfo = (info) => {
    const { version, isPremium, hasPro } = info;
    const proSuffix = isPremium ? 'Pro' : '';

    return {
        name: `My Social Feeds ${proSuffix}`,
        displayName: `My Social Feeds ${proSuffix} - Display Instagram Feeds in Grid Layouts`,
        description: 'Social Feed offers an easy embed feature that lets you add Instagram posts as gallery on your WordPress website. You have to just put your instagram access token, and you are ready to go.',
        slug,
        logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
        // banner: `https://b-slider.bplugins.com/wp-content/uploads/2025/09/light-box.png`,
        video: 'https://www.youtube.com/watch?v=9zLjvdAV60A&t=10s',
        isYoutube: true,
        version,
        isPremium,
        hasPro,
        pages: {
            org: `https://wordpress.org/plugins/${slug}/`,
            landing: `https://bplugins.com/products/social-feed-block/`,
            docs: `https://www.youtube.com/watch?v=9zLjvdAV60A&t=10s`,
            pricing: `https://bplugins.com/products/social-feed-block/#pricing`,
        },
        freemius: {
            product_id: 16150,
            plan_id: 27386,
            public_key: 'pk_5a1e06dcd48a4bcb7184e0d809e08'
        }
    }
}

export const changelogs = [
    {
        version: '1.0.1',
        list: [
            'Modern Dashboard Added;',
        ]
    },
    {
        version: '1.0.0',
        list: [
            'Initial Release;',
        ]
    }
];

export const demoInfo = {
    title: 'Live Overview',
    description: 'Click on any section to view it live',
    allInOneLabel: 'See All Demos',
    allInOneLink: 'https://bplugins.com/products/social-feed-block/#demos',
    demos: [
        {
            icon: '',
            title: 'Default',
            description: '',
            category: '',
            type: 'iframe',
            url: 'https://social.bplugins.com/demo/default/'
        },
        {
            icon: '',
            title: 'Just Feed & Image Zoom Out',
            description: '',
            category: '',
            type: 'iframe',
            url: 'https://social.bplugins.com/demo/just-feed-image-zoom-out/'
        },
        {
            icon: '',
            title: 'No Caption Image Rotate In',
            description: '',
            category: '',
            type: 'iframe',
            url: 'https://social.bplugins.com/demo/no-caption-image-rotate-in/'
        },
        {
            icon: '',
            title: 'Load More Image Shine',
            description: '',
            category: '',
            type: 'iframe',
            url: 'https://social.bplugins.com/demo/load-more-image-shine/'
        }

    ]
}

export const pricingInfo = {
    cycles: [
        {
            cycle: 'monthly',
            label: 'Monthly',
            isDefault: false
        },
        {
            cycle: 'annual',
            label: 'Yearly',
            isDefault: true
        },
        {
            cycle: 'lifetime',
            label: 'Lifetime',
            isDefault: false
        }
    ],
    plans: [
        {
            name: 'Single Site',
            quantity: 1,
            prices: {
                "monthly": "3.99",
                "annual": "35.88",
                "lifetime": "99.99"
                // lifetime: '29.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: false,
            note: ''
        },
        {
            name: '3 Sites',
            quantity: 3,
            prices: {
                "monthly": "6.99",
                "annual": "71.88",
                "lifetime": "219.99"
                // lifetime: '79.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: true,
            note: ''
        },
        {
            name: 'Unlimited Sites',
            quantity: 'null',
            prices: {
                "monthly": "26.99",
                "annual": "263.88",
                "lifetime": "799.99"
                // lifetime: '199.99'
            },
            pricePrefix: '',
            priceSuffix: '',
            isFeatured: false,
            note: ''
        }
    ],
    features: [
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
    button: {
        label: 'Buy Now ➜'
    },
    featured: {
        text: 'Best Value'
    }
}

export const featureCompareInfo = {
    title: 'Features',
    plans: [
        {
            id: 'ztbk4ex2fyi',
            name: 'Free Plan',
            color: '#485781'
        },
        {
            id: 'lhmjqhkeyi',
            name: `<span style='color: #485781;'>Pro Start from </span><span style='font-size: 1.3em;'>$35.88/y</span>`,
            color: '#146EF5'
        }
    ],
    features: [
        {
            label: 'Cache time is configured',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Set displayed items.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Open gallery item link.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Gallery item link opens in a new tab',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Show/hide profile.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Adjust profile picture size.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Show/Hide, Load More, Caption and Follow buttons.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'A change to the background color.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Define borders and padding.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Set image effects rotate in, rotate out, shine and zoom in, zoom out.',
            plans: ['ztbk4ex2fyi', 'lhmjqhkeyi']
        },
        {
            label: 'Show feed details in the popup modal.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Show Name in profile area.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Show Biography in profile area.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Set Follow button in footer area.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Set different Profile Photo size in popup area.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Remove Caption hashtag.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Change username color.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Profile name color and typography option',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Profile name color and typography option.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Change biography color.',
            plans: ['lhmjqhkeyi']
        },
        {
            label: 'Colors set follow button.',
            plans: ['lhmjqhkeyi']
        }
    ]
}