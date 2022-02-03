// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconBrandChrome, IconHelp, IconSitemap, IconCoin, IconUsers, IconFolder, IconQrcode } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconCoin,
    IconUsers,
    IconFolder,
    IconQrcode
};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'Tips',
            title: <FormattedMessage id="My Tips" />,
            type: 'item',
            url: '/tips',
            icon: icons.IconCoin,
            breadcrumbs: false
        },
        {
            id: 'Qr',
            title: <FormattedMessage id="My Qr" />,
            type: 'item',
            url: '/Qr',
            icon: icons.IconQrcode,
            breadcrumbs: false
        }
    ]
};

export default other;
