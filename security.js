/**
 * AlMustapha Academy - Enterprise Security & Defense Engine
 * Features:
 *  1. Anti-SQL Injection Scanner & Sanitizer
 *  2. Cross-Site Scripting (XSS) Sanitization
 *  3. Strict Field Validation (Email, Password Strength, Student ID)
 *  4. Inactivity Session Lockout Watcher
 *  5. Secure Password Reset Token Engine
 */

const SecurityEngine = {
  // SQL Injection Pattern Signatures
  sqliPatterns: [
    /(\%27)|(\')|(\-\-)|(\%23)|(#)/i,
    /((\%3D)|(=))[^\n]*((\%27)|(\')|(\-\-)|(\%3B)|(;))/i,
    /\w*((\%27)|(\'))(\s)*(or|and)\s*(\w+|\d+)\s*=\s*(\w+|\d+)/i,
    /union(\s+)select/i,
    /drop(\s+)table/i,
    /insert(\s+)into/i,
    /update(\s+)\w+(\s+)set/i,
    /delete(\s+)from/i,
    /exec(\s*|\+)+(s|x)p\w+/i,
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
  ],

  /**
   * Scan input for dangerous SQL injection or code payload signatures.
   * Returns true if malicious content detected.
   */
  detectSQLInjection(input) {
    if (typeof input !== "string") return false;
    for (const pattern of this.sqliPatterns) {
      if (pattern.test(input)) {
        return true;
      }
    }
    return false;
  },

  /**
   * Deep HTML entity sanitization to neutralize XSS attacks.
   */
  sanitize(input) {
    if (typeof input !== "string") return input;
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    };
    return input.replace(/[&<>"'/]/g, (char) => map[char]);
  },

  /**
   * Validate Email Format
   */
  validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim());
  },

  /**
   * Validate Student Roll Number (AMA-YYYY-NNN)
   */
  validateStudentID(id) {
    const re = /^AMA-\d{4}-\d{3}$/;
    return re.test(String(id).trim());
  },

  /**
   * Password Strength Evaluator:
   * Returns score (0 - 4), label, and list of missing criteria.
   */
  evaluatePasswordStrength(password) {
    const p = String(password || "");
    const criteria = {
      length: p.length >= 8,
      hasUpper: /[A-Z]/.test(p),
      hasLower: /[a-z]/.test(p),
      hasNumber: /[0-9]/.test(p),
      hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p)
    };

    let score = 0;
    if (criteria.length) score++;
    if (criteria.hasUpper && criteria.hasLower) score++;
    if (criteria.hasNumber) score++;
    if (criteria.hasSpecial) score++;

    let label = "Very Weak";
    let color = "#ef4444";
    if (score === 2) { label = "Fair"; color = "#f59e0b"; }
    else if (score === 3) { label = "Good"; color = "#3b82f6"; }
    else if (score === 4) { label = "Strong & Secure"; color = "#10b981"; }

    return { score, label, color, criteria };
  },

  /**
   * Generate Secure One-Time Password Reset Token
   */
  generateResetToken() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "ALM-";
    for (let i = 0; i < 6; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  },

  /**
   * Inactivity Session Watcher
   * Automatically warns and signs out inactive users after timeout.
   */
  initSessionInactivityWatcher(timeoutMinutes = 15, onTimeoutCallback) {
    let timeoutId;
    const resetTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (typeof onTimeoutCallback === "function") {
          onTimeoutCallback();
        }
      }, timeoutMinutes * 60 * 1000);
    };

    ["mousedown", "mousemove", "keydown", "scroll", "touchstart"].forEach(evt => {
      window.addEventListener(evt, resetTimer, { passive: true });
    });

    resetTimer();
  }
};

window.SecurityEngine = SecurityEngine;
