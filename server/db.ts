import { MongoClient, Db, Collection } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config';
import { Booking, GamingResource, AdminBookingFilter } from './types';
import { timeToMinutes, doIntervalsOverlap, getNowInKolkata } from './utils/timezone';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, 'data');

// Initial default resources based on GioCasa gamingData.ts
export const INITIAL_RESOURCES: GamingResource[] = [
  {
    id: 'ps5-station-1',
    name: 'PS5 Pro Station 1 (4K 120Hz)',
    category: 'ps5',
    zoneId: 'ps5-arena',
    ratePerHour: 149,
    minDurationMinutes: 30,
    maxDurationMinutes: 180,
    playersCapacity: { min: 1, max: 4 },
    active: true,
    isMaintenance: false,
    specs: ['PlayStation 5 Console', '55" 4K HDR 120Hz Display', '2 DualSense Controllers', 'EA FC 25, Tekken 8, MK1'],
    image: '/assets/real/ps5_setup.png',
    order: 1,
  },
  {
    id: 'ps5-station-2',
    name: 'PS5 Pro Station 2 (4K 120Hz)',
    category: 'ps5',
    zoneId: 'ps5-arena',
    ratePerHour: 149,
    minDurationMinutes: 30,
    maxDurationMinutes: 180,
    playersCapacity: { min: 1, max: 4 },
    active: true,
    isMaintenance: false,
    specs: ['PlayStation 5 Console', '55" 4K HDR 120Hz Display', '2 DualSense Controllers', 'Spider-Man 2, Gran Turismo 7, GTA V'],
    image: '/assets/real/ps5_setup.png',
    order: 2,
  },
  {
    id: 'ps5-station-3',
    name: 'PS5 Pro Station 3 (Squad Lounge)',
    category: 'ps5',
    zoneId: 'ps5-arena',
    ratePerHour: 149,
    minDurationMinutes: 30,
    maxDurationMinutes: 180,
    playersCapacity: { min: 1, max: 4 },
    active: true,
    isMaintenance: false,
    specs: ['PlayStation 5 Console', '55" 4K HDR 120Hz Display', '4 DualSense Controllers', 'It Takes Two, WWE 2K24, Co-op Vault'],
    image: '/assets/real/ps5_setup.png',
    order: 3,
  },
  {
    id: 'pool-table-1',
    name: 'Hot-Shot 8-Ball Slate Championship Pool',
    category: 'pool',
    zoneId: 'hotshot-pool',
    ratePerHour: 199,
    minDurationMinutes: 30,
    maxDurationMinutes: 180,
    playersCapacity: { min: 2, max: 6 },
    active: true,
    isMaintenance: false,
    specs: ['Italian Slate Bed', 'Aramith Pro Ball Set', 'Precision Ash Cues', 'Spectator Lounge Seating'],
    image: '/assets/real/pool_table.png',
    order: 4,
  },
];

class DatabaseService {
  private client: MongoClient | null = null;
  private db: Db | null = null;
  private isMongoConnected = false;
  private mutexLock = new Map<string, Promise<any>>();

  // Fallback in-memory and file store
  private fileBookings: Booking[] = [];
  private fileResources: GamingResource[] = [...INITIAL_RESOURCES];
  private bookingsFilePath = path.join(DATA_DIR, 'bookings.json');
  private resourcesFilePath = path.join(DATA_DIR, 'resources.json');
  private settingsFilePath = path.join(DATA_DIR, 'settings.json');
  private cachedAdminPasscode: string | null = null;

