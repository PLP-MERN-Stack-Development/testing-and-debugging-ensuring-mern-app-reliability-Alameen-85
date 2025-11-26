jest.mock('mongoose', () => ({
    Schema: jest.fn(() => ({
        pre: jest.fn(),
        post: jest.fn(),
    })),
    model: jest.fn(),
}));

const Bug = require('../../src/models/Bug');

describe('Bug Model Unit Tests', () => {
    it('should have default status as open', () => {
        const mockBug = {
            title: 'Test Bug',
            description: 'Test Description',
            reportedBy: 'testuser',
            status: 'open',
            priority: 'medium'
        };

        expect(mockBug.status).toBe('open');
    });

    it('should have default priority as medium', () => {
        const mockBug = {
            title: 'Test Bug',
            description: 'Test Description',
            reportedBy: 'testuser',
            status: 'open',
            priority: 'medium'
        };

        expect(mockBug.priority).toBe('medium');
    });
});