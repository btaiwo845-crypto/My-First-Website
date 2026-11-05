/**
 * AlMustapha Academy - Master Application Controller
 * Integrates Security Defense, Multi-Role Login/Logout, Password Reset,
 * and Interactive Floating AI Copilot.
 */

class AlMustaphaApp {
  constructor() {
    this.store = window.appStore;
    this.currentView = "dashboard";
    this.selectedStudentId = null;
    this.selectedParentStudentId = null;
    this.selectedTheme = localStorage.getItem("ALMUSTAPHA_THEME") || "system";

    // Filtering
    this.filterSearch = "";
    this.filterClass = "";
    this.filterStatus = "";

    // Password Reset Session State
    this.activeResetToken = null;
    this.resetTargetEmail = null;

    this.init();
  }

  init() {
    this.applyTheme(this.selectedTheme);
    this.checkGateway();
    this.bindEvents();
    this.initSecurityWatchers();
    this.switchView("dashboard");
    this.render();
  }

  // --- Security Gateway Authentication ---
  checkGateway() {
    const gateway = document.getElementById("security-gateway");
    if (!gateway) return;

    if (this.store.isAuthenticated) {
      gateway.classList.add("hidden");
    } else {
      gateway.classList.remove("hidden");
    }
  }

  handleLogin(identifier, password) {
    // 1. Anti-SQL Injection Scan
    if (SecurityEngine.detectSQLInjection(identifier) || SecurityEngine.detectSQLInjection(password)) {
      UI.toast("🚨 Security Alert: Malicious SQL pattern detected & blocked.", "error");
      this.store.logAudit("Security Intrusion Blocked", `Potential SQLi attempt intercepted on login field: [${identifier}].`);
      return;
    }

    const activeRolePill = document.querySelector(".role-pill.active");
    const role = activeRolePill ? activeRolePill.getAttribute("data-role") : "admin";

    const success = this.store.loginWithCredentials(identifier, password, role);
    if (success) {
      document.getElementById("security-gateway").classList.add("hidden");
      UI.toast(`Welcome to AlMustapha Academy, ${role.toUpperCase()} User!`, "success");
      this.updateUserSessionUI();
      this.render();
    } else {
      UI.toast("Authentication failed. Invalid password or credentials. (Demo PIN: 2026)", "error");
    }
  }

  handleLogout() {
    if (confirm("Are you sure you want to securely log out of AlMustapha Academy?")) {
      this.store.logout();
      document.getElementById("security-gateway").classList.remove("hidden");
      UI.toast("Signed out from secure session.", "info");
    }
  }

  updateUserSessionUI() {
    const roleBadge = document.getElementById("session-role-badge");
    if (roleBadge) roleBadge.textContent = this.store.currentRole;
    const nameEl = document.getElementById("session-user-name");
    if (nameEl) nameEl.textContent = sessionStorage.getItem("ALMUSTAPHA_USER_NAME") || "Active Session";
  }

  initSecurityWatchers() {
    // Auto-lock on 15 minutes of inactivity
    SecurityEngine.initSessionInactivityWatcher(15, () => {
      if (this.store.isAuthenticated) {
        this.store.logout();
        document.getElementById("security-gateway").classList.remove("hidden");
        UI.toast("Session expired due to inactivity. Please authenticate again.", "info");
      }
    });
  }

  // --- Password Reset Workflow ---
  openForgotPasswordModal() {
    document.getElementById("reset-step-1").style.display = "block";
    document.getElementById("reset-step-2").style.display = "none";
    document.getElementById("reset-email-input").value = "";
    document.getElementById("reset-token-input").value = "";
    document.getElementById("reset-new-password").value = "";
    document.getElementById("reset-confirm-password").value = "";
    this.updatePasswordStrengthUI("");
    this.showModal("modal-password-reset");
  }

