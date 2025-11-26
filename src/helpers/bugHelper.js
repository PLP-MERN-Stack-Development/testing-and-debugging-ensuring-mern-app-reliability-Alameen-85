// src/helpers/bugHelper.js
function validateBug(bug) {
    if (!bug.title || typeof bug.title !== 'string' || bug.title.length < 3) 
return false;
// src/helpers/bugHelper.js

function validateBug(bug) {
    if (!bug.title || typeof bug.title !== 'string' || bug.title.length < 3 || 
bug.title.length > 100) return false;
    if (!bug.description || typeof bug.description !== 'string' || 
bug.description.length < 10) return false;
    if (!bug.reportedBy || typeof bug.reportedBy !== 'string') return false;
    return true;
}

module.exports = { validateBug };

    
if (!bug.description || typeof 
bug.description !== 'string' || 
bug.description.length < 10) return false;
    if (!bug.reportedBy || typeof bug.reportedBy !== 'string') return false;
    return true;
}

module.exports = { validateBug };

