// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconCoin, IconUsers, IconFolder } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconCoin,
    IconUsers,
    IconFolder
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        // {
        //     id: 'sample-page',
        //     title: <FormattedMessage id="sample-page" />,
        //     type: 'item',
        //     url: '/sample-page',
        //     icon: icons.IconBrandChrome,
        //     breadcrumbs: false
        // },
        {
            id: 'Tips',
            title: <FormattedMessage id="Tips" />,
            type: 'item',
            url: '/tips',
            icon: icons.IconCoin,
            breadcrumbs: false
        },
        {
            id: 'Workers',
            title: <FormattedMessage id="Workers" />,
            type: 'item',
            url: '/workers',
            icon: icons.IconUsers,
            breadcrumbs: false
        },
        {
            id: 'Categories',
            title: <FormattedMessage id="Categories" />,
            type: 'item',
            url: '/categories',
            icon: icons.IconFolder,
            breadcrumbs: false
        }
        // {
        //     id: 'documentation',
        //     title: <FormattedMessage id="documentation" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/',
        //     icon: icons.IconHelp,
        //     external: true,
        //     target: true
        // },
        // {
        //     id: 'roadmap',
        //     title: <FormattedMessage id="roadmap" />,
        //     type: 'item',
        //     url: 'https://codedthemes.gitbook.io/berry/roadmap',
        //     icon: icons.IconSitemap,
        //     external: true,
        //     target: true
        // }
    ]
};

export default other;
