import { useState, useEffect } from 'react';
import { bugService } from './services/bugService';
import BugForm from './components/BugForm';
import BugList from './components/BugList';

function App() {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBug, setEditingBug] = useState(null);

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    try {
      setLoading(true);
      const response = await bugService.getAllBugs();
      setBugs(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch bugs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBug = async (bugData) => {
    try {
      await bugService.createBug(bugData);
      fetchBugs();
      setShowForm(false);
    } catch (err) {
      setError('Failed to create bug');
    }
  };

  const handleUpdateBug = async (bugData) => {
    try {
      await bugService.updateBug(editingBug._id, bugData);
      fetchBugs();
      setEditingBug(null);
    } catch (err) {
      setError('Failed to update bug');
    }
  };

  const handleDeleteBug = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await bugService.deleteBug(id);
        fetchBugs();
      } catch (err) {
        setError('Failed to delete bug');
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await bugService.updateBug(id, { status });
      fetchBugs();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto p-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bug Tracker</h1>
          <p className="text-gray-600">Track and manage bugs efficiently</p>
        </header>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            {showForm ? 'Cancel' : '+ Report New Bug'}
          </button>
        </div>

        {(showForm || editingBug) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {editingBug ? 'Edit Bug' : 'Report New Bug'}
            </h2>
            <BugForm
              onSubmit={editingBug ? handleUpdateBug : handleCreateBug}
              onCancel={() => {
                setShowForm(false);
                setEditingBug(null);
              }}
              initialData={editingBug}
            />
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        ) : (
          <BugList
            bugs={bugs}
            onEdit={setEditingBug}
            onDelete={handleDeleteBug}
            onStatusChange={handleStatusChange}
          />
        )}
      </div>
    </div>
  );
}

export default App;