CREATE TABLE IF NOT EXISTS contact_submissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NULL,
  grade_level VARCHAR(64) NULL,
  location VARCHAR(128) NULL,
  preferred_contact_method VARCHAR(20) NULL,
  preferred_contact_time VARCHAR(20) NULL,
  urgency VARCHAR(20) NULL,
  message TEXT NOT NULL,
  user_agent VARCHAR(512) NULL,
  ip_address VARCHAR(64) NULL,
  mail_status ENUM('pending', 'sent', 'failed') NOT NULL DEFAULT 'pending',
  mail_error TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  mail_sent_at DATETIME NULL,
  PRIMARY KEY (id),
  INDEX idx_contact_created_at (created_at),
  INDEX idx_contact_grade_level (grade_level),
  INDEX idx_contact_location (location),
  INDEX idx_contact_preferred_contact_method (preferred_contact_method),
  INDEX idx_contact_urgency (urgency),
  INDEX idx_contact_mail_status (mail_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Run the statements below on existing installations to add new intake fields.
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS preferred_contact_method VARCHAR(20) NULL AFTER location,
  ADD COLUMN IF NOT EXISTS preferred_contact_time VARCHAR(20) NULL AFTER preferred_contact_method,
  ADD COLUMN IF NOT EXISTS urgency VARCHAR(20) NULL AFTER preferred_contact_time;

ALTER TABLE contact_submissions
  ADD INDEX IF NOT EXISTS idx_contact_preferred_contact_method (preferred_contact_method),
  ADD INDEX IF NOT EXISTS idx_contact_urgency (urgency);
