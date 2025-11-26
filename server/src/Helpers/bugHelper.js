// src/helpers/bugHelper.js
function validateBug(bug) {
    if (!bug.title || bug.title.length < 3) return false;
    if (!bug.description || bug.description.length < 10) return false;
    if (!bug.reportedBy || typeof bug.reportedBy !== 'string') return false;
    return true;
}

module.exports = { validateBug };
