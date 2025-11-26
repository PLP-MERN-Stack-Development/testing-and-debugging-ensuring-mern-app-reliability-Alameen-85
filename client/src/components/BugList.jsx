const BugList = ({ bugs, onEdit, onDelete, onStatusChange }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            low: 'bg-gray-200 text-gray-800',
            medium: 'bg-blue-200 text-blue-800',
            high: 'bg-orange-200 text-orange-800',
            critical: 'bg-red-200 text-red-800'
        };
        return colors[priority] || colors.medium;
    };

    const getStatusColor = (status) => {
        const colors = {
            open: 'bg-yellow-200 text-yellow-800',
            'in-progress': 'bg-blue-200 text-blue-800',
            resolved: 'bg-green-200 text-green-800'
        };
        return colors[status] || colors.open;
    };

    if (bugs.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                No bugs reported yet. Create your first bug report!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {bugs.map((bug) => (
                <div key={bug._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-2">{bug.title}</h3>
                            <p className="text-gray-600 mb-3">{bug.description}</p>
                            <div className="flex gap-2">
                                <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(bug.priority)}`}>
                                    {bug.priority}
                                </span>
                                <span className={`px-2 py-1 rounded text-sm ${getStatusColor(bug.status)}`}>
                                    {bug.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t">
                        <div className="text-sm text-gray-500">
                            Reported by: <span className="font-medium">{bug.reportedBy}</span>
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={bug.status}
                                onChange={(e) => onStatusChange(bug._id, e.target.value)}
                                className="px-3 py-1 border rounded text-sm"
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button
                                onClick={() => onEdit(bug)}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(bug._id)}
                                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BugList;