import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { type Task } from '../Type';
import { fetchTaskById, updateTask } from '../api/tasks'; 

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Keep separate edit fields 
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>('');
  const [editDesc, setEditDesc] = useState<string>('');
  const [editDate, setEditDate] = useState<string>('');
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  // Load the latest task details whenever the task id in the URL changes
  useEffect(() => {
    const loadTaskDetails = async () => {
      setLoading(true);
      setErrorMsg(null);
      setTask(null);

      try {
        if (!id) {
          throw new Error('Task ID is missing');
        }

        const taskId = Number(id);

        if (!Number.isInteger(taskId)) {
          throw new Error('Invalid task ID');
        }


        const data = await fetchTaskById(taskId);

        setTask(data);
        setEditName(data.name || 'Task');
        setEditDesc(data.description === 'No description provided.' ? '' : data.description || '');
        setEditDate(data.dueDate === 'No due date set.' ? '' : data.dueDate || '');
      } catch (error) {
        console.error('Error loading task details:', error);

        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg('Failed to load task details');
        }
      } finally {
        setLoading(false);
      }
    };

    loadTaskDetails();
  }, [id]);

  const handleSaveChanges = async () => {
    if (!id || !task) return;
  
    if (!editName.trim()) {
      alert('Task name cannot be empty.');
      return;
    }
  
    try {
      setSaveLoading(true);
  
      const updatedData = await updateTask(Number(id), {
        title: editName.trim(),
        description: editDesc.trim(),
        dueDate: editDate,
      });
  
      setTask(updatedData);
      setEditName(updatedData.name || 'Task');
      setEditDesc(updatedData.description === 'No description provided.' ? '' : updatedData.description || '');
      setEditDate(updatedData.dueDate === 'No due date set.' ? '' : updatedData.dueDate || '');
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task details:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleCancel = () => {
    if (!task) return;
    setEditName(task.name);
    setEditDesc(task.description === 'No description provided.' ? '' : task.description || '');
    setEditDate(task.dueDate === 'No due date set.' ? '' : task.dueDate || '');
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
        Loading task details...
      </div>
    );
  }

  if (errorMsg || !task) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h3 style={{ color: 'red' }}>{errorMsg || 'Task not found.'}</h3>
        <button
          onClick={() => navigate('/')}
          style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Back to Home List
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden', backgroundColor: '#fff' }}>
        
        <div style={{ backgroundColor: '#f8f9fa', padding: '15px 20px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ fontSize: '1.5rem', fontWeight: 'bold', width: '70%', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          ) : (
            <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#333' }}>{task.name}</h2>
          )}

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              ✏️ Edit
            </button>
          )}
        </div>

        <div style={{ padding: '20px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h5 style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>Description</h5>
            {isEditing ? (
              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Enter details..."
                rows={4}
                style={{ width: '100%', padding: '8px', fontSize: '1.1rem', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box', resize: 'vertical' }}
              />
            ) : (
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#444', margin: 0, whiteSpace: 'pre-wrap' }}>
                {task.description}
              </p>
            )}
          </div>

          <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h5 style={{ color: '#666', marginBottom: '8px', fontSize: '1rem' }}>Due Date</h5>
            {isEditing ? (
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                style={{ padding: '6px 10px', fontSize: '1.1rem', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            ) : (
              <p style={{ color: '#e056fd', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
                {task.dueDate}
              </p>
            )}
          </div>

          <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  disabled={saveLoading}
                  style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {saveLoading ? 'Saving...' : '💾 Save'}
                </button>
                <button
                  onClick={handleCancel}
                  style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/')}
                style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'opacity 0.2s' }}
                onMouseOver={(event) => { event.currentTarget.style.opacity = '0.8'; }}
                onMouseOut={(event) => { event.currentTarget.style.opacity = '1'; }}
              >
                Back to List
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default TaskDetailPage;