import React, { useState } from 'react';
import {
    Calendar,
    Table,
    FileText,
    Kanban,
    Sun,
    Moon,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Play,
    User,
    Tag,
    Bell,
    Settings
} from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('kanban');
    const [draggedItem, setDraggedItem] = useState(null);
    const [columns, setColumns] = useState({
        'todo': {
            id: 'todo',
            title: 'To Do',
            color: 'gray',
            items: [
                {
                    id: '1',
                    title: 'Setup Slack Integration',
                    description: 'Configure Slack webhook for notifications',
                    priority: 'high',
                    assignee: 'John Doe',
                    dueDate: '2025-07-28',
                    tags: ['integration', 'slack'],
                    status: 'todo'
                },
                {
                    id: '2',
                    title: 'Database Migration Script',
                    description: 'Migrate user data to new schema',
                    priority: 'medium',
                    assignee: 'Jane Smith',
                    dueDate: '2025-07-30',
                    tags: ['database', 'migration'],
                    status: 'todo'
                }
            ]
        },
        'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            color: 'blue',
            items: [
                {
                    id: '3',
                    title: 'API Rate Limiting',
                    description: 'Implement rate limiting for external APIs',
                    priority: 'high',
                    assignee: 'Mike Johnson',
                    dueDate: '2025-07-26',
                    tags: ['api', 'security'],
                    status: 'in-progress'
                },
                {
                    id: '4',
                    title: 'Email Automation Flow',
                    description: 'Create automated email sequences',
                    priority: 'medium',
                    assignee: 'Sarah Wilson',
                    dueDate: '2025-07-29',
                    tags: ['email', 'automation'],
                    status: 'in-progress'
                }
            ]
        },
        'review': {
            id: 'review',
            title: 'Review',
            color: 'yellow',
            items: [
                {
                    id: '5',
                    title: 'Security Audit',
                    description: 'Review security implementation',
                    priority: 'high',
                    assignee: 'David Brown',
                    dueDate: '2025-07-27',
                    tags: ['security', 'audit'],
                    status: 'review'
                }
            ]
        },
        'done': {
            id: 'done',
            title: 'Done',
            color: 'green',
            items: [
                {
                    id: '6',
                    title: 'User Authentication',
                    description: 'Implement OAuth 2.0 authentication',
                    priority: 'high',
                    assignee: 'Alice Cooper',
                    dueDate: '2025-07-25',
                    tags: ['auth', 'security'],
                    status: 'done'
                },
                {
                    id: '7',
                    title: 'Dashboard Analytics',
                    description: 'Add analytics tracking to dashboard',
                    priority: 'low',
                    assignee: 'Bob Miller',
                    dueDate: '2025-07-24',
                    tags: ['analytics', 'tracking'],
                    status: 'done'
                }
            ]
        }
    });

    const handleDragStart = (e, item) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, targetColumnId) => {
        e.preventDefault();

        if (!draggedItem) return;

        const sourceColumnId = draggedItem.status;

        if (sourceColumnId === targetColumnId) {
            setDraggedItem(null);
            return;
        }

        setColumns(prevColumns => {
            const newColumns = { ...prevColumns };

            // Remove item from source column
            newColumns[sourceColumnId] = {
                ...newColumns[sourceColumnId],
                items: newColumns[sourceColumnId].items.filter(item => item.id !== draggedItem.id)
            };

            // Add item to target column
            const updatedItem = { ...draggedItem, status: targetColumnId };
            newColumns[targetColumnId] = {
                ...newColumns[targetColumnId],
                items: [...newColumns[targetColumnId].items, updatedItem]
            };

            return newColumns;
        });

        setDraggedItem(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getColumnHeaderColor = (color) => {
        const colors = {
            gray: 'bg-gray-100 dark:bg-gray-700',
            blue: 'bg-blue-100 dark:bg-blue-900/30',
            yellow: 'bg-yellow-100 dark:bg-yellow-900/30',
            green: 'bg-green-100 dark:bg-green-900/30'
        };
        return colors[color] || colors.gray;
    };

    const tabs = [
        { id: 'kanban', label: 'Kanban Board', icon: Kanban },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'table', label: 'Table View', icon: Table },
        { id: 'logs', label: 'Workflow Logs', icon: FileText }
    ];

    const TableView = () => {
        const allItems = Object.values(columns).flatMap(column => column.items);

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {allItems.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'done' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                            item.status === 'in-progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                                item.status === 'review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                            }`}>
                                            {item.status.replace('-', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(item.priority)}`}>
                                            {item.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.assignee}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.dueDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const CalendarView = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
                <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Calendar View</h3>
                <p className="text-gray-500 dark:text-gray-400">Calendar integration coming soon. View and manage your workflow deadlines in calendar format.</p>
            </div>
        </div>
    );

    const LogsView = () => {
        const logs = [
            { id: 1, action: 'Task Created', task: 'Setup Slack Integration', user: 'John Doe', time: '2 minutes ago', status: 'info' },
            { id: 2, action: 'Status Updated', task: 'API Rate Limiting', user: 'Mike Johnson', time: '5 minutes ago', status: 'success' },
            { id: 3, action: 'Task Completed', task: 'User Authentication', user: 'Alice Cooper', time: '1 hour ago', status: 'success' },
            { id: 4, action: 'Error Occurred', task: 'Database Migration', user: 'System', time: '2 hours ago', status: 'error' },
            { id: 5, action: 'Task Assigned', task: 'Security Audit', user: 'Admin', time: '3 hours ago', status: 'info' }
        ];

        const getStatusIcon = (status) => {
            switch (status) {
                case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
                case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
                case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
                default: return <Clock className="w-4 h-4 text-blue-500" />;
            }
        };

        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Workflow Activity Logs</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {logs.map((log) => (
                            <div key={log.id} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex-shrink-0 mt-0.5">
                                    {getStatusIcon(log.status)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {log.action}: {log.task}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        by {log.user} • {log.time}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'kanban':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.values(columns).map((column) => (
                            <div
                                key={column.id}
                                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-fit"
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, column.id)}
                            >
                                <div className={`p-4 rounded-t-xl ${getColumnHeaderColor(column.color)}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{column.title}</h3>
                                        <span className="bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                                            {column.items.length}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-4 space-y-3 min-h-[400px]">
                                    {column.items.map((item) => (
                                        <div
                                            key={item.id}
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, item)}
                                            className="bg-white dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-shadow cursor-move"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">{item.description}</p>

                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {item.tags.map((tag) => (
                                                    <span key={tag} className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(item.priority)}`}>
                                                    {item.priority}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.dueDate}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <User className="w-3 h-3 text-gray-400" />
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">{item.assignee}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <button className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                        <Plus className="w-4 h-4 mx-auto mb-1" />
                                        <span className="text-sm">Add Task</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'calendar':
                return <CalendarView />;
            case 'table':
                return <TableView />;
            case 'logs':
                return <LogsView />;
            default:
                return null;
        }
    };

    return (
        <div className={`transition-all duration-300 dark:bg-gray-900 bg-red-50`}>
            <main>
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <nav className="-mb-px flex space-x-8">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-6">
                        {/* Action Bar */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                                    <Plus className="w-4 h-4" />
                                    <span>New Task</span>
                                </button>
                                <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                                    <Filter className="w-4 h-4" />
                                    <span>Filter</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                                <span>Total Tasks: {Object.values(columns).reduce((acc, col) => acc + col.items.length, 0)}</span>
                                <span>•</span>
                                <span>Completed: {columns.done.items.length}</span>
                            </div>
                        </div>

                        {/* Content Area */}
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;