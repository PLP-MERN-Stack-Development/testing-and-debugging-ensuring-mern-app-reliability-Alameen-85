const request = require('supertest');
const app = require('../../src/app');

jest.mock('../../src/models/Bug', () => ({
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
}));

describe('Bug Controller Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/bugs', () => {
        it('should return 200 and list of bugs', async () => {
            const Bug = require('../../src/models/Bug');
            const mockBugs = [
                {
                    _id: '1',
                    title: 'Test Bug 1',
                    description: 'Test Description 1',
                    status: 'open',
                    priority: 'medium',
                    reportedBy: 'user1'
                }
            ];

            Bug.find.mockResolvedValue(mockBugs);

            const res = await request(app).get('/api/bugs');

            expect(res.statusCode).toBe(200);
            expect(Bug.find).toHaveBeenCalledTimes(1);
        });
    });
});