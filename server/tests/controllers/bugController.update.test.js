const request = require('supertest');
const app = require('../../src/app');

// Mock the Bug model
jest.mock('../../src/models/Bug', () => {
  const mockMethods = {
    findByIdAndUpdate: jest.fn(),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue([])
    })
  };
  return mockMethods;
});

describe('Bug Controller - Update Bug', () => {
  let Bug;

  beforeEach(() => {
    Bug = require('../../src/models/Bug');
    jest.clearAllMocks();
  });

  describe('PUT /api/bugs/:id', () => {
    it('should update an existing bug and return 200', async () => {
      const bugId = '1';
      const updateData = {
        title: 'Updated Bug Title',
        status: 'in-progress'
      };

      const updatedBug = {
        _id: bugId,
        title: 'Updated Bug Title',
        description: 'Original description',
        status: 'in-progress',
        priority: 'medium',
        reportedBy: 'testuser'
      };

      Bug.findByIdAndUpdate.mockResolvedValue(updatedBug);

      const res = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send(updateData);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        data: updatedBug
      });
      expect(Bug.findByIdAndUpdate).toHaveBeenCalledWith(
        bugId,
        updateData,
        { new: true, runValidators: true }
      );
    });

    it('should return 404 for non-existent bug', async () => {
      const bugId = '999';

      Bug.findByIdAndUpdate.mockResolvedValue(null);

      const res = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send({ title: 'Updated Title' });

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: 'Bug not found'
      });
    });

    it('should return 500 on database error', async () => {
      const bugId = '1';

      Bug.findByIdAndUpdate.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .put(`/api/bugs/${bugId}`)
        .send({ title: 'Updated Title' });

      expect(res.statusCode).toBe(500);
    });
  });
});
