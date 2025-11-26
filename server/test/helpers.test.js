const { validateBug } = require('../src/helpers/bugHelper');

test('validateBug returns true for valid bug', () => {
    const bug = {
        title: 'Login issue',
        description: 'Cannot login with correct credentials',
        reportedBy: 'Alice'
    };
    expect(validateBug(bug)).toBe(true);
});

test('validateBug returns false for invalid bug', () => {
    const bug = {
        title: 'Hi', // too short
        description: 'Short',
        reportedBy: ''
    };
    expect(validateBug(bug)).toBe(false);
});
