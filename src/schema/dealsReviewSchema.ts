export const dealsReviewSchema = {
    version: 0,
    primaryKey: 'uId',
    type: 'object',
    properties: {
        uId: {
            type: 'string',
            maxLength: 5000
        },
        userName: {
            type: 'string'
        },
        startDate: {
            type: 'date'
        },
        comments: {
            type: 'string'
        },
        dealsId: {
            type: 'string'
        },
        helpful: {
            type: 'string'
        }
    },
    required: ['uId', 'userName', 'dealsId']
}