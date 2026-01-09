import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { tasksAPI } from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium'
  });

  const { user } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getTasks();
      setTasks(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingTask) {
        await tasksAPI.updateTask(editingTask.id, formData);
        setSuccess('Task updated successfully!');
      } else {
        await tasksAPI.createTask(formData);
        setSuccess('Task created successfully!');
      }

      setShowModal(false);
      setEditingTask(null);
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium'
      });
      fetchTasks();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      status: task.status,
      priority: task.priority
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await tasksAPI.deleteTask(id);
      setSuccess('Task deleted successfully!');
      fetchTasks();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium'
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setError('');
  };

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h2>My Tasks</h2>
            <p>Welcome back, {user?.username}! ({user?.role})</p>
          </div>
          <button className="btn btn-primary" onClick={openCreateModal}>
            + Create New Task
          </button>
        </div>

        {error && (
          <div className="message message-error">
            {error}
          </div>
        )}

        {success && (
          <div className="message message-success">
            {success}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
            <button className="btn btn-primary" onClick={openCreateModal}>
              Create your first task
            </button>
          </div>
        ) : (
          <div className="task-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-card priority-${task.priority}`}>
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-badges">
                    <span className="badge badge-status">
                      {task.status.replace('_', ' ')}
                    </span>
                    <span className={`badge badge-priority ${task.priority}`}>
                      {task.priority}
                    </span>
                  </div>
                </div>
                
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}

                <div className="task-actions">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  {user?.role === 'admin' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>

            {error && (
              <div className="message message-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter task description (optional)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-success">
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
