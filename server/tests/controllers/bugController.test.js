const request = require('supertest');
const app = require('../../src/app');

// Simple mock that actually works
jest.mock('../../src/models/Bug', () => {
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

  return {
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue(mockBugs)
    }),
    findById: jest.fn().mockReturnValue(mockBugs[0])
  };
});

describe('Bug Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/bugs', () => {
    it('should return 200 and success response', async () => {
      const res = await request(app).get('/api/bugs');

      // Just test that it returns 200 and has the success property
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });

  describe('GET /api/bugs/:id', () => {
    it('should return 200 for any bug ID', async () => {
      const res = await request(app).get('/api/bugs/1');

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
    });
  });
});