  requestPasswordReset() {
    const email = document.getElementById("reset-email-input").value.trim();
    if (!email) {
      UI.toast("Please enter your academic email address.", "error");
      return;
    }

    if (SecurityEngine.detectSQLInjection(email)) {
      UI.toast("Security violation: Invalid characters detected.", "error");
      return;
    }

    this.activeResetToken = SecurityEngine.generateResetToken();
    this.resetTargetEmail = email;

    document.getElementById("reset-step-1").style.display = "none";
    document.getElementById("reset-step-2").style.display = "block";
    document.getElementById("display-generated-token").textContent = this.activeResetToken;

    UI.toast(`Security token generated for ${email}! Enter it to complete reset.`, "success");
    this.store.logAudit("Password Reset Initiated", `Generated token [${this.activeResetToken}] for ${email}.`);
  }

  executePasswordReset() {
    const enteredToken = document.getElementById("reset-token-input").value.trim();
    const newPwd = document.getElementById("reset-new-password").value;
    const confirmPwd = document.getElementById("reset-confirm-password").value;

    if (enteredToken !== this.activeResetToken) {
      UI.toast("Invalid or expired security token. Please verify code.", "error");
      return;
    }

    if (newPwd !== confirmPwd) {
      UI.toast("Passwords do not match. Please re-enter.", "error");
      return;
    }

    const strength = SecurityEngine.evaluatePasswordStrength(newPwd);
    if (strength.score < 2) {
      UI.toast("Password is too weak. Please include at least 8 chars, uppercase, and numbers.", "error");
      return;
    }

    this.store.resetUserPassword(this.resetTargetEmail, newPwd);
    this.closeModal("modal-password-reset");
    UI.toast("Password successfully reset! You can now authenticate with your new password.", "success");
  }

  updatePasswordStrengthUI(password) {
    const res = SecurityEngine.evaluatePasswordStrength(password);
    const fill = document.getElementById("pwd-strength-bar-fill");
    const label = document.getElementById("pwd-strength-label");

    if (fill) {
      fill.style.width = (res.score * 25) + "%";
      fill.style.background = res.color;
    }
    if (label) {
      label.textContent = `Strength: ${res.label}`;
      label.style.color = res.color;
    }

    // Update requirements checklist
    const elLen = document.getElementById("req-length");
    const elCase = document.getElementById("req-case");
    const elNum = document.getElementById("req-number");
    const elSpec = document.getElementById("req-special");

    if (elLen) elLen.className = `pwd-req-item ${res.criteria.length ? 'met' : ''}`;
    if (elCase) elCase.className = `pwd-req-item ${(res.criteria.hasUpper && res.criteria.hasLower) ? 'met' : ''}`;
    if (elNum) elNum.className = `pwd-req-item ${res.criteria.hasNumber ? 'met' : ''}`;
    if (elSpec) elSpec.className = `pwd-req-item ${res.criteria.hasSpecial ? 'met' : ''}`;
  }

