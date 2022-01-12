const Config = 
{
    API: process.env.REACT_APP_API_URL,
    FPD_URL: process.env.REACT_APP_FPD_URL,
    BASE_FPD_URL: process.env.REACT_APP_FPD_BASE_URL,
    HOME_URL: process.env.REACT_APP_HOME_URL,
    PASADENA_INFO: {
        address: 'TiptipTop\'s Address',
        contact_email: 'info@tiptiptop.com',
        contact_phone: '+1 123 456 78910',
        social_network: {
            facebook: 'https://facebook.com',
            instagram: 'https://instagram.com',
            twitter: 'https://twitter.com',
        }
    },
    DB_CONFIG: {

        name: 'TiptiptopCart',
        version: 1,
        objectStoresMeta: [
            {
                store: 'cart',
                storeConfig: { keyPath: 'id', autoIncrement: true },
                storeSchema: [
                    { name: 'name', keypath: 'name', options: { unique: false } },
                    { name: 'guid', keypath: 'guid', options: { unique: true } },
                    { name: 'product', keypath: 'product', options: { unique: false } },
                    { name: 'productType', keypath: 'productType', options: { unique: false } },
                    { name: 'size', keypath: 'size', options: { unique: false } },
                    { name: 'color', keypath: 'color', options: { unique: false } },
                    { name: 'price', keypath: 'price', options: { unique: false } },
                    { name: 'description', keypath: 'description', options: { unique: false } },
                    { name: 'image', keypath: 'image', options: { unique: false } },
                    { name: 'qty', keypath: 'qty', options: { unique: false } },
                    { name: 'availableSizes', keypath: 'availableSizes', options: { unique: false } },
                    { name: 'weight', keypath: 'weight', options: { unique: false } }
                ]
            }
        ]

    },

    US_STATES: [
        { code: 'AL', name: 'Alabama' },
        { code: 'AK', name: 'Alaska' },
        { code: 'AZ', name: 'Arizona' },
        { code: 'AR', name: 'Arkansas' },
        { code: 'CA', name: 'California' },
        { code: 'CO', name: 'Colorado' },
        { code: 'CT', name: 'Connecticut' },
        { code: 'DE', name: 'Delaware' },
        { code: 'DC', name: 'District Of Columbia' },
        { code: 'FL', name: 'Florida' },
        { code: 'GA', name: 'Georgia' },
        { code: 'HI', name: 'Hawaii' },
        { code: 'ID', name: 'Idaho' },
        { code: 'IL', name: 'Illinois' },
        { code: 'IN', name: 'Indiana' },
        { code: 'IA', name: 'Iowa' },
        { code: 'KS', name: 'Kansas' },
        { code: 'KY', name: 'Kentucky' },
        { code: 'LA', name: 'Louisiana' },
        { code: 'ME', name: 'Maine' },
        { code: 'MD', name: 'Maryland' },
        { code: 'MA', name: 'Massachusetts' },
        { code: 'MI', name: 'Michigan' },
        { code: 'MN', name: 'Minnesota' },
        { code: 'MS', name: 'Mississippi' },
        { code: 'MO', name: 'Missouri' },
        { code: 'MT', name: 'Montana' },
        { code: 'NE', name: 'Nebraska' },
        { code: 'NV', name: 'Nevada' },
        { code: 'NH', name: 'New Hampshire' },
        { code: 'NJ', name: 'New Jersey' },
        { code: 'NM', name: 'New Mexico' },
        { code: 'NY', name: 'New York' },
        { code: 'NC', name: 'North Carolina' },
        { code: 'ND', name: 'North Dakota' },
        { code: 'OH', name: 'Ohio' },
        { code: 'OK', name: 'Oklahoma' },
        { code: 'OR', name: 'Oregon' },
        { code: 'PA', name: 'Pennsylvania' },
        { code: 'RI', name: 'Rhode Island' },
        { code: 'SC', name: 'South Carolina' },
        { code: 'SD', name: 'South Dakota' },
        { code: 'TN', name: 'Tennessee' },
        { code: 'TX', name: 'Texas' },
        { code: 'UT', name: 'Utah' },
        { code: 'VT', name: 'Vermont' },
        { code: 'VA', name: 'Virginia' },
        { code: 'WA', name: 'Washington' },
        { code: 'WV', name: 'West Virginia' },
        { code: 'WI', name: 'Wisconsin' },
        { code: 'WY', name: 'Wyoming' },
    ],
    
    COLORS: [
        { name: 'Grey', hexCode: '5E5F5F' },
        { name: 'Black', hexCode: '1C1C1C' },
        { name: 'Light Green', hexCode: '8EEBC1' },
        { name: 'White', hexCode: 'FFFFFF' },
        { name: 'Navy Blue', hexCode: '152958' },
        { name: 'Vintage Black', hexCode: '222222' },
        { name: 'Brunt Orange', hexCode: 'E78848' },
        { name: 'Pink', hexCode: 'E09B8E' },
        { name: 'Red', hexCode: 'C1000A' },
        { name: 'Team Purple', hexCode: '552583' },
        { name: 'Marron', hexCode: '4F1111' },
        { name: 'Green', hexCode: '114C2A' },
        { name: 'Yellow', hexCode: 'F3CC30' },
    ],

    SIZES: [
        { code: 'S', name: 'Small' },
        { code: 'M', name: 'Medium' },
        { code: 'L', name: 'Large' },
        { code: 'XL', name: 'Extra-Large' },
        { code: 'XXL', name: 'Extra-Extra-Large' },
    ],

    COLORS_INIT: {
        '5E5F5F': false,
        '1C1C1C': false,
        '8EEBC1': false,
        'FFFFFF': false,
        '152958': false,
        '222222': false,
        'E78848': false,
        'E09B8E': false,
        'C1000A': false,
        '552583': false,
        '4F1111': false,
        '114C2A': false,
        'F3CC30': false
    },

    SIZES_INIT: {
        'S': false,
        'M': false,
        'L': false,
        'XL': false,
        'XXL': false,
    },

    ORDER_STATUS: {
        'pending_payment': 'pending_payment',
        'open': 'open',
        'hold': 'hold',
        'processed': 'processed',
        'shipped': 'shipped',
        'completed': 'completed',
        'canceled' : 'canceled'
    }
}

export default Config;