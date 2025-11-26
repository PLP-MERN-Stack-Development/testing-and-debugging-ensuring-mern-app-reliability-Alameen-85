const request = require('supertest');
const app = require('../../src/app');

// Mock the Bug model
jest.mock('../../src/models/Bug', () => {
  const mockMethods = {
    findByIdAndDelete: jest.fn(),
    find: jest.fn().mockReturnValue({
      sort: jest.fn().mockReturnValue([])
    })
  };
  return mockMethods;
});

describe('Bug Controller - Delete Bug', () => {
  let Bug;

  beforeEach(() => {
    Bug = require('../../src/models/Bug');
    jest.clearAllMocks();
  });

  describe('DELETE /api/bugs/:id', () => {
    it('should delete an existing bug and return 200', async () => {
      const bugId = '1';
      const deletedBug = {
        _id: bugId,
        title: 'Test Bug',
        description: 'Test Description'
      };

      Bug.findByIdAndDelete.mockResolvedValue(deletedBug);

      const res = await request(app)
        .delete(`/api/bugs/${bugId}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        success: true,
        message: 'Bug deleted successfully'
      });
      expect(Bug.findByIdAndDelete).toHaveBeenCalledWith(bugId);
    });

    it('should return 404 for non-existent bug', async () => {
      const bugId = '999';

      Bug.findByIdAndDelete.mockResolvedValue(null);

      const res = await request(app)
        .delete(`/api/bugs/${bugId}`);

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({
        success: false,
        message: 'Bug not found'
      });
    });

    it('should return 500 on database error', async () => {
      const bugId = '1';

      Bug.findByIdAndDelete.mockRejectedValue(new Error('Database error'));

      const res = await request(app)
        .delete(`/api/bugs/${bugId}`);

      expect(res.statusCode).toBe(500);
    });
  });
});
