/**
 * AlMustapha Academy - User Interface & Rendering Engine
 */

const UI = {
  toast(message, type = "info") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    let icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
    toast.innerHTML = `<span style="font-weight:bold; font-size:16px;">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // Master Dashboard Render
  renderDashboard(store) {
    const metrics = Calculations.getEnterpriseMetrics(store);
    const notifications = store.getNotifications();
    const exams = store.getExams();
    const students = store.getStudents();
    const subjects = store.getSubjects();

    // 1. KPI Badges
    const elStudents = document.getElementById("stat-total-students");
    const elSubjects = document.getElementById("stat-total-subjects");
    const elClasses = document.getElementById("stat-total-classes");
    const elTeachers = document.getElementById("stat-total-teachers");
    const elAttendance = document.getElementById("stat-attendance-rate");
    const elFees = document.getElementById("stat-fees-collected");
    const elGpa = document.getElementById("stat-avg-gpa");
    const elHonor = document.getElementById("stat-honor-roll");

    if (elStudents) elStudents.textContent = metrics.totalStudents;
    if (elSubjects) elSubjects.textContent = metrics.totalSubjects;
    if (elClasses) elClasses.textContent = metrics.totalClasses;
    if (elTeachers) elTeachers.textContent = metrics.totalTeachers;
    if (elAttendance) elAttendance.textContent = `${metrics.overallAttendance}%`;
    if (elFees) elFees.textContent = `$${metrics.financials.totalCollected.toLocaleString()} / $${metrics.financials.totalBilled.toLocaleString()}`;
    if (elGpa) elGpa.textContent = metrics.averageGpa;
    if (elHonor) elHonor.textContent = metrics.honorRoll;

    // 2. Notifications Feed
    const notifContainer = document.getElementById("dashboard-notifications-list");
    if (notifContainer) {
      notifContainer.innerHTML = notifications.slice(0, 4).map(n => `
        <div class="feed-item priority-${n.priority}">
          <div class="feed-item-title">${n.title}</div>
          <div style="color:var(--text-main); font-size:12px; margin-bottom:4px;">${n.text}</div>
          <div class="feed-item-meta">🕒 ${n.time}</div>
        </div>
      `).join("");
    }

    // 3. Upcoming Examinations Feed
    const examContainer = document.getElementById("dashboard-exams-list");
    if (examContainer) {
      examContainer.innerHTML = exams.slice(0, 4).map(ex => `
        <div class="feed-item priority-medium">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:var(--primary);">${ex.courseCode}</strong>
            <span style="font-size:11px; background:#fef3c7; color:#b45309; padding:1px 6px; border-radius:4px; font-weight:700;">${ex.date}</span>
          </div>
          <div class="feed-item-title" style="margin-top:2px;">${ex.title}</div>
          <div class="feed-item-meta">📍 ${ex.hall} • ⏰ ${ex.time}</div>
        </div>
      `).join("");
    }

    // 4. Student Birthdays Spotlight
    const bdayContainer = document.getElementById("dashboard-birthdays-list");
    if (bdayContainer) {
      if (metrics.birthdays.length === 0) {
        bdayContainer.innerHTML = `<div style="color:var(--text-muted); font-size:12.5px; padding:12px; text-align:center;">No birthdays in the next 14 days.</div>`;
      } else {
        bdayContainer.innerHTML = metrics.birthdays.map(b => `
          <div class="birthday-item">
            <div style="font-size:24px;">🎂</div>
            <div style="flex-grow:1;">
              <div style="display:flex; align-items:center; gap:8px;">
                <strong style="font-size:13px;">${b.name}</strong>
                ${b.isToday ? '<span class="birthday-badge-today">TODAY!</span>' : ''}
              </div>
              <div style="font-size:11px; color:var(--text-muted);">${b.className} • ${b.dayStr}</div>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="UI.toast('Celebration greetings sent to ${b.name}!', 'success')">🎉 Wish</button>
          </div>
        `).join("");
      }
    }

    // 5. Academic Performance Table / Recent Students
    const recentBody = document.getElementById("dashboard-recent-students-body");
    if (recentBody) {
      const topList = Calculations.computeClassRankings(students, subjects).slice(0, 5);
      recentBody.innerHTML = topList.map(item => `
        <tr>
          <td>
            <div class="student-cell">
              <div class="avatar">${item.name.split(' ').map(n=>n[0]).join('')}</div>
              <div>
                <strong>${item.name}</strong>
                <div style="font-size:11px; color:var(--text-muted);">${item.studentId}</div>
              </div>
            </div>
          </td>
          <td>${item.className}</td>
          <td><span class="badge badge-gpa ${item.gpa >= 3.5 ? 'badge-gpa-high' : 'badge-gpa-mid'}">${item.gpa.toFixed(2)}</span></td>
          <td>${item.attendance}%</td>
          <td><strong style="color:var(--accent);">#${item.rank}</strong></td>
        </tr>
      `).join("");
    }
  },

  // Render Students Directory Table
  renderStudentsTable(students, subjects) {
    const tbody = document.getElementById("students-table-body");
    const countBadge = document.getElementById("students-total-count");
    if (countBadge) countBadge.textContent = `${students.length} Registered Students`;
    if (!tbody) return;

    if (students.length === 0) {
      tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:36px; color:var(--text-muted);">No student records matched search criteria.</td></tr>`;
      return;
    }

    tbody.innerHTML = students.map(s => {
      const gpa = Calculations.calculateGPA(s, subjects);
      const attRate = Calculations.calculateAttendanceRate(s);
      const feeStatus = (s.fees && s.fees.status) ? s.fees.status.toLowerCase() : "paid";

      return `
        <tr>
          <td>
            <div class="student-cell">
              <div class="avatar">${s.firstName.charAt(0)}${s.lastName.charAt(0)}</div>
              <div>
                <strong>${s.firstName} ${s.lastName}</strong>
                <div style="font-size:11px; color:var(--text-muted);">${s.email}</div>
              </div>
            </div>
          </td>
          <td><code style="font-size:12px; font-weight:700; background:var(--bg-main); padding:2px 6px; border-radius:4px;">${s.studentId}</code></td>
          <td>${s.className}</td>
          <td><span class="badge badge-gpa ${gpa >= 3.5 ? 'badge-gpa-high' : gpa >= 2.5 ? 'badge-gpa-mid' : 'badge-gpa-low'}">${gpa.toFixed(2)}</span></td>
          <td><strong>${attRate}%</strong></td>
          <td><span class="badge badge-${feeStatus}">${s.fees ? s.fees.status : 'Paid'}</span></td>
          <td><span class="badge badge-${s.status.toLowerCase()}">${s.status}</span></td>
          <td>
            <div class="action-btns">
              <button class="icon-btn" title="View Digital ID Card" onclick="window.smsApp.openDigitalID('${s.id}')">
                🪪
              </button>
              <button class="icon-btn" title="Official Terminal Report Card" onclick="window.smsApp.openReportCard('${s.id}')">
                📜
              </button>
              <button class="icon-btn" title="Edit Student" onclick="window.smsApp.openEditModal('${s.id}')">
                ✏️
              </button>
              <button class="icon-btn danger" title="Purge Record" onclick="window.smsApp.confirmDelete('${s.id}')">
                🗑️
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");
  },

  // Render Digital Student ID Card Modal
  renderDigitalIDCard(student) {
    const container = document.getElementById("digital-id-modal-container");
    if (!container) return;

    const qrSvg = QRCodeGenerator.generateQRSVG(`ALMUSTAPHA-AUTH::${student.studentId}::VERIFIED`, 120);
    const barcodeSvg = QRCodeGenerator.generateBarcodeSVG(student.studentId, 220, 36);

    container.innerHTML = `
      <div class="digital-id-card-wrap">
        <div class="digital-id-card">
          <div class="id-card-watermark">🎓</div>
          
          <div class="id-card-top">
            <div class="id-card-school-brand">
              <h4>ALMUSTAPHA ACADEMY</h4>
              <span>Official Student Identity Pass</span>
            </div>
            <div class="id-card-chip"></div>
          </div>

          <div class="id-card-content">
            <div class="id-photo-placeholder">
              <span>👤</span>
            </div>
            <div class="id-student-meta">
              <h3>${student.firstName} ${student.lastName}</h3>
              <p>ID: <strong>${student.studentId}</strong></p>
              <p>Class: <strong>${student.className}</strong></p>
              <p>Blood Group: <strong style="color:#fef08a;">${student.bloodGroup || 'O+'}</strong></p>
              <p>Emergency: <strong>${student.guardianPhone || '+1 555-0100'}</strong></p>
            </div>
          </div>

          <div class="id-card-footer">
            <div>${barcodeSvg}</div>
            <div style="border:2px solid #ffffff; border-radius:6px; overflow:hidden;">${qrSvg}</div>
          </div>

          <div style="font-size:9px; text-align:center; color:#cbd5e1; margin-top:10px; letter-spacing:0.04em;">
            ENCRYPTED SMART CARD • VALID FOR ACADEMIC SESSION 2026-2027
          </div>
        </div>
      </div>
    `;
  },

  // Render Official Terminal Report Card Modal
  renderReportCard(student, subjects, rankings) {
    const container = document.getElementById("report-card-modal-container");
    if (!container) return;

    const gpa = Calculations.calculateGPA(student, subjects);
    const attRate = Calculations.calculateAttendanceRate(student);
    const enrollments = student.enrollments || [];
    const studentRank = (rankings.find(r => r.id === student.id) || {}).rank || 1;

    let totalCredits = 0;
    let earnedPoints = 0;

    container.innerHTML = `
      <div class="printable-card" style="padding:16px;">
        <!-- Crest Header -->
        <div style="text-align:center; border-bottom:3px double #0f172a; padding-bottom:14px; margin-bottom:16px;">
          <h2 style="font-size:22px; font-weight:800; color:#0f172a; letter-spacing:0.03em;">ALMUSTAPHA ACADEMY</h2>
          <div style="font-size:12px; font-weight:600; text-transform:uppercase; color:#d97706;">Official Terminal Examination Transcript</div>
          <div style="font-size:11px; color:#64748b;">Royal Knowledge City • Accreditation No: AMA-INT-882 • Academic Term 2 (2026/2027)</div>
        </div>

        <!-- Student Metadata Grid -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; font-size:12px; margin-bottom:16px;">
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Student Name</span><strong>${student.firstName} ${student.lastName}</strong></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Student ID</span><code>${student.studentId}</code></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Class Level</span><strong>${student.className}</strong></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Class Position</span><strong style="color:#1e3a8a; font-size:14px;">Rank #${studentRank} / ${rankings.length}</strong></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Terminal GPA</span><strong style="color:#1e3a8a; font-size:14px;">${gpa.toFixed(2)} / 4.00</strong></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Attendance Rate</span><strong>${attRate}%</strong></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Academic Status</span><span class="badge badge-${student.status.toLowerCase()}">${student.status}</span></div>
          <div><span style="color:#64748b; font-size:10px; text-transform:uppercase; display:block;">Date of Issue</span><span>${new Date().toLocaleDateString()}</span></div>
        </div>

        <!-- Course Results Table -->
        <table class="data-table" style="margin-bottom:16px; font-size:12px;">
          <thead>
            <tr>
              <th>Subject / Course</th>
              <th>Credits</th>
              <th>Midterm (30%)</th>
              <th>CA / Assign (20%)</th>
              <th>Exam (50%)</th>
              <th>Total Score</th>
              <th>Grade</th>
              <th>Points</th>
              <th>Teacher Remark</th>
            </tr>
          </thead>
          <tbody>
            ${enrollments.map(e => {
              const sub = subjects.find(s => s.code === e.courseCode) || { name: e.courseCode, credits: 3 };
              const score = Calculations.computeCourseScore(e.midterm, e.assignment, e.final);
              const grade = Calculations.getGradePoint(score);
              totalCredits += sub.credits;
              earnedPoints += (grade.points * sub.credits);

              return `
                <tr>
                  <td><strong>${e.courseCode}</strong> - ${sub.name}</td>
                  <td>${sub.credits}</td>
                  <td>${e.midterm}</td>
                  <td>${e.assignment}</td>
                  <td>${e.final}</td>
                  <td><strong>${score.toFixed(1)}</strong></td>
                  <td><span class="badge ${grade.badgeClass}">${grade.letter}</span></td>
                  <td>${grade.points.toFixed(1)}</td>
                  <td style="font-size:11px; color:#475569;">${grade.remark}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
        </table>

        <!-- Summary & Endorsement -->
        <div style="border:1px solid #cbd5e1; border-radius:6px; padding:12px; font-size:12px; margin-bottom:20px; background:#f8fafc;">
          <strong>Principal's Overall Evaluation:</strong>
          <p style="margin-top:4px; color:#1e293b;">
            ${gpa >= 3.5 ? "Magnificent academic performance! The student reflects the quintessential values of AlMustapha Academy with intellectual distinction and commendable discipline." :
              gpa >= 2.5 ? "Good and steady academic effort shown this term. Continued reinforcement in laboratory problem-solving will yield higher honors." :
              "Notice of academic intervention: The student needs consistent revision and parental supervision to regain standard standing."}
          </p>
        </div>

        <!-- Official Signatures -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; padding-top:20px; border-top:1px dashed #cbd5e1; font-size:11px;">
          <div>
            <div style="width:140px; border-top:1px solid #000; text-align:center; padding-top:4px;">Class Teacher Signature</div>
          </div>
          <div style="text-align:center;">
            <div style="border:2px solid #1e3a8a; color:#1e3a8a; padding:6px 14px; border-radius:4px; font-weight:800; font-size:11px;">
              ★ ALMUSTAPHA ACADEMY SEAL ★
            </div>
          </div>
          <div style="text-align:right;">
            <div style="width:140px; border-top:1px solid #000; text-align:center; padding-top:4px;">Academic Dean & Registrar</div>
          </div>
        </div>
      </div>
    `;
  },

  // Render Library Management
  renderLibrary(store) {
    const books = store.getLibrary();
    const logs = store.getBorrowLogs();
    const students = store.getStudents();

    const bookTbody = document.getElementById("library-books-body");
    if (bookTbody) {
      bookTbody.innerHTML = books.map(b => `
        <tr>
          <td><code style="font-weight:700;">${b.isbn}</code></td>
          <td><strong>${b.title}</strong></td>
          <td>${b.author}</td>
          <td>${b.category}</td>
          <td><span style="font-weight:700; color:${b.availableCopies > 0 ? 'var(--success)' : 'var(--danger)'};">${b.availableCopies}</span> / ${b.totalCopies}</td>
          <td><span class="badge" style="background:#f1f5f9;">${b.rack}</span></td>
          <td>
            <button class="btn btn-sm btn-primary" ${b.availableCopies <= 0 ? 'disabled' : ''} onclick="window.smsApp.openIssueBookModal('${b.id}')">
              Issue Book
            </button>
          </td>
        </tr>
      `).join("");
    }

    const logsTbody = document.getElementById("library-logs-body");
    if (logsTbody) {
      logsTbody.innerHTML = logs.map(l => {
        const book = books.find(b => b.id === l.bookId) || { title: "Book" };
        return `
          <tr>
            <td><strong>${l.studentName}</strong> <span style="font-size:11px; color:var(--text-muted);">(${l.studentId})</span></td>
            <td>${book.title}</td>
            <td>${l.issueDate}</td>
            <td><strong style="color:var(--accent);">${l.dueDate}</strong></td>
            <td><span class="badge badge-${l.status === 'Active' ? 'active' : 'graduated'}">${l.status}</span></td>
            <td>
              ${l.status === 'Active' ? `<button class="btn btn-sm btn-secondary" onclick="window.smsApp.returnBook('${l.id}')">Check In</button>` : '—'}
            </td>
          </tr>
        `;
      }).join("");
    }
  },

  // Render Dar Al-Hikmah (House of Wisdom & Learning Hub)
  renderDarAlHikmah(store) {
    const dar = store.getDarAlHikmah();
    const quoteEl = document.getElementById("dar-quote-text");
    const scholarEl = document.getElementById("dar-quote-scholar");
    const modulesGrid = document.getElementById("dar-modules-container");

    if (quoteEl) quoteEl.textContent = `"${dar.wisdomOfTheDay.quote}"`;
    if (scholarEl) scholarEl.textContent = `— ${dar.wisdomOfTheDay.scholar}`;

    if (modulesGrid) {
      modulesGrid.innerHTML = dar.modules.map(mod => `
        <div class="content-card" style="padding:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="badge badge-gpa-high">${mod.subject}</span>
            <span style="font-size:11px; color:var(--text-muted);">${mod.flashcards.length} Flashcards</span>
          </div>
          <h3 style="font-size:16px; font-weight:700; margin-bottom:4px;">${mod.title}</h3>
          <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:16px;">${mod.summary}</p>

          <h4 style="font-size:12px; font-weight:700; text-transform:uppercase; margin-bottom:8px; color:var(--primary);">Core Concept Flashcard</h4>
          <div class="flashcard-box" onclick="this.classList.toggle('revealed');">
            <div style="font-weight:600; font-size:13px; margin-bottom:6px;">❓ ${mod.flashcards[0].q}</div>
            <div class="flashcard-answer" style="font-size:12.5px; color:var(--primary); display:none; border-top:1px dashed var(--border-color); padding-top:6px;">
              💡 <strong>Answer:</strong> ${mod.flashcards[0].a}
            </div>
            <div style="font-size:10px; color:var(--text-muted); margin-top:4px;">(Click to reveal answer)</div>
          </div>

          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn btn-sm btn-secondary" onclick="window.smsApp.launchDarQuiz('${mod.id}')">🎯 Start Practice Quiz</button>
            <span style="font-size:11px; color:#d97706; font-weight:700;">★ High Yield</span>
          </div>
        </div>
      `).join("");
    }
  },

  // Render Parent Portal
  renderParentPortal(store, studentId) {
    const students = store.getStudents();
    const select = document.getElementById("parent-student-select");
    const container = document.getElementById("parent-portal-content");

    if (select) {
      select.innerHTML = students.map(s => `<option value="${s.id}" ${s.id === studentId ? 'selected' : ''}>${s.firstName} ${s.lastName} (${s.className})</option>`).join("");
    }

    if (!container) return;
    const student = store.getStudentById(studentId || students[0]?.id);
    if (!student) return;

    const subjects = store.getSubjects();
    const gpa = Calculations.calculateGPA(student, subjects);
    const attRate = Calculations.calculateAttendanceRate(student);

    container.innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:20px;">
        <div class="kpi-card-v2">
          <div class="kpi-icon-v2 kpi-blue">🎓</div>
          <div>
            <div class="kpi-label">Cumulative GPA</div>
            <div class="kpi-num">${gpa.toFixed(2)}</div>
          </div>
        </div>
        <div class="kpi-card-v2">
          <div class="kpi-icon-v2 kpi-green">📅</div>
          <div>
            <div class="kpi-label">Class Attendance</div>
            <div class="kpi-num">${attRate}%</div>
          </div>
        </div>
        <div class="kpi-card-v2">
          <div class="kpi-icon-v2 kpi-gold">💳</div>
          <div>
            <div class="kpi-label">Tuition Status</div>
            <div class="kpi-num" style="font-size:18px;">${student.fees ? student.fees.status : 'Paid'} ($${student.fees ? student.fees.paid : 0} Paid)</div>
          </div>
        </div>
      </div>

      <div class="content-card" style="padding:20px;">
        <h4 style="margin-bottom:12px;">Enrolled Courses & Scores</h4>
        <table class="data-table">
          <thead><tr><th>Course</th><th>Midterm</th><th>Assignment</th><th>Final Exam</th><th>Letter Grade</th></tr></thead>
          <tbody>
            ${(student.enrollments || []).map(e => {
              const score = Calculations.computeCourseScore(e.midterm, e.assignment, e.final);
              const gr = Calculations.getGradePoint(score);
              return `<tr><td><strong>${e.courseCode}</strong></td><td>${e.midterm}</td><td>${e.assignment}</td><td>${e.final}</td><td><span class="badge ${gr.badgeClass}">${gr.letter}</span></td></tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  },

  // Render Online Assignments
  renderAssignments(store) {
    const list = store.getAssignments();
    const tbody = document.getElementById("assignments-table-body");
    if (!tbody) return;

    tbody.innerHTML = list.map(a => `
      <tr>
        <td><strong>${a.title}</strong></td>
        <td><code>${a.courseCode}</code></td>
        <td>${a.teacher}</td>
        <td><strong style="color:var(--accent);">${a.dueDate}</strong></td>
        <td>${a.maxPoints} pts</td>
        <td><span class="badge" style="background:#e0f2fe; color:#0369a1;">${a.submissions} Submissions</span></td>
        <td>
          <button class="btn btn-sm btn-secondary" onclick="UI.toast('Submission portal opened for ${a.title}', 'info')">Submit File</button>
        </td>
      </tr>
    `).join("");
  },

  // Render Audit Logs
  renderAuditLogs(store) {
    const logs = store.getAuditLogs();
    const tbody = document.getElementById("audit-logs-table-body");
    if (!tbody) return;

    tbody.innerHTML = logs.map(l => `
      <tr>
        <td><code>${l.timestamp}</code></td>
        <td><strong>${l.user}</strong> <span class="badge" style="background:#f1f5f9; font-size:10px;">${l.role}</span></td>
        <td><span style="font-weight:600; color:var(--primary);">${l.action}</span></td>
        <td style="font-size:12.5px; color:var(--text-muted);">${l.details}</td>
      </tr>
    `).join("");
  }
};

window.UI = UI;
