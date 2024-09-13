import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskCard from '../components/Card'; 
import { fetchTasks } from '../components/filesjs/actions'; 
import "../../src/components/css/Board.css";

const priorityNames = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const Board = () => {
  const dispatch = useDispatch();
  const { tickets, users, error } = useSelector(state => state.tasks);
  const [groupBy, setGroupBy] = React.useState('priority'); 
  const [sortBy, setSortBy] = React.useState('priority'); 
  const [showDropdown, setShowDropdown] = React.useState(false); 

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const getGroupedTasks = () => {
    if (groupBy === 'priority') {
      return tickets.reduce((acc, task) => {
        if (!acc[task.priority]) acc[task.priority] = [];
        acc[task.priority].push(task);
        return acc;
      }, {});
    } else if (groupBy === 'status') {
      return tickets.reduce((acc, task) => {
        if (!acc[task.status]) acc[task.status] = [];
        acc[task.status].push(task);
        return acc;
      }, {});
    } else if (groupBy === 'user') {
      return tickets.reduce((acc, task) => {
        const user = users.find(user => user.id === task.userId)?.name || 'Unknown User';
        if (!acc[user]) acc[user] = [];
        acc[user].push(task);
        return acc;
      }, {});
    }
    return {};
  };

  const groupedTasks = getGroupedTasks();

  const sortTasks = (tasks) => {
    if (sortBy === 'priority') {
      return tasks.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tasks;
  };

  const handleGroupingChange = (event) => {
    setGroupBy(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); 
  };

  return (
    <div>
      <button className="display-button" onClick={toggleDropdown}>
        Display
      </button>

      {showDropdown && (
        <div className="controls-dropdown">
          <div className="display-dropdown">
            <label htmlFor="grouping">Group by:</label>
            <select id="grouping" value={groupBy} onChange={handleGroupingChange}>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="sort-dropdown">
            <label htmlFor="sorting">Sort by:</label>
            <select id="sorting" value={sortBy} onChange={handleSortChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      <div className="kanban-board">
        {groupBy === 'priority' ? (
          <>
            {Object.keys(priorityNames).map(level => (
              <Column
                key={level}
                title={priorityNames[level]}
                tasks={sortTasks(groupedTasks[level] || [])}
              />
            ))}
          </>
        ) : (
          Object.keys(groupedTasks).map((groupKey) => (
            <Column
              key={groupKey}
              title={groupKey}
              tasks={sortTasks(groupedTasks[groupKey] || [])}
            />
          ))
        )}
      </div>
    </div>
  );
};

const titleToIcon = {
  'Urgent': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 1C1.91067 1 1 1.91067 1 3V13C1 14.0893 1.91067 15 3 15H13C14.0893 15 15 14.0893 15 13V3C15 1.91067 14.0893 1 13 1H3ZM7 4H9L8.75391 8.99836H7.25L7 4ZM9 11C9 11.5523 8.55228 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55228 10 9 10.4477 9 11Z" fill="#FB773F"/>
    </svg>
  ),
  'High': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#FF0000"/>
      <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#FF0000"/>
      <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#FF0000"/>
    </svg>
  ),
  'Medium': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#5C5C5E"/>
      <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#5C5C5E"/>
      <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#5C5C5E" fill-opacity="0.4"/>
    </svg>
  ),
  'Low': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.5 8H2.5C1.94772 8 1.5 8.44772 1.5 9V13C1.5 13.5523 1.94772 14 2.5 14H3.5C4.05228 14 4.5 13.5523 4.5 13V9C4.5 8.44772 4.05228 8 3.5 8Z" fill="#5C5C5E"/>
      <path d="M8.5 5H7.5C6.94772 5 6.5 5.44772 6.5 6V13C6.5 13.5523 6.94772 14 7.5 14H8.5C9.05228 14 9.5 13.5523 9.5 13V6C9.5 5.44772 9.05228 5 8.5 5Z" fill="#5C5C5E" fill-opacity="0.4"/>
      <path d="M13.5 2H12.5C11.9477 2 11.5 2.44772 11.5 3V13C11.5 13.5523 11.9477 14 12.5 14H13.5C14.0523 14 14.5 13.5523 14.5 13V3C14.5 2.44772 14.0523 2 13.5 2Z" fill="#5C5C5E" fill-opacity="0.4"/>
    </svg>
  ),
  'No priority': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.9" d="M4.5 7.34375H2.75C2.50838 7.34375 2.3125 7.53963 2.3125 7.78125V8.21875C2.3125 8.46037 2.50838 8.65625 2.75 8.65625H4.5C4.74162 8.65625 4.9375 8.46037 4.9375 8.21875V7.78125C4.9375 7.53963 4.74162 7.34375 4.5 7.34375Z" fill="#5E5E5F"/>
<path opacity="0.9" d="M8.875 7.34375H7.125C6.88338 7.34375 6.6875 7.53963 6.6875 7.78125V8.21875C6.6875 8.46037 6.88338 8.65625 7.125 8.65625H8.875C9.11662 8.65625 9.3125 8.46037 9.3125 8.21875V7.78125C9.3125 7.53963 9.11662 7.34375 8.875 7.34375Z" fill="#5E5E5F"/>
<path opacity="0.9" d="M13.25 7.34375H11.5C11.2584 7.34375 11.0625 7.53963 11.0625 7.78125V8.21875C11.0625 8.46037 11.2584 8.65625 11.5 8.65625H13.25C13.4916 8.65625 13.6875 8.46037 13.6875 8.21875V7.78125C13.6875 7.53963 13.4916 7.34375 13.25 7.34375Z" fill="#5E5E5F"/>
</svg>

  ),
  'Todo': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#B8B8B8" stroke-width="2"/>
