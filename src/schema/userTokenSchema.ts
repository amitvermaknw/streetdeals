export const userTokenSchema = {
    version: 0,
    primaryKey: 'accessToken',
    type: 'object',
    properties: {
        accessToken: {
            type: 'string',
            maxLength: 5000
        },
        displayName: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        emailVerified: {
            type: 'boolean'
        },
        phoneNumber: {
            type: 'string'
        },
        photoURL: {
            type: 'string'
        },
        timestamp: {
            type: 'string',
            format: 'date-time'
        }
    },
    required: ['accessToken', 'displayName', 'email', 'emailVerified']
}