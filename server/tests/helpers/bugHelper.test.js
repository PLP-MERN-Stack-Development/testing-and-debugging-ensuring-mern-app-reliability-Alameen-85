// tests/helpers/bugHelper.test.js
const { validateBug } = require('../../src/helpers/bugHelper');

describe('Bug Helper - validateBug', () => {
  test('returns true for valid bug', () => {
    const bug = {
      title: 'Sample bug',
      description: 'This is a proper description.',
      reportedBy: 'Alice'
    };
    expect(validateBug(bug)).toBe(true);
  });

  test('returns false if title is missing', () => {
    const bug = {
      description: 'Valid description',
      reportedBy: 'Bob'
    };
    expect(validateBug(bug)).toBe(false);
  });

  test('returns false if description is too short', () => {
    const bug = {
      title: 'Short desc',
      description: 'Too short',
      reportedBy: 'Charlie'
    };
    expect(validateBug(bug)).toBe(false);
  });

  test('returns false if reportedBy is missing', () => {
    const bug = {
      title: 'Valid title',
      description: 'Valid description'
    };
    expect(validateBug(bug)).toBe(false);
  });

  test('returns false if reportedBy is not a string', () => {
    const bug = {
      title: 'Valid title',
      description: 'Valid description',
      reportedBy: 123
    };
    expect(validateBug(bug)).toBe(false);
  });
});


