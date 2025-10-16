"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Bed, Users, Menu, X, ChevronRight, LogOut, Settings, Bell } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/'
    },
    {
      id: 'accommodation',
      label: 'Accommodation',
      icon: Bed,
      path: '/accommodation'
    },
    {
      id: 'referral',
      label: 'Referral',
      icon: Users,
      path: '/referral'
    },
    {
      id: 'announcements',
      label: 'announcements',
      icon: Bell,
      path: '/announcements'
    }
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;
    const isActive = pathname === item.path;

    return (
      <Link
        href={item.path}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`} />
        <span className={`font-medium ${!isOpen && 'hidden'}`}>{item.label}</span>
        {isActive && isOpen && (
          <ChevronRight className="w-4 h-4 ml-auto" />
        )}
      </Link>
    );
  };

  return (
    <div 
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen sticky top-0 ${
        isOpen ? 'sm:w-64 w-full' : 'w-20'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-start gap-2">
        <div className={`sm:flex hidden items-center gap-3 ${!isOpen && 'justify-center w-full'}`}>
          <div className="w-10 h-10  bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          {isOpen && (
            <div>
              <h1 className="font-bold text-gray-900">Tathva</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          )}
        </div>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <div>
            {isOpen && (
                
            <div className='flex sm:hidden justify-center items-center gap-4'>
            <div className="w-10 h-10   bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">Tathva</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'}`}>
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border-2 border-blue-500"
          />
          {isOpen && (
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">Alex Johnson</h3>
              <p className="text-xs text-gray-500 truncate">alex@example.com</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <div className={`text-xs font-semibold text-gray-500 uppercase mb-3 ${!isOpen && 'text-center'}`}>
          {isOpen ? 'Menu' : '---'}
        </div>
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <Link 
          href="/settings"
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors ${!isOpen && 'justify-center'}`}
        >
          <Settings className="w-5 h-5 text-gray-600" />
          {isOpen && <span className="font-medium">Settings</span>}
        </Link>
        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors ${!isOpen && 'justify-center'}`}>
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}