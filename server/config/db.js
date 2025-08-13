
// SQLite Database configuration 
// server/config/db.js
const Database = require('better-sqlite3');
const path = require('path');
require('dotenv').config();

// Create database connection
const dbPath = process.env.SQLITE_DB_PATH || path.join(__dirname, '../database/legacy_link.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database tables
const initializeDatabase = () => {
  try {
    // Users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        lastCheckIn DATETIME DEFAULT CURRENT_TIMESTAMP,
        checkInFrequency INTEGER DEFAULT 30,
        preferences TEXT DEFAULT '{"emailNotifications":true,"twoFactorAuth":false,"privacyMode":false}',
        date DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Trustees table
    db.exec(`
      CREATE TABLE IF NOT EXISTS trustees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        relationship TEXT,
        phone TEXT,
        accessLevel TEXT DEFAULT 'all' CHECK(accessLevel IN ('all', 'documents', 'messages', 'photos', 'custom')),
        customAccess TEXT DEFAULT '{}',
        notificationTrigger TEXT DEFAULT 'inactivity' CHECK(notificationTrigger IN ('inactivity', 'manual', 'date')),
        triggerDate DATETIME,
        notified BOOLEAN DEFAULT 0,
        accessed BOOLEAN DEFAULT 0,
        dateAdded DATETIME DEFAULT CURRENT_TIMESTAMP,
        verificationStatus TEXT DEFAULT 'pending' CHECK(verificationStatus IN ('pending', 'verified', 'declined')),
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Vault items table
    db.exec(`
      CREATE TABLE IF NOT EXISTS vault_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER NOT NULL,
        title TEXT NOT NULL,
        type TEXT NOT NULL CHECK(type IN ('document', 'message', 'photo', 'video', 'financial', 'legal', 'personal', 'other')),
        category TEXT CHECK(category IN ('will', 'power_of_attorney', 'insurance', 'property_deed', 'birth_certificate', 'marriage_certificate', 'passport', 'medical_records', 'tax_records', 'bank_account', 'investment', 'cryptocurrency', 'loan', 'credit_card', 'letter', 'memory', 'journal', 'recipe', 'family_history', 'password', 'subscription', 'other')),
        tags TEXT DEFAULT '[]',
        description TEXT,
        content TEXT,
        fileUrl TEXT,
        fileMetadata TEXT DEFAULT '{}',
        isPublic BOOLEAN DEFAULT 0,
        importance TEXT DEFAULT 'medium' CHECK(importance IN ('low', 'medium', 'high', 'critical')),
        expirationDate DATETIME,
        reminderEnabled BOOLEAN DEFAULT 0,
        reminderFrequency TEXT DEFAULT 'never' CHECK(reminderFrequency IN ('never', 'monthly', 'quarterly', 'yearly')),
        nextReminder DATETIME,
        version INTEGER DEFAULT 1,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        lastModified DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    // Vault item access rights table
    db.exec(`
      CREATE TABLE IF NOT EXISTS vault_item_access (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        vaultItemId INTEGER NOT NULL,
        trusteeId INTEGER NOT NULL,
        accessTrigger TEXT DEFAULT 'inactivity' CHECK(accessTrigger IN ('immediate', 'inactivity', 'date', 'manual')),
        triggerDate DATETIME,
        accessGranted BOOLEAN DEFAULT 0,
        accessGrantedDate DATETIME,
        FOREIGN KEY (vaultItemId) REFERENCES vault_items(id) ON DELETE CASCADE,
        FOREIGN KEY (trusteeId) REFERENCES trustees(id) ON DELETE CASCADE
      )
    `);

    // Create indexes for better performance
    db.exec(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_trustees_userId ON trustees(userId);
      CREATE INDEX IF NOT EXISTS idx_vault_items_userId ON vault_items(userId);
      CREATE INDEX IF NOT EXISTS idx_vault_items_type ON vault_items(type);
      CREATE INDEX IF NOT EXISTS idx_vault_items_category ON vault_items(category);
      CREATE INDEX IF NOT EXISTS idx_vault_item_access_vaultItemId ON vault_item_access(vaultItemId);
      CREATE INDEX IF NOT EXISTS idx_vault_item_access_trusteeId ON vault_item_access(trusteeId);
    `);

    console.log('SQLite database initialized successfully');
  } catch (error) {
    console.error('SQLite database initialization failed:', error.message);
    process.exit(1);
  }
};

// Initialize the database
initializeDatabase();

module.exports = db;
