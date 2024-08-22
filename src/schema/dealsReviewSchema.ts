export const dealsReviewSchema = {
    version: 0,
    primaryKey: 'userid',
    type: 'object',
    properties: {
        userid: {
            type: 'string',
            maxLength: 5000
        },
        username: {
            type: 'string'
        },
        startdate: {
            type: 'date'
        },
        comments: {
            type: 'boolean'
        },
        dealsid: {
            type: 'string'
        },
        helpful: {
            type: 'string'
        }
    },
    required: ['userid', 'username', 'dealsid']
}