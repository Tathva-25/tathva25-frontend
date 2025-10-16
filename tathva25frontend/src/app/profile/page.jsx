"use client"
import { useState, useEffect } from 'react';

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles] = useState([
    { name: 'Riya Patel', role: 'Stage Lead', contact: 'riya@tf.com', events: 3, achievements: 7 },
    { name: 'Sanjay Mehra', role: 'Logistics', contact: 'sanjay@tf.com', events: 5, achievements: 4 },
    { name: 'Maya Singh', role: 'Volunteer Coord', contact: 'maya@tf.com', events: 6, achievements: 12 }
  ]);
  
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Power outage scheduled', category: 'Critical', time: '1h ago', text: 'Temporary power outage on north block between 1-2AM', critical: true },
    { id: 2, title: 'Photo gallery uploaded', category: 'General', time: '3h ago', text: 'Event photos for Day 1 are ready', critical: false },
    { id: 3, title: 'Cafeteria menu updated', category: 'General', time: '6h ago', text: 'Vegetarian options added', critical: false }
  ]);
  
  const [annFilter, setAnnFilter] = useState('All');
  
  const [accommodations] = useState([
    { id: 'Alpha', name: 'Hostel Alpha', wifi: true, ac: true, security: true, capacity: 120, occupancy: 72, coord: { x: 80, y: 60 } },
    { id: 'Sigma', name: 'Guest House Sigma', wifi: true, ac: true, security: true, capacity: 40, occupancy: 20, coord: { x: 360, y: 40 } },
    { id: 'Dorm', name: 'Sport Arena Dorm', wifi: true, ac: false, security: true, capacity: 80, occupancy: 60, coord: { x: 140, y: 140 } },
    { id: 'Delta', name: 'Staff Quarters Delta', wifi: true, ac: true, security: true, capacity: 24, occupancy: 12, coord: { x: 480, y: 120 } },
    { id: 'Beta', name: 'Campsite Beta', wifi: false, ac: false, security: false, capacity: 50, occupancy: 12, coord: { x: 520, y: 40 } }
  ]);
  
  const [bookings, setBookings] = useState([
    { id: 101, name: 'Team A', location: 'Sigma', status: 'Pending', time: 'Today 10:00' },
    { id: 102, name: 'Speaker B', location: 'Alpha', status: 'Approved', time: 'Today 14:00' }
  ]);
  
  const [events, setEvents] = useState([
    { id: 201, title: 'Hackathon Finals', location: 'Main Hall', status: 'Live Now', participants: 180, endAt: Date.now() + 1000 * 60 * 60 * 2 },
    { id: 202, title: 'Robotics Demo', location: 'Stage B', status: 'Upcoming', participants: 60, endAt: Date.now() + 1000 * 60 * 60 * 24 },
    { id: 203, title: 'Coding Workshop', location: 'Room 12', status: 'Completed', participants: 40, endAt: Date.now() - 1000 * 60 * 60 }
  ]);
  
  const [referrals] = useState([
    { id: 1, name: 'Arjun', code: 'REF-ARJ', referred: 12, rewards: 120 },
    { id: 2, name: 'Neha', code: 'REF-NEH', referred: 8, rewards: 80 },
    { id: 3, name: 'Rohit', code: 'REF-ROH', referred: 15, rewards: 150 }
  ]);
  
  const [eventTimers, setEventTimers] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const timers = {};
      events.forEach(e => {
        timers[e.id] = Math.max(0, e.endAt - Date.now());
      });
      setEventTimers(timers);
    }, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const formatCountdown = (ms) => {
    if (ms <= 0) return 'Ended';
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h}h ${m}m ${sec}s`;
  };

  const createAnnouncement = () => {
    const title = prompt('Announcement title:');
    if (!title) return;
    const text = prompt('Message:') || '';
    const critical = confirm('Mark as critical? (OK = Yes)');
    setAnnouncements([{ id: Date.now(), title, category: critical ? 'Critical' : 'General', time: 'Just now', text, critical }, ...announcements]);
  };

  const editAnn = (id) => {
    const ann = announcements.find(a => a.id === id);
    if (!ann) return;
    const t = prompt('Edit title', ann.title);
    if (t) {
      setAnnouncements(announcements.map(a => a.id === id ? { ...a, title: t } : a));
    }
  };

  const removeAnn = (id) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const simulateBookingRequest = () => {
    const names = ['Team X', 'Speaker Z', 'VIP Guest', 'Press Team'];
    const loc = accommodations[Math.floor(Math.random() * accommodations.length)].id;
    const b = { id: Date.now(), name: names[Math.floor(Math.random() * names.length)], location: loc, status: 'Pending', time: 'Tomorrow 09:00' };
    setBookings([b, ...bookings]);
    alert('Simulated booking request added.');
  };

  const updateBooking = (id, status) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  };

  const filteredAnnouncements = annFilter === 'All' || !annFilter ? announcements : announcements.filter(a => annFilter === 'Critical' ? a.critical : a.category === annFilter);
  const filteredProfiles = searchQuery ? profiles.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.role.toLowerCase().includes(searchQuery.toLowerCase())) : profiles;

  const navItems = [
    { page: 'home', label: 'Home', icon: 'fas fa-house' },
    { page: 'announcements', label: 'Announcements', icon: 'fas fa-bullhorn' },
    { page: 'accommodation', label: 'Accommodation', icon: 'fas fa-building' },
    { page: 'events', label: 'Live Events', icon: 'fas fa-calendar-days' },
    { page: 'referrals', label: 'Referrals', icon: 'fas fa-handshake' }
  ];

  return (
    <div className="flex h-screen gap-6 p-5 bg-white text-gray-900">
      {/* SIDEBAR */}
      <aside className={`${collapsed ? 'w-24' : 'w-80'} bg-white rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex gap-2.5 items-center font-bold text-lg tracking-wide">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">T</div>
            {!collapsed && <div className="text-sm">Tathva'25</div>}
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="bg-transparent border-0 p-2 rounded-lg cursor-pointer text-gray-400 hover:bg-gray-100">
            <i className="fas fa-angle-left text-lg"></i>
          </button>
        </div>

        <nav className="flex flex-col gap-2 mt-1">
          {navItems.map(item => (
            <div key={item.page} onClick={() => { setCurrentPage(item.page); setCollapsed(false); }} className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${currentPage === item.page ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-900'}`}>
              <i className={`${item.icon} w-5.5 text-center text-lg`}></i>
              {!collapsed && <div className="font-semibold text-sm">{item.label}</div>}
            </div>
          ))}
        </nav>

        <div className="mt-auto">
          <div onClick={() => { if (confirm('Logout now?')) { alert('You have been logged out (simulated).'); } }} className="p-2.5 rounded-xl cursor-pointer transition-all text-gray-400 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-3">
            <i className="fas fa-right-from-bracket"></i>
            {!collapsed && <div className="font-semibold text-sm">Logout</div>}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col gap-4.5">
        <div className="flex items-center justify-between gap-3">
          <div className="bg-gray-50 p-2.5 rounded-3xl flex items-center gap-2.5 w-1/2 shadow-md">
            <i className="fas fa-magnifying-glass"></i>
            <input placeholder="Search events, members, accommodations..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none flex-1 text-sm" />
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2">
              <div className="font-bold">Becca Kirby</div>
              <div className="text-xs text-gray-500">Chicago, USA</div>
            </div>
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center font-bold text-gray-700">BK</div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* HOME PAGE */}
          {currentPage === 'home' && (
            <section>
              <div className="grid grid-cols-3 gap-4.5 mb-4.5">
                {/* Team Members */}
                <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                  <h3 className="font-semibold text-sm mb-2.5">Team Members</h3>
                  <div className="flex flex-col gap-3">
                    {filteredProfiles.map(p => (
                      <div key={p.name} className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-gray-100">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-700">{p.name.split(' ').map(s => s[0]).slice(0, 2).join('')}</div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">{p.name} <span className="text-xs text-gray-500 font-normal"> — {p.role}</span></h4>
                          <div className="flex gap-2 items-center mt-1.5">
                            <div className="text-xs text-gray-500">{p.contact}</div>
                            <div className="ml-auto flex gap-2 items-center">
                              <div className="text-xs"><i className="fas fa-calendar-days"></i> {p.events}</div>
                              <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-2 py-1 rounded-full text-white text-xs font-bold">{p.achievements}★</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Access */}
                <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                  <h3 className="font-semibold text-sm mb-2.5">Quick Access & Tasks</h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-bold text-sm">Upcoming: Stage Setup</div>
                        <div className="text-xs text-gray-500">Tomorrow 09:00 AM</div>
                      </div>
                      <button onClick={() => alert('Opening task...')} className="border-0 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 py-2 rounded-lg cursor-pointer text-xs">Open</button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <i className="fas fa-circle-check"></i>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs"><div>Volunteer Onboarding</div><div className="text-gray-500">3 left</div></div>
                          <div className="h-2 bg-gray-200 rounded-full mt-1.5 overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-orange-500" style={{width: '60%'}}></div></div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <i className="fas fa-image"></i>
                        <div className="flex-1">
                          <div className="flex justify-between text-xs"><div>Photo Uploads</div><div className="text-gray-500">5 pending</div></div>
                          <div className="h-2 bg-gray-200 rounded-full mt-1.5 overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-orange-500" style={{width: '33%'}}></div></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                  <h3 className="font-semibold text-sm mb-2.5">Summary</h3>
                  <div className="flex gap-3">
                    <div className="flex-1 p-3 rounded-2xl bg-white flex flex-col gap-2">
                      <div className="text-xs text-gray-500">Ongoing Events</div>
                      <div className="text-2xl font-black">8</div>
                      <div className="text-xs text-gray-500">Participants: 920</div>
                    </div>
                    <div className="flex-1 p-3 rounded-2xl bg-white flex flex-col gap-2">
                      <div className="text-xs text-gray-500">Volunteers</div>
                      <div className="text-2xl font-black">52</div>
                      <div className="text-xs text-gray-500">On duty: 34</div>
                    </div>
                    <div className="flex-1 p-3 rounded-2xl bg-white flex flex-col gap-2">
                      <div className="text-xs text-gray-500">Satisfaction</div>
                      <div className="text-2xl font-black">92%</div>
                      <div className="text-xs text-gray-500">Target: 90%</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4.5 grid grid-cols-3 gap-4.5">
                <div className="col-span-2 bg-gray-50 p-4 rounded-3xl shadow-md">
                  <h3 className="font-semibold text-sm mb-2.5">Recent Activities</h3>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between"><div><strong>Stage A:</strong> Soundcheck finished</div><div className="text-xs text-gray-500">2h ago</div></div>
                    <div className="flex justify-between"><div><strong>Guest House Sigma:</strong> New booking request</div><div className="text-xs text-gray-500">3h ago</div></div>
                    <div className="flex justify-between"><div><strong>Volunteer:</strong> Shift assigned</div><div className="text-xs text-gray-500">6h ago</div></div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                  <h3 className="font-semibold text-sm mb-2.5">Announcements Snapshot</h3>
                  <div className="flex flex-col gap-2.5">
                    {announcements.slice(0, 2).map(a => (
                      <div key={a.id} className="flex gap-3 items-start p-2 rounded-lg bg-white border border-gray-100">
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div className="font-semibold text-xs">{a.title}</div>
                            <div className="text-xs text-gray-500">{a.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2.5 flex gap-2 justify-end">
                    <button onClick={() => setCurrentPage('announcements')} className="bg-transparent border border-orange-400 px-3 py-2 rounded-lg cursor-pointer text-orange-400 text-xs">See all</button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ANNOUNCEMENTS PAGE */}
          {currentPage === 'announcements' && (
            <section className="bg-gray-50 p-4 rounded-3xl shadow-md">
              <h3 className="font-semibold text-sm mb-2.5">Announcements</h3>
              <div className="flex gap-3 items-center mb-2.5">
                <input placeholder="Filter by category (All / Critical / General)" value={annFilter} onChange={(e) => setAnnFilter(e.target.value)} className="px-2 py-2 rounded-2xl border border-gray-200 flex-1 text-sm" />
                <button onClick={createAnnouncement} className="bg-gradient-to-r from-orange-400 to-orange-500 border-0 px-3 py-2 rounded-lg text-white cursor-pointer text-sm">Create</button>
              </div>

              <div className="flex flex-col gap-2.5">
                {filteredAnnouncements.map(a => (
                  <div key={a.id} className="flex gap-3 items-start p-3 rounded-2xl bg-white border border-gray-100">
                    <div className={`w-11 h-11 rounded-2xl ${a.critical ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gray-100'} flex items-center justify-center ${a.critical ? 'text-white' : 'text-gray-700'}`}>
                      <i className={a.critical ? 'fas fa-triangle-exclamation' : 'fas fa-info'}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="font-bold text-sm">{a.title}</div>
                        <div className="text-xs text-gray-500">{a.time}</div>
                      </div>
                      <div className="mt-1.5 text-xs text-gray-500">{a.text}</div>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                      {a.critical && <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-2 py-1 rounded-lg text-white text-xs font-bold">CRITICAL</div>}
                      <div className="flex gap-2">
                        <button onClick={() => editAnn(a.id)} className="border-0 bg-transparent cursor-pointer text-xs hover:text-gray-700"><i className="fas fa-pen"></i></button>
                        <button onClick={() => removeAnn(a.id)} className="border-0 bg-transparent cursor-pointer text-red-600 text-xs"><i className="fas fa-trash"></i></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ACCOMMODATION PAGE */}
          {currentPage === 'accommodation' && (
            <section className="grid grid-cols-3 gap-4.5">
              <div className="col-span-2 bg-gray-50 p-4 rounded-3xl shadow-md">
                <h3 className="font-semibold text-sm mb-2.5">Accommodation Map & Availability</h3>
                <div className="border-2 border-dashed border-gray-200 h-56 rounded-2xl flex items-center justify-center bg-white">
                  <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
                    <rect x="0" y="0" width="600" height="200" fill="#fff" opacity="0" />
                    {accommodations.map(a => (
                      <g key={a.id}>
                        <circle cx={a.coord.x} cy={a.coord.y} r="8" fill={a.occupancy / a.capacity > 0.8 ? '#d97706' : '#0ea5a5'} />
                        <text x={a.coord.x + 12} y={a.coord.y + 4} fontSize="11" fill="#333">{a.id}</text>
                      </g>
                    ))}
                  </svg>
                </div>

                <div className="mt-3 flex flex-col gap-2.5">
                  {accommodations.map(a => (
                    <div key={a.id} className="flex justify-between items-center p-2.5 rounded-2xl bg-white border border-gray-100">
                      <div>
                        <div className="font-bold text-sm">{a.name}</div>
                        <div className="text-xs text-gray-500 mt-1.5">
                          WiFi: {a.wifi ? 'Yes' : 'No'} • AC: {a.ac ? 'Yes' : 'No'} • Security: {a.security ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-bold text-sm">{a.occupancy}/{a.capacity}</div>
                        <div className="w-40 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: `${Math.round((a.occupancy / a.capacity) * 100)}%` }}></div></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                <h3 className="font-semibold text-sm mb-2.5">Booking Requests</h3>
                <div className="flex flex-col gap-2">
                  {bookings.map(b => (
                    <div key={b.id} className="flex justify-between items-center p-2.5 rounded-2xl bg-white border border-gray-100">
                      <div>
                        <div className="font-bold text-sm">{b.name}</div>
                        <div className="text-xs text-gray-500">{b.location} • {b.time}</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="font-bold text-xs" style={{ color: b.status === 'Approved' ? 'green' : (b.status === 'Pending' ? '#b8860b' : '#888') }}>{b.status}</div>
                        <div className="flex gap-1.5">
                          <button onClick={() => updateBooking(b.id, 'Approved')} className="border-0 bg-gradient-to-r from-orange-400 to-orange-500 text-white px-2 py-1 rounded-lg cursor-pointer text-xs">Approve</button>
                          <button onClick={() => updateBooking(b.id, 'Rejected')} className="border-0 bg-gray-200 px-2 py-1 rounded-lg cursor-pointer text-xs">Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3">
                  <button onClick={simulateBookingRequest} className="px-3 py-2 rounded-lg border border-orange-400 bg-transparent text-orange-400 cursor-pointer text-xs">Simulate Booking</button>
                </div>
              </div>
            </section>
          )}

          {/* LIVE EVENTS PAGE */}
          {currentPage === 'events' && (
            <section className="bg-gray-50 p-4 rounded-3xl shadow-md">
              <h3 className="font-semibold text-sm mb-2.5">Live Events</h3>
              <div className="grid grid-cols-2 gap-3">
                {events.map(e => (
                  <div key={e.id} className="p-3 rounded-2xl bg-white border border-gray-100 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm">{e.title}</div>
                      <div className="text-xs" style={{ color: e.status === 'Live Now' ? '#9b2c2c' : 'inherit' }}>{e.status}</div>
                    </div>
                    <div className="text-xs text-gray-500">{e.location} • {e.participants} participants</div>
                    <div className="flex items-center gap-2 mt-auto">
                      <div className="flex-1">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-orange-400 to-orange-500" style={{ width: `${Math.min(100, (e.participants / 200) * 100)}%` }}></div></div>
                      </div>
                      <div className="font-bold text-xs min-w-fit text-right">{formatCountdown(eventTimers[e.id] || 0)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* REFERRALS PAGE */}
          {currentPage === 'referrals' && (
            <section className="grid grid-cols-3 gap-4.5">
              <div className="col-span-2 bg-gray-50 p-4 rounded-3xl shadow-md">
                <h3 className="font-semibold text-sm mb-2.5">Referrals & Tracker</h3>
                <p className="text-xs text-gray-500 mb-2">Use referral codes to recruit volunteers. Track status & rewards below.</p>
                <div className="flex flex-col gap-2.5">
                  {referrals.map(r => (
                    <div key={r.id} className="flex justify-between items-center p-2.5 rounded-2xl bg-white border border-gray-100">
                      <div>
                        <div className="font-bold text-sm">{r.name}</div>
                        <div className="text-xs text-gray-500 mt-1">Code: <strong>{r.code}</strong></div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-bold text-sm">{r.referred} referred</div>
                        <div className="text-xs text-gray-500">Rewards: {r.rewards} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-3xl shadow-md">
                <h3 className="font-semibold text-sm mb-2.5">Leaderboard</h3>
                <div className="flex flex-col gap-2">
                  {[...referrals].sort((a, b) => b.referred - a.referred).map((r, idx) => (
                    <div key={r.id} className="flex justify-between items-center p-2.5 rounded-2xl bg-white border border-gray-100">
                      <div className="flex gap-3 items-center">
                        <div className="w-11 h-11 rounded-2xl bg-gray-200 flex items-center justify-center font-bold text-gray-700">{r.name.split(' ').map(s => s[0]).slice(0, 2).join('')}</div>
                        <div>
                          <div className="font-bold text-sm">{r.name}</div>
                          <div className="text-xs text-gray-500">Referred: {r.referred}</div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        {idx === 0 && <div className="gold-gradient px-2 py-1 rounded-lg text-white text-xs font-bold"><i className="fas fa-trophy"></i></div>}
                        <div className="font-bold text-sm">{r.rewards} pts</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}