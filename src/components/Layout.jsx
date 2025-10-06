import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function Layout({ user, adminProfile, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar adminProfile={adminProfile} />
      
      {/* Main Content Area */}
      <div className="ml-64">
        {/* Top Navbar */}
        <Navbar user={user} adminProfile={adminProfile} onLogout={onLogout} />
        
        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