  // --- Theme Management ---
  applyTheme(theme) {
    this.selectedTheme = theme;
    localStorage.setItem("ALMUSTAPHA_THEME", theme);
    document.documentElement.setAttribute("data-theme", theme);

    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-theme-val") === theme);
    });
  }

  // --- Navigation & Views ---
  switchView(viewName) {
    this.currentView = viewName;

    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("data-view") === viewName);
    });

    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const activeSec = document.getElementById(`view-${viewName}`);
    if (activeSec) {
      activeSec.classList.add("active");
    }

    this.render();
  }

  render() {
    if (this.currentView === "dashboard") {
      UI.renderDashboard(this.store);
    } else if (this.currentView === "students") {
      this.applyStudentFilters();
    } else if (this.currentView === "library") {
      UI.renderLibrary(this.store);
    } else if (this.currentView === "dar-al-hikmah") {
      UI.renderDarAlHikmah(this.store);
    } else if (this.currentView === "parent-portal") {
      UI.renderParentPortal(this.store, this.selectedParentStudentId);
    } else if (this.currentView === "assignments") {
      UI.renderAssignments(this.store);
    } else if (this.currentView === "audit-logs") {
      UI.renderAuditLogs(this.store);
    }
  }

  bindEvents() {
    // Navigation items
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const v = link.getAttribute("data-view");
        this.switchView(v);
      });
    });

    // Theme toggles
    document.querySelectorAll(".theme-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme-val");
        this.applyTheme(theme);
      });
    });

    // Global Search with Anti-SQLi check
    const headerSearch = document.getElementById("header-search-input");
    if (headerSearch) {
      headerSearch.addEventListener("input", (e) => {
        const val = e.target.value;
        if (SecurityEngine.detectSQLInjection(val)) {
          UI.toast("🚨 Blocked potential search injection pattern.", "error");
          e.target.value = "";
          return;
        }
        this.filterSearch = val.trim().toLowerCase();
        if (this.currentView !== "students") {
          this.switchView("students");
        }
        this.applyStudentFilters();
      });
    }

    // Role selection in Gateway
    document.querySelectorAll(".role-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".role-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        
        // Auto-fill demo credentials matching role
        const role = pill.getAttribute("data-role");
        const idInput = document.getElementById("gateway-identifier-input");
        const pwdInput = document.getElementById("gateway-password-input");
        if (idInput && pwdInput) {
          if (role === "admin") { idInput.value = "admin@almustapha.edu"; pwdInput.value = "Admin@2026!"; }
          else if (role === "teacher") { idInput.value = "teacher@almustapha.edu"; pwdInput.value = "Teacher@2026!"; }
          else if (role === "student") { idInput.value = "student@almustapha.edu"; pwdInput.value = "Student@2026!"; }
          else if (role === "parent") { idInput.value = "parent@almustapha.edu"; pwdInput.value = "Parent@2026!"; }
        }
      });
    });

    // Gateway Form submission
    const gatewayForm = document.getElementById("gateway-login-form");
    if (gatewayForm) {
      gatewayForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("gateway-identifier-input").value;
        const pwd = document.getElementById("gateway-password-input").value;
        this.handleLogin(id, pwd);
      });
    }

    // Password reset live strength listener
    const resetPwdInput = document.getElementById("reset-new-password");
    if (resetPwdInput) {
      resetPwdInput.addEventListener("input", (e) => {
        this.updatePasswordStrengthUI(e.target.value);
      });
    }

    // Filter controls in student directory
    const classFilter = document.getElementById("filter-class");
    if (classFilter) {
      classFilter.addEventListener("change", (e) => {
        this.filterClass = e.target.value;
        this.applyStudentFilters();
      });
    }

    const statusFilter = document.getElementById("filter-status");
    if (statusFilter) {
      statusFilter.addEventListener("change", (e) => {
        this.filterStatus = e.target.value;
        this.applyStudentFilters();
      });
    }

    // Parent portal selector
    const parentSelect = document.getElementById("parent-student-select");
    if (parentSelect) {
      parentSelect.addEventListener("change", (e) => {
        this.selectedParentStudentId = e.target.value;
        UI.renderParentPortal(this.store, this.selectedParentStudentId);
      });
    }

    // Student form submit with strict validation
    const stuForm = document.getElementById("student-form");
    if (stuForm) {
      stuForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleStudentFormSubmit();
      });
    }

    // AI Study Query in view
    const aiTutorBtn = document.getElementById("ai-tutor-ask-btn");
    if (aiTutorBtn) {
      aiTutorBtn.addEventListener("click", () => {
        const query = document.getElementById("ai-tutor-input").value;
        if (!query.trim()) return;
        const res = AIAssistant.solveQuery(query);
        document.getElementById("ai-tutor-response-box").innerHTML = res;
      });
    }

    // AI Performance Run
    const aiPerfBtn = document.getElementById("ai-perf-analyze-btn");
    if (aiPerfBtn) {
      aiPerfBtn.addEventListener("click", () => {
        const selStuId = document.getElementById("ai-perf-student-select").value;
        const student = this.store.getStudentById(selStuId);
        if (student) {
          const res = AIAssistant.analyzeStudentPerformance(student, this.store.getSubjects());
          document.getElementById("ai-perf-response-box").innerHTML = res;
        }
      });
    }

    // AI Timetable Run
    const aiTimeBtn = document.getElementById("ai-timetable-generate-btn");
    if (aiTimeBtn) {
      aiTimeBtn.addEventListener("click", () => {
        const selClass = document.getElementById("ai-timetable-class-select").value;
        const res = AIAssistant.generateTimetable(selClass);
        document.getElementById("ai-timetable-response-box").innerHTML = res;
      });
    }

    // AI Announcement Run
    const aiAnnounceBtn = document.getElementById("ai-announcement-generate-btn");
    if (aiAnnounceBtn) {
      aiAnnounceBtn.addEventListener("click", () => {
        const type = document.getElementById("ai-announcement-type").value;
        const title = document.getElementById("ai-announcement-title").value;
        const audience = document.getElementById("ai-announcement-audience").value;
        const res = AIAssistant.generateAnnouncement(type, title, audience);
        document.getElementById("ai-announcement-response-box").innerHTML = res;
      });
    }

    // Floating AI Copilot Input Enter key
    const copilotInput = document.getElementById("ai-copilot-input");
    if (copilotInput) {
      copilotInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          this.sendAICopilotMessage();
        }
      });
    }
  }

  // --- Student Filtering ---
  applyStudentFilters() {
    const all = this.store.getStudents();
    const subjects = this.store.getSubjects();

    const filtered = all.filter(s => {
      const matchSearch = !this.filterSearch ||
        s.firstName.toLowerCase().includes(this.filterSearch) ||
        s.lastName.toLowerCase().includes(this.filterSearch) ||
        s.studentId.toLowerCase().includes(this.filterSearch) ||
        s.email.toLowerCase().includes(this.filterSearch) ||
        s.className.toLowerCase().includes(this.filterSearch);

      const matchClass = !this.filterClass || s.className === this.filterClass;
      const matchStatus = !this.filterStatus || s.status === this.filterStatus;

      return matchSearch && matchClass && matchStatus;
    });

    UI.renderStudentsTable(filtered, subjects);
  }

  // --- Student Form Handler (With Anti-SQLi & XSS Validation) ---
  handleStudentFormSubmit() {
    const id = document.getElementById("student-form-id").value;
    const rawStuId = document.getElementById("form-student-id").value.trim();
    const rawFirst = document.getElementById("form-first-name").value.trim();
    const rawLast = document.getElementById("form-last-name").value.trim();
    const rawEmail = document.getElementById("form-email").value.trim();
    const rawPhone = document.getElementById("form-phone").value.trim();
    const rawClass = document.getElementById("form-class").value;
    const rawDob = document.getElementById("form-dob").value;
    const rawBlood = document.getElementById("form-blood").value;
    const rawGuardian = document.getElementById("form-guardian").value.trim();
    const rawGPhone = document.getElementById("form-guardian-phone").value.trim();
    const rawStatus = document.getElementById("form-status").value;

    // 1. Anti-SQL Injection Scan
    const fields = [rawStuId, rawFirst, rawLast, rawEmail, rawPhone, rawGuardian, rawGPhone];
    for (const f of fields) {
      if (SecurityEngine.detectSQLInjection(f)) {
        UI.toast("🚨 Form Rejected: Potentially unsafe SQL or code syntax detected.", "error");
        this.store.logAudit("Form Violation Blocked", `Attempt to inject malicious sequence in student registration.`);
        return;
      }
    }

    // 2. Email Validation
    if (!SecurityEngine.validateEmail(rawEmail)) {
      UI.toast("Invalid academic email address format (e.g. name@almustapha.edu).", "error");
      return;
    }

    // 3. XSS Sanitization
    const data = {
      id: id || undefined,
      studentId: SecurityEngine.sanitize(rawStuId),
      firstName: SecurityEngine.sanitize(rawFirst),
      lastName: SecurityEngine.sanitize(rawLast),
      email: SecurityEngine.sanitize(rawEmail),
      phone: SecurityEngine.sanitize(rawPhone),
      className: rawClass,
      dob: rawDob,
      bloodGroup: rawBlood,
      guardianName: SecurityEngine.sanitize(rawGuardian),
      guardianPhone: SecurityEngine.sanitize(rawGPhone),
      status: rawStatus
    };

    this.store.saveStudent(data);
    this.closeModal("modal-student-form");
    UI.toast(`Record for ${data.firstName} ${data.lastName} saved securely!`, "success");
    this.render();
  }

  // --- Floating AI Copilot Chat Logic ---
  toggleAICopilot() {
    const drawer = document.getElementById("ai-copilot-drawer");
    if (!drawer) return;
    drawer.classList.toggle("show");
    if (drawer.classList.contains("show")) {
      document.getElementById("ai-copilot-input")?.focus();
    }
  }

  sendAICopilotMessage(customQuery = null) {
    const input = document.getElementById("ai-copilot-input");
    const query = customQuery || (input ? input.value.trim() : "");
    if (!query) return;

    if (input && !customQuery) input.value = "";

    const msgContainer = document.getElementById("ai-copilot-messages");
    if (!msgContainer) return;

    // Append user message
    const userDiv = document.createElement("div");
    userDiv.className = "ai-msg user";
    userDiv.textContent = query;
    msgContainer.appendChild(userDiv);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // Typing simulation & response
    setTimeout(() => {
      const responseHtml = AIAssistant.solveQuery(query);
      const botDiv = document.createElement("div");
      botDiv.className = "ai-msg bot";
      botDiv.innerHTML = responseHtml;
      msgContainer.appendChild(botDiv);
      msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 300);
  }

  askAICopilotPrompt(promptText) {
    this.sendAICopilotMessage(promptText);
  }

  // --- Modals & Printing ---
  openDigitalID(studentId) {
    const student = this.store.getStudentById(studentId);
    if (!student) return;
    UI.renderDigitalIDCard(student);
    this.showModal("modal-digital-id");
  }

  openReportCard(studentId) {
    const student = this.store.getStudentById(studentId);
    if (!student) return;
    const subjects = this.store.getSubjects();
    const rankings = Calculations.computeClassRankings(this.store.getStudents(), subjects);
    UI.renderReportCard(student, subjects, rankings);
    this.showModal("modal-report-card");
  }

  openAddModal() {
    document.getElementById("student-modal-title").textContent = "Register New Student";
    document.getElementById("student-form").reset();
    document.getElementById("student-form-id").value = "";
    const nextNum = String(this.store.getStudents().length + 1).padStart(3, "0");
    document.getElementById("form-student-id").value = `AMA-2026-${nextNum}`;
    this.showModal("modal-student-form");
  }

  openEditModal(id) {
    const s = this.store.getStudentById(id);
    if (!s) return;
    document.getElementById("student-modal-title").textContent = "Update Student Profile";
    document.getElementById("student-form-id").value = s.id;
    document.getElementById("form-student-id").value = s.studentId;
    document.getElementById("form-first-name").value = s.firstName;
    document.getElementById("form-last-name").value = s.lastName;
    document.getElementById("form-email").value = s.email;
    document.getElementById("form-phone").value = s.phone || "";
    document.getElementById("form-class").value = s.className;
    document.getElementById("form-dob").value = s.dob || "";
    document.getElementById("form-blood").value = s.bloodGroup || "O+";
    document.getElementById("form-guardian").value = s.guardianName || "";
    document.getElementById("form-guardian-phone").value = s.guardianPhone || "";
    document.getElementById("form-status").value = s.status || "Active";
    this.showModal("modal-student-form");
  }

  confirmDelete(id) {
    const s = this.store.getStudentById(id);
    if (!s) return;
    this.studentToDeleteId = id;
    document.getElementById("delete-student-name").textContent = `${s.firstName} ${s.lastName} (${s.studentId})`;
    this.showModal("modal-delete-confirm");
  }

  executeDelete() {
    if (this.studentToDeleteId) {
      this.store.deleteStudent(this.studentToDeleteId);
      this.closeModal("modal-delete-confirm");
      UI.toast("Student profile purged from database.", "info");
      this.studentToDeleteId = null;
      this.render();
    }
  }

  // Library
  openIssueBookModal(bookId) {
    const book = this.store.getLibrary().find(b => b.id === bookId);
    if (!book) return;
    document.getElementById("modal-issue-book-title").textContent = `Issue: ${book.title}`;
    document.getElementById("issue-book-id").value = book.id;
    const stuSelect = document.getElementById("issue-student-select");
    stuSelect.innerHTML = this.store.getStudents().map(s => `<option value="${s.id}">${s.firstName} ${s.lastName} (${s.studentId})</option>`).join("");
    this.showModal("modal-issue-book");
  }

  handleIssueBookSubmit() {
    const bookId = document.getElementById("issue-book-id").value;
    const studentId = document.getElementById("issue-student-select").value;
    const success = this.store.borrowBook(bookId, studentId);
    if (success) {
      this.closeModal("modal-issue-book");
      UI.toast("Book issued successfully!", "success");
      UI.renderLibrary(this.store);
    } else {
      UI.toast("Unable to issue book. Check copies availability.", "error");
    }
  }

  returnBook(logId) {
    const success = this.store.returnBook(logId);
    if (success) {
      UI.toast("Book checked in and inventory reconciled.", "success");
      UI.renderLibrary(this.store);
    }
  }

  // Dar Al-Hikmah Quiz
  launchDarQuiz(modId) {
    const dar = this.store.getDarAlHikmah();
    const mod = dar.modules.find(m => m.id === modId);
    if (!mod || !mod.quiz) return;

    const quiz = mod.quiz[0];
    document.getElementById("dar-quiz-modal-title").textContent = `Quiz: ${mod.title}`;
    document.getElementById("dar-quiz-question").textContent = quiz.q;
    
    const optContainer = document.getElementById("dar-quiz-options");
    optContainer.innerHTML = quiz.options.map((opt, idx) => `
      <button class="btn btn-secondary" style="width:100%; text-align:left; justify-content:flex-start; margin-bottom:8px;" onclick="window.smsApp.evaluateDarQuiz(${idx}, ${quiz.answer}, '${quiz.explanation}')">
        <strong>${String.fromCharCode(65 + idx)}.</strong> &nbsp; ${opt}
      </button>
    `).join("");

    document.getElementById("dar-quiz-feedback").innerHTML = "";
    this.showModal("modal-dar-quiz");
  }

  evaluateDarQuiz(selectedIdx, correctIdx, explanation) {
    const fb = document.getElementById("dar-quiz-feedback");
    if (selectedIdx === correctIdx) {
      fb.innerHTML = `
        <div style="background:#ecfdf5; border-left:4px solid #10b981; padding:12px; border-radius:6px; color:#065f46; font-size:13px;">
          <strong>🎉 Correct! Excellent intellect!</strong>
          <p style="margin-top:4px;">${explanation}</p>
        </div>
      `;
    } else {
      fb.innerHTML = `
        <div style="background:#fef2f2; border-left:4px solid #ef4444; padding:12px; border-radius:6px; color:#991b1b; font-size:13px;">
          <strong>✕ Not quite correct.</strong>
          <p style="margin-top:4px;">${explanation}</p>
        </div>
      `;
    }
  }

  openEmailModal() {
    this.showModal("modal-compose-email");
  }

  handleEmailSend() {
    const recipient = document.getElementById("email-recipient-type").value;
    const subject = document.getElementById("email-subject").value;
    UI.toast(`Broadcast dispatch sent to [${recipient}].`, "success");
    this.store.logAudit("Email Broadcast Sent", `Sent email subject "${subject}" to ${recipient}.`);
    this.closeModal("modal-compose-email");
  }

  showModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.add("show");
  }

  closeModal(id) {
    const m = document.getElementById(id);
    if (m) m.classList.remove("show");
  }

  printCurrent() {
    window.print();
  }

  exportCSV() {
    const students = this.store.getStudents();
    const subjects = this.store.getSubjects();

    let csv = "Student ID,First Name,Last Name,Class,Email,Status,GPA,Attendance Rate,Fees Status\n";
    students.forEach(s => {
      const gpa = Calculations.calculateGPA(s, subjects).toFixed(2);
      const att = Calculations.calculateAttendanceRate(s) + "%";
      const fee = s.fees ? s.fees.status : "Paid";
      csv += `"${s.studentId}","${s.firstName}","${s.lastName}","${s.className}","${s.email}","${s.status}","${gpa}","${att}","${fee}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `almustapha_students_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    UI.toast("Exported directory to CSV!", "success");
  }

  exportBackupJSON() {
    const json = JSON.stringify(this.store.data, null, 2);
    const blob = new Blob([json], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `almustapha_academy_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    UI.toast("Master backup JSON downloaded!", "success");
  }

  resetData() {
    if (confirm("Reset all AlMustapha Academy records to verified demo seed?")) {
      this.store.resetToDefault();
      UI.toast("Academy database reset to default state.", "info");
      this.render();
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.smsApp = new AlMustaphaApp();
});