</svg>
  ),
  'In progress': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" fill="white" stroke="#F2BE00" stroke-width="2"/>
<path d="M9 7C9 5.89543 8.10457 5 7 5C5.89543 5 5 5.89543 5 7C5 8.10457 5.89543 9 7 9C8.10457 9 9 8.10457 9 7Z" stroke="#F2BE00" stroke-width="4"/>
</svg>

  ),
  'Backlog': (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 13C10.3137 13 13 10.3137 13 7C13 3.68629 10.3137 1 7 1C3.68629 1 1 3.68629 1 7C1 10.3137 3.68629 13 7 13Z" stroke="#95999F" stroke-width="2" stroke-dasharray="1.4 1.74"/>
</svg>

  ),
};


const Column = ({ title, tasks }) => (
  <div className="kanban-column">
    <div className="column-header flex-sb">
      <h3 className="column-title">
        {titleToIcon[title]}
        <span className="title-with-icon">
          {title}
        </span>
        <span className="task-count">
          {tasks.length}
        </span>
      </h3>
      <div className="additional-info">
        <span className="plus-icon">
          + 
        </span>
        <span className="common-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.5C3.39782 6.5 3.77936 6.65804 4.06066 6.93934C4.34196 7.22064 4.5 7.60218 4.5 8C4.5 8.39782 4.34196 8.77936 4.06066 9.06066C3.77936 9.34196 3.39782 9.5 3 9.5C2.60218 9.5 2.22064 9.34196 1.93934 9.06066C1.65804 8.77936 1.5 8.39782 1.5 8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5ZM8 6.5C8.39782 6.5 8.77936 6.65804 9.06066 6.93934C9.34196 7.22064 9.5 7.60218 9.5 8C9.5 8.39782 9.34196 8.77936 9.06066 9.06066C8.77936 9.34196 8.39782 9.5 8 9.5C7.60218 9.5 7.22064 9.34196 6.93934 9.06066C6.65804 8.77936 6.5 8.39782 6.5 8C6.5 7.60218 6.65804 7.22064 6.93934 6.93934C7.22064 6.65804 7.60218 6.5 8 6.5ZM13 6.5C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8C14.5 8.39782 14.342 8.77936 14.0607 9.06066C13.7794 9.34196 13.3978 9.5 13 9.5C12.6022 9.5 12.2206 9.34196 11.9393 9.06066C11.658 8.77936 11.5 8.39782 11.5 8C11.5 7.60218 11.658 7.22064 11.9393 6.93934C12.2206 6.65804 12.6022 6.5 13 6.5Z" fill="#5C5C5E"/>
          </svg>
        </span>
      </div>
    </div>
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard key={task.id} title={task.title} cameraNumber={task.id} tag={task.tag} />
      ))}
    </div>
  </div>
);

export default Board;
