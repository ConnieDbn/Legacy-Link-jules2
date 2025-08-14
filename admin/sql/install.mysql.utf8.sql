--
-- Database schema for the Legacy Link component
--

CREATE TABLE IF NOT EXISTS `#__legacylink_documents` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `asset_id` INT(10) NOT NULL DEFAULT '0',
  `user_id` INT(11) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `filename` VARCHAR(255) NOT NULL,
  `filepath` VARCHAR(512) NOT NULL,
  `filetype` VARCHAR(100) NOT NULL,
  `filesize` INT(11) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `#__legacylink_contacts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `relationship` VARCHAR(100),
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `#__legacylink_document_permissions` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `document_id` INT(11) NOT NULL,
  `contact_id` INT(11) NOT NULL,
  `granted_at` DATETIME,
  `access_token` VARCHAR(255),
  `token_expires_at` DATETIME,
  PRIMARY KEY (`id`),
  KEY `idx_document_id` (`document_id`),
  KEY `idx_contact_id` (`contact_id`),
  UNIQUE KEY `idx_doc_contact_unique` (`document_id`, `contact_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `#__legacylink_user_status` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_id` INT(11) NOT NULL,
  `last_checkin_at` DATETIME NOT NULL,
  `checkin_interval_days` INT(11) NOT NULL DEFAULT 30,
  `status` TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=active, 1=reminder_sent, 2=triggered',
  `reminder_sent_at` DATETIME,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_user_id_unique` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
