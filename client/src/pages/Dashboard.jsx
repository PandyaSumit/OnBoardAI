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

    // const getColumnHeaderColor = (color) => {
    //     const colors = {
    //         gray: 'bg-gray-50 dark:bg-gray-700',
    //         blue: 'bg-blue-50 dark:bg-blue-900/20',
    //         yellow: 'bg-yellow-50 dark:bg-yellow-900/20',
    //         green: 'bg-green-50 dark:bg-green-900/20'
    //     };
    //     return colors[color] || colors.gray;
    // };

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
                    <div className="w-full overflow-x-auto pb-4">
                        <div className="flex gap-4 min-w-max px-1">
                            {Object.values(columns).map((column) => (
                                <div
                                    key={column.id}
                                    className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                                    onDragOver={handleDragOver}
                                    onDrop={(e) => handleDrop(e, column.id)}
                                >
                                    {/* Column Header */}
                                    <div className="p-3 border-b border-gray-100 dark:border-gray-700">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${column.color === 'gray' ? 'bg-gray-500' :
                                                        column.color === 'blue' ? 'bg-blue-500' :
                                                            column.color === 'yellow' ? 'bg-yellow-500' :
                                                                'bg-green-500'
                                                    }`}></div>
                                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{column.title}</h3>
                                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-0.5 rounded-full font-medium">
                                                    {column.items.length}
                                                </span>
                                            </div>
                                            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                                                <MoreHorizontal className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Column Content */}
                                    <div className="p-3 space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto custom-scrollbar">
                                        {column.items.map((item) => (
                                            <div
                                                key={item.id}
                                                draggable
                                                onDragStart={(e) => handleDragStart(e, item)}
                                                className="group bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-black/20 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 cursor-move hover:-translate-y-1"
                                            >
                                                {/* Card Header */}
                                                <div className="flex items-start justify-between mb-3">
                                                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-snug flex-1 pr-3">
                                                        {item.title}
                                                    </h4>
                                                    <span className={`text-xs px-2.5 py-1 rounded-full font-semibold flex-shrink-0 ${item.priority === 'high'
                                                            ? 'bg-red-50 text-red-700 border border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' :
                                                            item.priority === 'medium'
                                                                ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20' :
                                                                'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                        }`}>
                                                        {item.priority}
                                                    </span>
                                                </div>

                                                {/* Description */}
                                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                                                    {item.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1.5 mb-4">
                                                    {item.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs px-2.5 py-1 rounded-md font-medium border border-blue-200 dark:border-blue-500/20"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {item.tags.length > 3 && (
                                                        <span className="bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200 dark:border-gray-600">
                                                            +{item.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                            {item.assignee.split(' ').map(n => n[0]).join('')}
                                                        </div>
                                                        <span className="text-gray-700 dark:text-gray-300 font-medium text-sm">
                                                            {item.assignee.split(' ')[0]}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        <span className="text-sm font-medium">
                                                            {new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Add Task Button */}
                                        <button className="w-full p-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all duration-200 group">
                                            <Plus className="w-4 h-4 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm font-medium">Add Task</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
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
        <div className="min-h-screen w-full dark:bg-gray-900">
            {/* Full-width container with no margins/padding constraints */}
            <div className="w-full h-full">
                {/* Navigation Tabs */}
                <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${activeTab === tab.id
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

                {/* Main Content Area */}
                <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-3">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 shadow-sm">
                                    <Plus className="w-4 h-4" />
                                    <span>New Task</span>
                                </button>
                                <button className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center space-x-2">
                                    <Filter className="w-4 h-4" />
                                    <span>Filter</span>
                                </button>
                            </div>

                            <div className="flex items-center space-x-4 text-sm">
                                <span className="text-gray-600 dark:text-gray-400">
                                    Total: <span className="font-semibold text-gray-900 dark:text-white">{Object.values(columns).reduce((acc, col) => acc + col.items.length, 0)}</span>
                                </span>
                                <span className="text-gray-300 dark:text-gray-600">|</span>
                                <span className="text-gray-600 dark:text-gray-400">
                                    Completed: <span className="font-semibold text-green-600 dark:text-green-400">{columns.done.items.length}</span>
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        {renderContent()}
                    </div>
                </div>
            </div>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 0, 0, 0.3);
                }
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Dashboard;