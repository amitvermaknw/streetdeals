export const userTokenSchema = {
    version: 1,
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
        },
        uId: {
            type: 'string'
        }
    },
    required: ['accessToken', 'displayName', 'email', 'emailVerified']
}