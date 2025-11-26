const request = require('supertest');
const app = require('../../src/app');

// Mock the Bug model
jest.mock('../../src/models/Bug', () => ({
  create: jest.fn(),
  find: jest.fn().mockReturnValue({
    sort: jest.fn().mockReturnValue([])
  })
}));

describe('Bug Controller - Create Bug', () => {
  let Bug;

  beforeEach(() => {
    Bug = require('../../src/models/Bug');
    jest.clearAllMocks();
  });

  describe('POST /api/bugs', () => {
    it('should create a new bug and return 201', async () => {
      const newBug = {
        title: 'New Test Bug',
        description: 'This is a test bug description',
        reportedBy: 'testuser'
      };

      const createdBug = {
        _id: '1',
        ...newBug,
        status: 'open',
        priority: 'medium'
      };

      Bug.create.mockResolvedValue(createdBug);

      const res = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject(createdBug);
      expect(Bug.create).toHaveBeenCalledWith(newBug);
    });

    it('should return 500 on database error', async () => {
      const newBug = {
        title: 'New Test Bug',
        description: 'This is a test bug description',
        reportedBy: 'testuser'
      };

      Bug.create.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .post('/api/bugs')
        .send(newBug);

      expect(res.statusCode).toBe(500);
    });
  });
});
