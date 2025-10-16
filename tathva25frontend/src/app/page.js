"use client"
import React, { useState } from 'react';
import { Calendar, Trophy, Users, BookOpen, Bell, Settings, Search, Filter, Download, Plus, Clock, MapPin, Award, TrendingUp, BarChart3, Grid, List } from 'lucide-react';

export default function ProfileDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    joinedDate: "January 2024",
    stats: {
      workshops: 12,
      events: 8,
      competitions: 5,
      activityPoints: 1250
    }
  };

  // Mock data
  const workshops = [
    { id: 1, title: "Advanced React Patterns", date: "2025-10-20", time: "10:00 AM", instructor: "Sarah Chen", status: "upcoming", category: "workshop", progress: 0, location: "Online", participants: 45 },
    { id: 2, title: "UI/UX Design Fundamentals", date: "2025-09-15", time: "2:00 PM", instructor: "Mike Ross", status: "completed", category: "workshop", progress: 100, location: "Room 301", participants: 32 },
    { id: 3, title: "GraphQL & Apollo", date: "2025-10-25", time: "3:00 PM", instructor: "Emma Wilson", status: "upcoming", category: "workshop", progress: 0, location: "Online", participants: 28 }
  ];

  const events = [
    { id: 4, title: "Tech Conference 2025", date: "2025-11-05", time: "9:00 AM", status: "registered", category: "event", location: "Convention Center", attendees: 500 },
    { id: 5, title: "Networking Mixer", date: "2025-09-30", time: "6:00 PM", status: "completed", category: "event", location: "Tech Hub", attendees: 80 },
    { id: 6, title: "Product Launch Event", date: "2025-10-18", time: "5:00 PM", status: "registered", category: "event", location: "Grand Hall", attendees: 200 }
  ];

  const competitions = [
    { id: 7, title: "Hackathon 2025", date: "2025-11-15", prize: "$5,000", status: "registered", category: "competition", rank: null, participants: 150 },
    { id: 8, title: "Code Challenge", date: "2025-08-20", prize: "$2,000", status: "completed", category: "competition", rank: 3, participants: 200 },
    { id: 9, title: "Design Sprint", date: "2025-10-30", prize: "$3,000", status: "ongoing", category: "competition", rank: null, participants: 75 }
  ];

  const allItems = [...workshops, ...events, ...competitions];

  const getFilteredItems = () => {
    let items = allItems;
    
    if (activeTab !== 'all') {
      items = items.filter(item => item.category === activeTab);
    }
    
    if (searchQuery) {
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return items;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'ongoing': return 'bg-orange-100 text-orange-700';
      case 'registered': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold mt-2 text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const ItemCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            {item.instructor && (
              <p className="text-sm text-gray-600 mt-1">by {item.instructor}</p>
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
          {item.time && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              {item.time}
            </div>
          )}
          {item.location && (
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {item.location}
            </div>
          )}
        </div>

        {item.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{item.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        )}

        {item.prize && (
          <div className="flex items-center text-sm text-green-600 font-medium mb-2">
            <Trophy className="w-4 h-4 mr-2" />
            Prize: {item.prize}
          </div>
        )}

        {item.rank && (
          <div className="flex items-center text-sm text-yellow-600 font-medium mb-2">
            <Award className="w-4 h-4 mr-2" />
            Rank: #{item.rank}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-1" />
            {item.participants || item.attendees} participants
          </div>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );

  const ItemListView = ({ item }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all p-4 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
            {item.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {item.location}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View →
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={userData.avatar} 
                alt="Profile" 
                className="w-12 h-12 rounded-full border-2 border-blue-500"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">{userData.name}</h1>
                <p className="text-sm text-gray-600">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            icon={BookOpen} 
            label="Workshops" 
            value={userData.stats.workshops} 
            color="bg-blue-500"
          />
          <StatCard 
            icon={Calendar} 
            label="Events" 
            value={userData.stats.events} 
            color="bg-purple-500"
          />
          <StatCard 
            icon={Trophy} 
            label="Competitions" 
            value={userData.stats.competitions} 
            color="bg-orange-500"
          />
          <StatCard 
            icon={Award} 
            label="Certificates" 
            value={userData.stats.certificates} 
            color="bg-green-500"
          />
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('workshop')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'workshop' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Workshops
              </button>
              <button
                onClick={() => setActiveTab('event')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'event' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Events
              </button>
              <button
                onClick={() => setActiveTab('competition')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'competition' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Competitions
              </button>
            </div>

            <div className="flex gap-2 items-center w-full lg:w-auto">
              <div className="relative flex-1 lg:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                {viewMode === 'grid' ? <List className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Items Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredItems().map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredItems().map(item => (
              <ItemListView key={item.id} item={item} />
            ))}
          </div>
        )}

        {getFilteredItems().length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-600">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}