  async init(): Promise<void> {
    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Load file-backed stores
    this.loadFileStores();

    // Try connecting to MongoDB Atlas if URI is provided
    if (config.mongoUri) {
      try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        this.client = new MongoClient(config.mongoUri, {
          serverSelectionTimeoutMS: 5000,
        });
        await this.client.connect();
        this.db = this.client.db(config.dbName);
        this.isMongoConnected = true;
        console.log(`✅ Successfully connected to MongoDB Atlas (DB: ${config.dbName})`);

        // Create indexes
        const bookingsCol = this.db.collection<Booking>('bookings');
        await bookingsCol.createIndex({ id: 1 }, { unique: true });
        await bookingsCol.createIndex({ resourceId: 1, date: 1, startTime: 1, endTime: 1 });
        await bookingsCol.createIndex({ phone: 1 });
        await bookingsCol.createIndex({ status: 1 });

        const resourcesCol = this.db.collection<GamingResource>('resources');
        await resourcesCol.createIndex({ id: 1 }, { unique: true });

        // Seed or sync active resources
        for (const res of INITIAL_RESOURCES) {
          await resourcesCol.updateOne(
            { id: res.id },
            { $set: res },
            { upsert: true }
          );
        }
        const validIds = INITIAL_RESOURCES.map((r) => r.id);
        await resourcesCol.updateMany(
          { id: { $nin: validIds } },
          { $set: { active: false } }
        );
        console.log(`🌱 Synced ${INITIAL_RESOURCES.length} active gaming resources in MongoDB Atlas.`);
      } catch (err) {
        console.warn('⚠️ MongoDB Atlas connection failed or timed out. Falling back to persistent disk store.', err);
        this.isMongoConnected = false;
      }
    } else {
      console.log('ℹ️ MONGODB_URI not provided. Operating in robust local persistent file-store mode.');
    }
  }

  private loadFileStores(): void {
    try {
      if (fs.existsSync(this.resourcesFilePath)) {
        const raw = fs.readFileSync(this.resourcesFilePath, 'utf-8');
        const parsed: GamingResource[] = JSON.parse(raw);
        const validIds = new Set(INITIAL_RESOURCES.map((r) => r.id));
        this.fileResources = [
          ...INITIAL_RESOURCES,
          ...parsed.filter((p) => !validIds.has(p.id)).map((p) => ({ ...p, active: false }))
        ];
        this.saveResourcesToFile();
      } else {
        this.fileResources = [...INITIAL_RESOURCES];
        this.saveResourcesToFile();
      }

      if (fs.existsSync(this.bookingsFilePath)) {
        const raw = fs.readFileSync(this.bookingsFilePath, 'utf-8');
        this.fileBookings = JSON.parse(raw);
      } else {
        this.fileBookings = [];
        this.saveBookingsToFile();
      }
    } catch (err) {
      console.error('Error reading fallback JSON stores:', err);
      this.fileResources = [...INITIAL_RESOURCES];
      this.fileBookings = [];
    }
  }

  private saveResourcesToFile(): void {
    try {
      fs.writeFileSync(this.resourcesFilePath, JSON.stringify(this.fileResources, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving resources to file:', err);
    }
  }

  private saveBookingsToFile(): void {
    try {
      fs.writeFileSync(this.bookingsFilePath, JSON.stringify(this.fileBookings, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving bookings to file:', err);
    }
  }

  // Mutex wrapper to prevent race conditions on resource bookings
  private async acquireLock<T>(key: string, task: () => Promise<T>): Promise<T> {
    while (this.mutexLock.has(key)) {
      await this.mutexLock.get(key);
    }
    let resolveLock!: () => void;
    const promise = new Promise<void>((resolve) => {
      resolveLock = resolve;
    });
    this.mutexLock.set(key, promise);
    try {
      return await task();
    } finally {
      this.mutexLock.delete(key);
      resolveLock();
    }
  }

  // ======================== RESOURCES ========================

  async getResources(): Promise<GamingResource[]> {
    if (this.isMongoConnected && this.db) {
      return this.db.collection<GamingResource>('resources').find({ active: true }).sort({ order: 1 }).toArray();
    }
    return this.fileResources.filter((r) => r.active).sort((a, b) => a.order - b.order);
  }

  async getResourceById(id: string): Promise<GamingResource | null> {
    if (this.isMongoConnected && this.db) {
      return this.db.collection<GamingResource>('resources').findOne({ id });
    }
    return this.fileResources.find((r) => r.id === id) || null;
  }

  async updateResource(id: string, updates: Partial<GamingResource>): Promise<GamingResource | null> {
    if (this.isMongoConnected && this.db) {
      const res = await this.db.collection<GamingResource>('resources').findOneAndUpdate(
        { id },
        { $set: updates },
        { returnDocument: 'after' }
      );
      return res || null;
    }
    const idx = this.fileResources.findIndex((r) => r.id === id);
    if (idx === -1) return null;
    this.fileResources[idx] = { ...this.fileResources[idx], ...updates };
    this.saveResourcesToFile();
    return this.fileResources[idx];
  }

  // ======================== BOOKINGS ========================

  async getBookings(filter?: AdminBookingFilter): Promise<Booking[]> {
    let bookings: Booking[] = [];

    if (this.isMongoConnected && this.db) {
      const query: any = {};
      if (filter?.date) query.date = filter.date;
      if (filter?.resourceId) query.resourceId = filter.resourceId;
      if (filter?.category) query.category = filter.category;
      if (filter?.status) query.status = filter.status;
      if (filter?.paymentStatus) query.paymentStatus = filter.paymentStatus;
      if (filter?.search) {
        const regex = new RegExp(filter.search, 'i');
        query.$or = [{ customerName: regex }, { phone: regex }, { id: regex }];
      }
      bookings = await this.db.collection<Booking>('bookings').find(query).sort({ date: -1, startTime: 1 }).toArray();
    } else {
      bookings = [...this.fileBookings];
      if (filter?.date) bookings = bookings.filter((b) => b.date === filter.date);
      if (filter?.resourceId) bookings = bookings.filter((b) => b.resourceId === filter.resourceId);
      if (filter?.category) bookings = bookings.filter((b) => b.category === filter.category);
      if (filter?.status) bookings = bookings.filter((b) => b.status === filter.status);
      if (filter?.paymentStatus) bookings = bookings.filter((b) => b.paymentStatus === filter.paymentStatus);
      if (filter?.search) {
        const s = filter.search.toLowerCase();
        bookings = bookings.filter(
          (b) =>
            b.customerName.toLowerCase().includes(s) ||
            b.phone.toLowerCase().includes(s) ||
            b.id.toLowerCase().includes(s)
        );
      }
      bookings.sort((a, b) => b.date.localeCompare(a.date) || a.startTime.localeCompare(b.startTime));
    }

    // Auto-update statuses based on current time
    return this.refreshBookingStatuses(bookings);
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const cleanId = id.trim().toUpperCase();
    let booking: Booking | null = null;

    if (this.isMongoConnected && this.db) {
      booking = await this.db.collection<Booking>('bookings').findOne({ id: cleanId });
    } else {
      booking = this.fileBookings.find((b) => b.id === cleanId) || null;
    }

    if (booking) {
      const refreshed = this.refreshBookingStatuses([booking])[0];
      return refreshed;
    }
    return null;
  }

  async findBookingsByPhoneOrId(identifier: string): Promise<Booking[]> {
    const clean = identifier.trim();
    let results: Booking[] = [];

    if (this.isMongoConnected && this.db) {
      results = await this.db
        .collection<Booking>('bookings')
        .find({
          $or: [{ id: clean.toUpperCase() }, { phone: clean }],
        })
        .sort({ date: -1, startTime: -1 })
        .toArray();
    } else {
      results = this.fileBookings.filter(
        (b) => b.id.toUpperCase() === clean.toUpperCase() || b.phone === clean
      );
      results.sort((a, b) => b.date.localeCompare(a.date) || b.startTime.localeCompare(a.startTime));
    }

    return this.refreshBookingStatuses(results);
  }

  /**
   * CRITICAL: Double Booking Prevention
   * Checks whether the requested interval [startTime, endTime) conflicts with any existing booking
   * on the same resource and date.
   */
  async checkConflict(
    resourceId: string,
    date: string,
    startTime: string,
    endTime: string,
    excludeBookingId?: string
  ): Promise<{ hasConflict: boolean; conflictingBooking?: Booking }> {
    const startMins = timeToMinutes(startTime);
    const endMins = timeToMinutes(endTime);

    let candidateBookings: Booking[] = [];

    if (this.isMongoConnected && this.db) {
      candidateBookings = await this.db
        .collection<Booking>('bookings')
        .find({
          resourceId,
          date,
          status: { $in: ['confirmed', 'active', 'pending'] },
        })
        .toArray();
    } else {
      candidateBookings = this.fileBookings.filter(
        (b) =>
          b.resourceId === resourceId &&
          b.date === date &&
          ['confirmed', 'active', 'pending'].includes(b.status)
      );
    }

    for (const b of candidateBookings) {
      if (excludeBookingId && b.id === excludeBookingId) continue;
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime);

      if (doIntervalsOverlap(startMins, endMins, bStart, bEnd)) {
        return { hasConflict: true, conflictingBooking: b };
      }
    }

    return { hasConflict: false };
  }

  /**
   * Atomically creates a booking with conflict verification under mutex lock.
   */
  async createBooking(booking: Booking): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    const lockKey = `${booking.resourceId}-${booking.date}`;

    return this.acquireLock(lockKey, async () => {
      // 1. Double check conflict immediately before write
      const conflictCheck = await this.checkConflict(
        booking.resourceId,
        booking.date,
        booking.startTime,
        booking.endTime
      );

      if (conflictCheck.hasConflict) {
        return {
          success: false,
          error: 'Sorry, this slot was just booked by another guest. Please select another time.',
        };
      }

      // 2. Insert booking
      if (this.isMongoConnected && this.db) {
        await this.db.collection<Booking>('bookings').insertOne(booking);
      } else {
        this.fileBookings.push(booking);
        this.saveBookingsToFile();
      }

      return { success: true, booking };
    });
  }

  /**
   * Extends an active or upcoming booking if no overlapping booking exists
   */
  async extendBooking(
    id: string,
    additionalMinutes: number
  ): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    const booking = await this.getBookingById(id);
    if (!booking) {
      return { success: false, error: 'Booking not found.' };
    }

    if (booking.status === 'cancelled' || booking.status === 'completed') {
      return { success: false, error: `Cannot extend a ${booking.status} booking.` };
    }

    const currentEndMins = timeToMinutes(booking.endTime);
    const newEndMins = currentEndMins + additionalMinutes;
    const newEndTime = `${String(Math.floor(newEndMins / 60)).padStart(2, '0')}:${String(
      newEndMins % 60
    ).padStart(2, '0')}`;

    const lockKey = `${booking.resourceId}-${booking.date}`;

    return this.acquireLock(lockKey, async () => {
      // Check conflict for extended window [currentEndTime, newEndTime)
      const conflictCheck = await this.checkConflict(
        booking.resourceId,
        booking.date,
        booking.endTime,
        newEndTime,
        booking.id
      );

      if (conflictCheck.hasConflict) {
        return {
          success: false,
          error: 'Extension unavailable: another guest has already reserved the following time slot.',
        };
      }

      // Calculate additional amount
      const resource = await this.getResourceById(booking.resourceId);
      const ratePerHour = resource?.ratePerHour || 149;
      const additionalCost = Math.round((ratePerHour * additionalMinutes) / 60);

      const updatedBooking: Booking = {
        ...booking,
        endTime: newEndTime,
        durationMinutes: booking.durationMinutes + additionalMinutes,
        totalAmount: booking.totalAmount + additionalCost,
        updatedAt: new Date().toISOString(),
      };

      if (this.isMongoConnected && this.db) {
        await this.db.collection<Booking>('bookings').updateOne({ id: booking.id }, { $set: updatedBooking });
      } else {
        const idx = this.fileBookings.findIndex((b) => b.id === booking.id);
        if (idx !== -1) {
          this.fileBookings[idx] = updatedBooking;
          this.saveBookingsToFile();
        }
      }

      return { success: true, booking: updatedBooking };
    });
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    const cleanId = id.trim().toUpperCase();
    const payload = { ...updates, updatedAt: new Date().toISOString() };

    if (this.isMongoConnected && this.db) {
      const res = await this.db.collection<Booking>('bookings').findOneAndUpdate(
        { id: cleanId },
        { $set: payload },
        { returnDocument: 'after' }
      );
      return res || null;
    } else {
      const idx = this.fileBookings.findIndex((b) => b.id === cleanId);
      if (idx === -1) return null;
      this.fileBookings[idx] = { ...this.fileBookings[idx], ...payload };
      this.saveBookingsToFile();
      return this.fileBookings[idx];
    }
  }

  async cancelBooking(id: string, reason?: string): Promise<{ success: boolean; booking?: Booking; error?: string }> {
    const booking = await this.getBookingById(id);
    if (!booking) return { success: false, error: 'Booking not found.' };

    const notes = reason ? `${booking.notes ? booking.notes + ' | ' : ''}Cancelled: ${reason}` : booking.notes;
    const updated = await this.updateBooking(id, {
      status: 'cancelled',
      notes,
    });

    return { success: true, booking: updated || undefined };
  }

  /**
   * Requirement 5: Automatic Booking Expiration & Status Refresh
   * Based on current time in Asia/Kolkata:
   * - If date < today: completed
   * - If date == today && currentTime >= endTime: completed
   * - If date == today && currentTime >= startTime && currentTime < endTime: active ("Currently Playing")
   * - If date == today && currentTime < startTime: confirmed
   */
  private refreshBookingStatuses(bookings: Booking[]): Booking[] {
    const now = getNowInKolkata();
    const currentMins = now.totalMinutes;
    let needsFileSave = false;

    const refreshed = bookings.map((b) => {
      if (b.status === 'cancelled') return b;

      let newStatus = b.status;
      if (b.date < now.dateStr) {
        newStatus = 'completed';
      } else if (b.date === now.dateStr) {
        const startMins = timeToMinutes(b.startTime);
        const endMins = timeToMinutes(b.endTime);

        if (currentMins >= endMins) {
          newStatus = 'completed';
        } else if (currentMins >= startMins && currentMins < endMins) {
          newStatus = 'active';
        } else if (b.status === 'active' && currentMins < startMins) {
          newStatus = 'confirmed';
        }
      }

      if (newStatus !== b.status) {
        b.status = newStatus;
        needsFileSave = true;
      }
      return b;
    });

    if (needsFileSave && !this.isMongoConnected) {
      this.saveBookingsToFile();
    }

    return refreshed;
  }

  // ======================== ADMIN SETTINGS ========================

  async getAdminPasscode(): Promise<string> {
    if (this.cachedAdminPasscode) {
      return this.cachedAdminPasscode;
    }

    if (this.isMongoConnected && this.db) {
      try {
        const doc = await this.db.collection('settings').findOne({ key: 'admin_passcode' });
        if (doc && doc.value) {
          this.cachedAdminPasscode = doc.value;
          return doc.value;
        }
      } catch (err) {
        console.error('Error fetching admin passcode from Mongo:', err);
      }
    } else {
      try {
        if (fs.existsSync(this.settingsFilePath)) {
          const raw = fs.readFileSync(this.settingsFilePath, 'utf-8');
          const data = JSON.parse(raw);
          if (data.admin_passcode) {
            this.cachedAdminPasscode = data.admin_passcode;
            return data.admin_passcode;
          }
        }
      } catch (err) {
        console.error('Error reading settings file:', err);
      }
    }

    this.cachedAdminPasscode = config.adminPasscode;
    return config.adminPasscode;
  }

  async setAdminPasscode(newPasscode: string): Promise<void> {
    this.cachedAdminPasscode = newPasscode;

    if (this.isMongoConnected && this.db) {
      try {
        await this.db.collection('settings').updateOne(
          { key: 'admin_passcode' },
          { $set: { value: newPasscode, updatedAt: new Date().toISOString() } },
          { upsert: true }
        );
      } catch (err) {
        console.error('Error saving admin passcode to Mongo:', err);
      }
    }

    // Always also persist to local file store
    try {
      let data: any = {};
      if (fs.existsSync(this.settingsFilePath)) {
        try {
          data = JSON.parse(fs.readFileSync(this.settingsFilePath, 'utf-8'));
        } catch {}
      }
      data.admin_passcode = newPasscode;
      data.updatedAt = new Date().toISOString();
      fs.writeFileSync(this.settingsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving settings to file:', err);
    }
  }
}

export const dbService = new DatabaseService();
