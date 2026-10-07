import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { bookingApi, AdminOverviewData, Booking, GamingResource } from '../services/bookingApi';
import {
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  Users,
  Clock,
  DollarSign,
  Gamepad2,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
  Filter,
  Check,
  Phone,
  ArrowRight,
  Lock,
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageRoute) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  // Passcode authentication
  const [passcode, setPasscode] = useState<string>(() => localStorage.getItem('giocasa_admin_passcode') || '');
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Dashboard Data
  const [overview, setOverview] = useState<AdminOverviewData | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [resources, setResources] = useState<GamingResource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [resourceFilter, setResourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Manual Booking Modal
  const [showManualModal, setShowManualModal] = useState<boolean>(false);
  const [manualForm, setManualForm] = useState({
    customerName: '',
    phone: '',
    resourceId: '',
    date: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }),
    startTime: '14:00',
    durationMinutes: 60,
    numberOfPeople: 2,
    paymentStatus: 'paid',
    notes: 'Walk-in guest',
  });
  const [manualSubmitting, setManualSubmitting] = useState<boolean>(false);
  const [manualError, setManualError] = useState<string | null>(null);

  // Attempt login with stored passcode or verify
  useEffect(() => {
    if (passcode) {
      loadDashboard(passcode);
    }
  }, [passcode]);

  const loadDashboard = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const [ovData, bkData, resData] = await Promise.all([
        bookingApi.getAdminOverview(code),
        bookingApi.getAdminBookings(code),
        bookingApi.getResources(),
      ]);

      setOverview(ovData);
      setBookings(bkData);
      setResources(resData);
      setIsAuthenticated(true);
      localStorage.setItem('giocasa_admin_passcode', code);
    } catch (err: any) {
      setIsAuthenticated(false);
      setAuthError('Invalid Admin Passcode. Default is GIOCASA2026.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcodeInput.trim()) return;
    setPasscode(passcodeInput.trim());
    loadDashboard(passcodeInput.trim());
  };

  // Toggle Resource Maintenance
  const handleToggleMaintenance = async (resource: GamingResource) => {
    const nextState = !resource.isMaintenance;
    const reason = nextState ? window.prompt('Enter reason for maintenance (e.g. Controller servicing):', 'Routine equipment servicing') || 'Maintenance' : undefined;

    try {
      await bookingApi.toggleResourceMaintenance(passcode, resource.id, nextState, reason);
      loadDashboard(passcode);
    } catch (err: any) {
      alert(err.message || 'Failed to update maintenance state.');
    }
  };

  // Update Booking Status
  const handleUpdateBookingStatus = async (bookingId: string, status: string) => {
    try {
      await bookingApi.updateAdminBooking(passcode, bookingId, { status: status as any });
      loadDashboard(passcode);
    } catch (err: any) {
      alert(err.message || 'Failed to update status.');
    }
  };

  // Toggle Payment Status
  const handleTogglePayment = async (booking: Booking) => {
    const nextStatus = booking.paymentStatus === 'paid' ? 'unpaid' : 'paid';
    try {
      await bookingApi.updateAdminBooking(passcode, booking.id, { paymentStatus: nextStatus });
      loadDashboard(passcode);
    } catch (err: any) {
      alert(err.message || 'Failed to update payment status.');
    }
  };

  // Extend Booking
  const handleExtend = async (bookingId: string, mins: number) => {
    try {
      await bookingApi.extendBooking(bookingId, mins);
      loadDashboard(passcode);
    } catch (err: any) {
      alert(err.message || 'Could not extend booking.');
    }
  };

  // Submit Manual Booking
  const handleCreateManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.customerName || !manualForm.phone || !manualForm.resourceId) {
      setManualError('Please fill in all required fields.');
      return;
    }

    setManualSubmitting(true);
    setManualError(null);
    try {
      await bookingApi.createManualBooking(passcode, manualForm);
      setShowManualModal(false);
      setManualForm({
        customerName: '',
        phone: '',
        resourceId: resources[0]?.id || '',
        date: new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' }),
        startTime: '14:00',
        durationMinutes: 60,
        numberOfPeople: 2,
        paymentStatus: 'paid',
        notes: 'Walk-in guest',
      });
      loadDashboard(passcode);
    } catch (err: any) {
      setManualError(err.message || 'Slot conflict or server error.');
    } finally {
      setManualSubmitting(false);
    }
  };

  // Filter Bookings
  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (resourceFilter !== 'all' && b.resourceId !== resourceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.customerName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Format 24h to 12h
  const formatTime12 = (t: string) => {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH}:${String(m || 0).padStart(2, '0')} ${period}`;
  };

  // IF NOT AUTHENTICATED -> SHOW PASSCODE SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-brand-surface border border-brand-border rounded-3xl p-8 shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-terracotta/20 text-brand-terracotta border border-brand-terracotta/40 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h1 className="font-serif text-2xl font-bold text-brand-cream">
              GioCasa Operations Gate
            </h1>
            <p className="text-xs text-brand-subtle mt-1">
              Enter staff passcode to access live gaming station management.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              required
              placeholder="Admin Passcode (Default: GIOCASA2026)"
              value={passcodeInput}
              onChange={(e) => setPasscodeInput(e.target.value)}
              className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-4 py-3 text-center text-brand-cream font-mono text-sm tracking-widest focus:outline-none focus:border-brand-terracotta"
            />

            {authError && (
              <p className="text-xs text-red-400 font-mono">{authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-full bg-brand-terracotta hover:bg-brand-terracottaHover text-brand-cream font-bold text-xs uppercase tracking-wider transition-all shadow-luxury-ember"
            >
              {loading ? 'Verifying...' : 'Unlock Operations Hub'}
            </button>
          </form>

          <button
            onClick={() => onNavigate('home')}
            className="text-xs text-brand-subtle hover:text-brand-cream block mx-auto underline pt-2"
          >
            ← Back to GioCasa Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-brand-border/60">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand-surface border border-brand-gold/40 text-[10px] font-mono text-brand-gold font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ARENA OPS • IST</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-cream mt-1">
              Gaming Operations Dashboard
            </h1>
            <p className="text-xs text-brand-subtle">
              Date: <strong className="text-brand-cream">{overview?.date}</strong> • Time: <strong className="text-brand-gold">{overview?.currentTime} IST</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadDashboard(passcode)}
              className="px-4 py-2 rounded-xl bg-brand-surface border border-brand-border text-brand-subtle hover:text-brand-cream text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                if (resources.length > 0 && !manualForm.resourceId) {
                  setManualForm((prev) => ({ ...prev, resourceId: resources[0].id }));
                }
                setShowManualModal(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-brand-terracotta hover:bg-brand-terracottaHover text-brand-cream text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-luxury-ember"
            >
              <Plus className="w-4 h-4" />
              <span>Manual Walk-in</span>
            </button>
          </div>
        </div>

        {/* 1. TODAY'S OVERVIEW METRICS (Requirement 22) */}
        {overview && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-1 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-subtle">Playing Now</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-amber-400">
                  {overview.metrics.playingNow}
                </span>
                <span className="text-xs text-amber-500/80 font-mono">Active Stations</span>
              </div>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-1 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-subtle">Upcoming Today</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-brand-gold">
                  {overview.metrics.upcoming}
                </span>
                <span className="text-xs text-brand-subtle font-mono">Reserved</span>
              </div>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-1 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-subtle">Completed Today</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-emerald-400">
                  {overview.metrics.completed}
                </span>
                <span className="text-xs text-emerald-500/80 font-mono">Sessions Finished</span>
              </div>
            </div>

            <div className="bg-brand-surface border border-brand-border rounded-2xl p-5 space-y-1 shadow-lg">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-subtle">Today's Revenue</span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-3xl font-bold text-brand-terracotta">
                  ₹{overview.metrics.revenue}
                </span>
                <span className="text-xs text-brand-subtle font-mono">Est. Gaming</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. LIVE GAMING STATION STATUS GRID (Requirement 8 & 22) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-brand-cream">
              Live Station Status & Maintenance
            </h2>
            <span className="text-xs text-brand-subtle font-mono">
              Click "Set Maintenance" to immediately block customer bookings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {overview?.liveStations.map((station) => {
              const matchedResource = resources.find((r) => r.id === station.id);

              return (
                <div
                  key={station.id}
                  className={`rounded-2xl border p-5 flex flex-col justify-between transition-all ${
                    station.status === 'playing'
                      ? 'bg-amber-950/20 border-amber-600/60 shadow-lg'
                      : station.status === 'maintenance'
                      ? 'bg-stone-900/60 border-red-900/50 opacity-75'
                      : station.status === 'reserved'
                      ? 'bg-brand-surfaceElevated border-brand-gold/40'
                      : 'bg-brand-surface border-brand-border'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-lg font-bold text-brand-cream">
                        {station.name}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                          station.status === 'playing'
                            ? 'bg-amber-500 text-brand-dark animate-pulse'
                            : station.status === 'reserved'
                            ? 'bg-brand-gold/20 text-brand-gold border border-brand-gold/40'
                            : station.status === 'maintenance'
                            ? 'bg-red-900 text-red-200'
                            : 'bg-emerald-950 text-emerald-400 border border-emerald-600'
                        }`}
                      >
                        {station.statusLabel}
                      </span>
                    </div>

                    {/* Active session info */}
                    {station.currentBooking && (
                      <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs space-y-1">
                        <div className="flex justify-between text-amber-200 font-semibold">
                          <span>{station.currentBooking.customerName}</span>
                          <span className="font-mono">Until {formatTime12(station.currentBooking.endTime)}</span>
                        </div>
                        <span className="text-[10px] text-amber-400/80 font-mono block">
                          Phone: {station.currentBooking.phone}
                        </span>
                      </div>
                    )}

                    {/* Next upcoming info */}
                    {station.nextBooking && (
                      <div className="p-3 rounded-xl bg-brand-dark border border-brand-border/60 text-xs space-y-1">
                        <div className="flex justify-between text-brand-cream">
                          <span>Next: {station.nextBooking.customerName}</span>
                          <span className="font-mono text-brand-gold">{formatTime12(station.nextBooking.startTime)}</span>
                        </div>
                      </div>
                    )}

                    {station.status === 'maintenance' && (
                      <p className="text-xs text-red-300 font-mono">
                        Reason: {station.reason || 'Under Service'}
                      </p>
                    )}
                  </div>

                  {/* Maintenance Toggle Button */}
                  <div className="pt-4 mt-3 border-t border-brand-border/40 flex items-center justify-between text-xs">
                    <span className="font-mono text-brand-subtle">
                      Rate: ₹{matchedResource?.ratePerHour}/hr
                    </span>

                    {matchedResource && (
                      <button
                        onClick={() => handleToggleMaintenance(matchedResource)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-[11px] font-bold transition-colors ${
                          matchedResource.isMaintenance
                            ? 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900 border border-emerald-600'
                            : 'bg-red-950/60 text-red-400 hover:bg-red-900 border border-red-800'
                        }`}
                      >
                        {matchedResource.isMaintenance ? 'Restore Active' : 'Set Maintenance'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. BOOKINGS MANAGEMENT TABLE (Requirement 7 & 22) */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-brand-cream">
                All Bookings & Slot Control
              </h2>
              <p className="text-xs text-brand-subtle">
                Showing {filteredBookings.length} total bookings
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-brand-subtle absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search name, phone, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-brand-surface border border-brand-border rounded-xl pl-9 pr-3 py-1.5 text-xs text-brand-cream font-mono focus:outline-none focus:border-brand-terracotta"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-brand-surface border border-brand-border rounded-xl px-3 py-1.5 text-xs text-brand-cream font-mono focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active (Playing)</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Resource Filter */}
              <select
                value={resourceFilter}
                onChange={(e) => setResourceFilter(e.target.value)}
                className="bg-brand-surface border border-brand-border rounded-xl px-3 py-1.5 text-xs text-brand-cream font-mono focus:outline-none"
              >
                <option value="all">All Equipment</option>
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-surfaceElevated border-b border-brand-border font-mono text-brand-subtle uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">ID / Customer</th>
                    <th className="p-3.5">Equipment</th>
                    <th className="p-3.5">Date & Time</th>
                    <th className="p-3.5">Duration</th>
                    <th className="p-3.5">Amount / Pay</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 font-mono">
                  {filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-brand-subtle font-sans">
                        No bookings match your current filter.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-brand-surfaceElevated/50 transition-colors">
                        <td className="p-3.5">
                          <span className="font-bold text-brand-gold">{b.id}</span>
                          <span className="font-sans font-semibold text-brand-cream block">{b.customerName}</span>
                          <span className="text-[10px] text-brand-subtle">{b.phone}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-sans font-medium text-brand-cream">{b.resourceName}</span>
                          <span className="text-[10px] text-brand-subtle block">{b.numberOfPeople} Players</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-brand-cream">{b.date}</span>
                          <span className="text-brand-gold block font-bold">
                            {formatTime12(b.startTime)} – {formatTime12(b.endTime)}
                          </span>
                        </td>
                        <td className="p-3.5 text-brand-cream">{b.durationMinutes} mins</td>
                        <td className="p-3.5">
                          <span className="font-bold text-brand-gold">₹{b.totalAmount}</span>
                          <button
                            onClick={() => handleTogglePayment(b)}
                            className={`text-[9px] font-bold uppercase tracking-wider block mt-0.5 px-1.5 py-0.5 rounded ${
                              b.paymentStatus === 'paid'
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                                : 'bg-red-950 text-red-400 border border-red-700'
                            }`}
                          >
                            {b.paymentStatus}
                          </button>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              b.status === 'active'
                                ? 'bg-amber-950 text-amber-300 border border-amber-600 animate-pulse'
                                : b.status === 'confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600'
                                : b.status === 'completed'
                                ? 'bg-stone-900 text-stone-400'
                                : 'bg-red-950 text-red-400'
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1.5">
                          {b.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'active')}
                              title="Mark customer as playing right now"
                              className="px-2 py-1 rounded bg-amber-950 border border-amber-700 text-amber-300 hover:bg-amber-900 text-[10px]"
                            >
                              Start Play
                            </button>
                          )}

                          {b.status === 'active' && (
                            <button
                              onClick={() => handleUpdateBookingStatus(b.id, 'completed')}
                              title="Mark session as completed"
                              className="px-2 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 hover:bg-emerald-900 text-[10px]"
                            >
                              Complete
                            </button>
                          )}

                          {(b.status === 'confirmed' || b.status === 'active') && (
                            <>
                              <button
                                onClick={() => handleExtend(b.id, 30)}
                                title="Extend by 30 mins"
                                className="px-2 py-1 rounded bg-brand-surfaceElevated border border-brand-border text-brand-gold hover:bg-brand-surface text-[10px]"
                              >
                                +30m
                              </button>

                              <button
                                onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')}
                                title="Cancel booking"
                                className="px-2 py-1 rounded text-red-400 hover:text-red-300 text-[10px]"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 4. MANUAL BOOKING MODAL */}
        {showManualModal && (
          <div className="fixed inset-0 z-50 bg-brand-dark/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-brand-surface border border-brand-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                <h3 className="font-serif text-xl font-bold text-brand-cream">
                  Manual Walk-in / Phone Booking
                </h3>
                <button
                  onClick={() => setShowManualModal(false)}
                  className="text-brand-subtle hover:text-brand-cream"
                >
                  ✕
                </button>
              </div>

              {manualError && (
                <div className="p-3 rounded-xl bg-red-950 border border-red-700 text-xs text-red-200">
                  {manualError}
                </div>
              )}

              <form onSubmit={handleCreateManualBooking} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-brand-subtle block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerName}
                    onChange={(e) => setManualForm({ ...manualForm, customerName: e.target.value })}
                    className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3.5 py-2.5 text-brand-cream"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-brand-subtle block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={manualForm.phone}
                      onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
                      className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3.5 py-2.5 text-brand-cream font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-brand-subtle block mb-1">Resource Station *</label>
                    <select
                      value={manualForm.resourceId}
                      onChange={(e) => setManualForm({ ...manualForm, resourceId: e.target.value })}
                      className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3.5 py-2.5 text-brand-cream"
                    >
                      {resources.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-brand-subtle block mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={manualForm.date}
                      onChange={(e) => setManualForm({ ...manualForm, date: e.target.value })}
                      className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3 py-2 text-brand-cream font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-brand-subtle block mb-1">Start Time (24h)</label>
                    <input
                      type="time"
                      required
                      value={manualForm.startTime}
                      onChange={(e) => setManualForm({ ...manualForm, startTime: e.target.value })}
                      className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3 py-2 text-brand-cream font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-brand-subtle block mb-1">Duration</label>
                    <select
                      value={manualForm.durationMinutes}
                      onChange={(e) => setManualForm({ ...manualForm, durationMinutes: Number(e.target.value) })}
                      className="w-full bg-brand-surfaceElevated border border-brand-border rounded-xl px-3 py-2 text-brand-cream"
                    >
                      <option value={30}>30m</option>
                      <option value={60}>1 hour</option>
                      <option value={90}>1.5 hrs</option>
                      <option value={120}>2 hrs</option>
                      <option value={180}>3 hrs</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowManualModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-brand-border text-brand-subtle"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={manualSubmitting}
                    className="px-6 py-2.5 rounded-xl bg-brand-terracotta text-brand-cream font-bold uppercase tracking-wider"
                  >
                    {manualSubmitting ? 'Creating...' : 'Create Booking'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
