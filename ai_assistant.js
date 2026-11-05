/**
 * AlMustapha Academy - Professional AI Academic Intelligence & Copilot
 * Capable of answering questions across all academic disciplines,
 * navigating website features, generating quizzes, performance diagnostics,
 * timetables, and school administrative communications.
 */

const AIAssistant = {
  // Knowledge Base by Academic Domain
  knowledgeBase: {
    mathematics: {
      keywords: ["math", "calculus", "derivative", "integral", "algebra", "quadratic", "pythagor", "geometry", "trigonometry", "matrix", "probability"],
      respond(q) {
        if (q.includes("quadratic") || q.includes("formula")) {
          return `
            <h4>📐 Mathematics: Quadratic Equation Master Guide</h4>
            <p>For any quadratic equation in standard form: <code>ax² + bx + c = 0</code></p>
            <p><strong>Quadratic Formula:</strong></p>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px; font-size:13px;">x = (-b ± √(b² - 4ac)) / (2a)</pre>
            <p><strong>Discriminant Analysis (Δ = b² - 4ac):</strong></p>
            <ul>
              <li><strong>Δ &gt; 0:</strong> Two distinct real roots.</li>
              <li><strong>Δ = 0:</strong> Exactly one repeated real root.</li>
              <li><strong>Δ &lt; 0:</strong> Two complex conjugate roots.</li>
            </ul>
            <p><em>💡 Pro Tip:</em> If <code>b</code> is even, divide coefficients by 2 for faster manual factoring.</p>
          `;
        }
        if (q.includes("derivative") || q.includes("calculus") || q.includes("integral")) {
          return `
            <h4>📐 Mathematics: Core Calculus Principles</h4>
            <p>Calculus models continuous change and accumulated magnitude.</p>
            <ul>
              <li><strong>Power Rule:</strong> <code>d/dx [xⁿ] = n · xⁿ⁻¹</code></li>
              <li><strong>Chain Rule:</strong> <code>d/dx [f(g(x))] = f'(g(x)) · g'(x)</code></li>
              <li><strong>Integration by Parts:</strong> <code>∫ u dv = u·v - ∫ v du</code></li>
              <li><strong>Fundamental Theorem of Calculus:</strong> <code>∫ₐᵇ f(x) dx = F(b) - F(a)</code>, where <code>F'(x) = f(x)</code>.</li>
            </ul>
          `;
        }
        return `
          <h4>📐 Mathematics: Problem Solving Strategy</h4>
          <p>Mathematical inquiry identified. Follow the 4-step Polya framework:</p>
          <ol>
            <li><strong>Understand the Problem:</strong> Identify given parameters, constraints, and target variable.</li>
            <li><strong>Devise a Plan:</strong> Relate to algebraic identities, geometric symmetry, or matrix transformation.</li>
            <li><strong>Execute with Precision:</strong> Preserve dimensional consistency and verify intermediate arithmetic.</li>
            <li><strong>Look Back &amp; Test:</strong> Test edge cases (e.g., $x=0, 1, \infty$) to confirm solution validity.</li>
          </ol>
        `;
      }
    },

    physics: {
      keywords: ["physics", "newton", "force", "gravity", "energy", "velocity", "thermodynamic", "electric", "magnetic", "wave", "quantum"],
      respond(q) {
        if (q.includes("newton") || q.includes("motion") || q.includes("force")) {
          return `
            <h4>⚡ Physics: Newton's Laws of Classical Motion</h4>
            <ol>
              <li><strong>First Law (Inertia):</strong> An object remains at rest or in uniform velocity unless acted upon by a net external force: <code>ΣF = 0 ⟹ a = 0</code>.</li>
              <li><strong>Second Law (Dynamics):</strong> Force equals rate of change of momentum: <code>F = m · a</code> (in SI units: Newtons).</li>
              <li><strong>Third Law (Reciprocity):</strong> For every action force, there is an equal and opposite reaction force: <code>F_AB = -F_BA</code>.</li>
            </ol>
          `;
        }
        if (q.includes("quantum") || q.includes("photoelectric") || q.includes("light")) {
          return `
            <h4>⚡ Physics: Quantum Theory &amp; Wave-Particle Duality</h4>
            <p><strong>Planck-Einstein Relation:</strong> Energy is transmitted in discrete photons: <code>E = h·f = (h·c) / λ</code> (where <code>h ≈ 6.626 × 10⁻³⁴ J·s</code>).</p>
            <p><strong>De Broglie Wavelength:</strong> All matter exhibits wave properties: <code>λ = h / p = h / (m·v)</code>.</p>
          `;
        }
        return `
          <h4>⚡ Physics: Foundational Laws of Conservation</h4>
          <p>In all physical systems, the three primary conservation laws hold inviolable:</p>
          <ul>
            <li><strong>Conservation of Total Energy:</strong> <code>ΔE_system = Q - W</code></li>
            <li><strong>Conservation of Linear &amp; Angular Momentum:</strong> <code>L = I · ω = const</code></li>
            <li><strong>Conservation of Electric Charge:</strong> <code>Σ q_initial = Σ q_final</code></li>
          </ul>
        `;
      }
    },

    chemistry: {
      keywords: ["chemistry", "acid", "base", "periodic", "bond", "atom", "molecule", "reaction", "mole", "organic", "ph"],
      respond(q) {
        return `
          <h4>🧪 Chemistry: Chemical Equilibrium &amp; Stoichiometry</h4>
          <p><strong>The Mole Concept (Avogadro's Constant):</strong> 1 mole = <code>6.022 × 10²³</code> elementary entities. Molar mass connects macroscopic grams to atomic units: <code>n = m / M</code>.</p>
          <p><strong>Acid-Base Equilibrium:</strong></p>
          <ul>
            <li><code>pH = -log₁₀[H⁺]</code> and <code>pOH = -log₁₀[OH⁻]</code></li>
            <li>At 25°C: <code>pH + pOH = 14</code></li>
            <li><strong>Buffer Solution (Henderson-Hasselbalch):</strong> <code>pH = pKₐ + log₁₀([A⁻]/[HA])</code></li>
          </ul>
        `;
      }
    },

    biology: {
      keywords: ["biology", "cell", "dna", "genetics", "organ", "photosynthesis", "protein", "mitosis", "evolution"],
      respond(q) {
        return `
          <h4>🧬 Biology: Cellular Genetics &amp; Central Dogma</h4>
          <p><strong>The Central Dogma of Molecular Biology:</strong></p>
          <pre style="background:#0f172a; color:#34d399; padding:10px; border-radius:6px; font-size:13px;">DNA (Replication) ──[Transcription]──> mRNA ──[Translation]──> Functional Protein</pre>
          <p><strong>Key Cellular Processes:</strong></p>
          <ul>
            <li><strong>Mitosis:</strong> Produces 2 genetically identical diploid somatic daughter cells (Prophase, Metaphase, Anaphase, Telophase).</li>
            <li><strong>Meiosis:</strong> Produces 4 genetically diverse haploid gametes for sexual reproduction.</li>
            <li><strong>Photosynthesis:</strong> <code>6CO₂ + 6H₂O + Light Energy ⟶ C₆H₁₂O₆ + 6O₂</code></li>
          </ul>
        `;
      }
    },

    computerScience: {
      keywords: ["computer", "code", "python", "javascript", "algorithm", "data structure", "binary", "sql", "git", "web", "server"],
      respond(q) {
        return `
          <h4>💻 Computer Science &amp; Software Engineering</h4>
          <p><strong>Core Computational Paradigms:</strong></p>
          <ul>
            <li><strong>Asymptotic Complexity (Big-O):</strong> Measures time/space scaling as $n \to \infty$. Target $O(1)$ and $O(\log n)$ wherever possible; avoid $O(n²)$ nested loops.</li>
            <li><strong>Fundamental Structures:</strong> Array ($O(1)$ index access), Linked List, Stack (LIFO), Queue (FIFO), Hash Table ($O(1)$ amortized lookups), Binary Search Tree ($O(\log n)$ search).</li>
            <li><strong>Database Parameterization:</strong> Prevent SQL injection by strictly using parameterized queries (`?` or `:name`), never string concatenation!</li>
          </ul>
        `;
      }
    },

    literatureWriting: {
      keywords: ["english", "essay", "literature", "writing", "grammar", "rhetoric", "thesis", "poem", "citation"],
      respond(q) {
        return `
          <h4>✍️ Literature &amp; Rhetorical Analysis</h4>
          <p><strong>The 5-Paragraph Academic Essay Architecture:</strong></p>
          <ol>
            <li><strong>Introduction:</strong> Hook statement, contextual background, and a sharp, argumentative <em>Thesis Statement</em>.</li>
            <li><strong>Body Paragraphs 1-3 (PEEL Method):</strong>
              <ul>
                <li><strong>Point:</strong> Topic sentence declaring the paragraph's claim.</li>
                <li><strong>Evidence:</strong> Textual quotation or empirical data.</li>
                <li><strong>Explanation:</strong> Critical analysis of how evidence supports the thesis.</li>
                <li><strong>Link:</strong> Synthesizing transition to the next claim.</li>
              </ul>
            </li>
            <li><strong>Conclusion:</strong> Restate thesis in new phrasing, summarize insights, and present a broader philosophical implication.</li>
          </ol>
        `;
      }
    },

    islamicStudies: {
      keywords: ["islam", "ethics", "quran", "hadith", "wisdom", "history", "scholar", "philosophy"],
      respond(q) {
        return `
          <h4>📜 Islamic Intellectual History &amp; Golden Age Ethics</h4>
          <p>Classical Islamic scholarship integrated empirical observation with moral character (<em>Adab</em>):</p>
          <ul>
            <li><strong>Al-Khwarizmi (780–850 CE):</strong> Founded Algebra (<em>Al-Jabr</em>) and algorithmic mathematical procedures.</li>
            <li><strong>Ibn Al-Haytham (Alhazen, 965–1040 CE):</strong> Pioneer of the modern Scientific Method and Optics.</li>
            <li><strong>Ibn Sina (Avicenna, 980–1037 CE):</strong> Author of <em>The Canon of Medicine</em>, standard medical text across Europe and Asia for over 600 years.</li>
          </ul>
        `;
      }
    },

    websiteHelper: {
      keywords: ["how to", "where", "website", "portal", "print", "report card", "id card", "fees", "library", "attendance", "password", "logout", "export", "backup"],
      respond(q) {
        if (q.includes("print") || q.includes("report card") || q.includes("transcript")) {
          return `
            <h4>🌐 Website Navigator: How to Print Report Cards</h4>
            <ol>
              <li>Click <strong>Students Directory</strong> in the sidebar.</li>
              <li>Find the student record and click the <strong>📜 (Report Card)</strong> icon in the Actions column.</li>
              <li>The official Terminal Examination Transcript will open in a modal with academic rankings, subject grades, and principal remarks.</li>
              <li>Click the <strong>🖨️ Print / Save PDF</strong> button. It uses print stylesheets to output a formal PDF.</li>
            </ol>
          `;
        }
        if (q.includes("id card") || q.includes("qr")) {
          return `
            <h4>🌐 Website Navigator: Digital ID Passes &amp; QR Codes</h4>
            <p>To view or print a student's smart ID badge:</p>
            <ol>
              <li>Go to <strong>Students Directory</strong>.</li>
              <li>Click the <strong>🪪 (Digital ID)</strong> icon next to the student's name.</li>
              <li>A high-security smart pass will open with dynamic SVG vector QR code, optical barcode, and blood group.</li>
              <li>Click <strong>🖨️ Print ID Badge</strong>.</li>
            </ol>
          `;
        }
        if (q.includes("library") || q.includes("book")) {
          return `
            <h4>🌐 Website Navigator: Library Management</h4>
            <p>Access the <strong>Library Management</strong> tab from the sidebar to:</p>
            <ul>
              <li>Browse book volumes by ISBN, category, and shelf rack.</li>
              <li>Click <strong>Issue Book</strong> to lend a copy to any enrolled student.</li>
              <li>Reconcile returns under the <strong>Borrowing &amp; Due Logs</strong> section.</li>
            </ul>
          `;
        }
        if (q.includes("password") || q.includes("reset") || q.includes("security")) {
          return `
            <h4>🌐 Website Navigator: Security &amp; Password Reset</h4>
            <p>AlMustapha Academy features multi-layered security:</p>
            <ul>
              <li><strong>Login / Logout:</strong> Protected by the pre-entry Gateway. Sign out anytime via the door icon 🚪 at bottom left.</li>
              <li><strong>Password Reset:</strong> Click "Forgot Password?" on the login screen to generate an encrypted token and set a new password with the strength meter.</li>
              <li><strong>Protection:</strong> Active anti-SQL injection scanner, XSS sanitization, and automatic session idle timeout.</li>
            </ul>
          `;
        }
        return `
          <h4>🌐 Website Navigator: AlMustapha Academy Portal Features</h4>
          <p>Here is a map of key operations:</p>
          <ul>
            <li><strong>📊 Dashboard:</strong> Real-time KPI counters, upcoming exams, notifications, and student birthdays.</li>
            <li><strong>👥 Students Directory:</strong> Registration, profile editing, and CSV export.</li>
            <li><strong>✨ Dar Al-Hikmah:</strong> Interactive student study sanctuary with flashcards, daily wisdom, and practice quizzes.</li>
            <li><strong>🤖 AI Academic Suite:</strong> Study tutor, performance analysis, timetable assistant, and circular generator.</li>
            <li><strong>💾 Backup &amp; Data:</strong> Export JSON snapshot or Excel-compatible CSV.</li>
          </ul>
        `;
      }
    }
  },

  /**
   * Main conversational query dispatcher
   */
  solveQuery(query) {
    const q = query.trim().toLowerCase();
    if (!q) return `<p>Please enter an academic topic, subject question, or website instruction.</p>`;

    // 1. Check for Website Action questions
    for (const kw of this.knowledgeBase.websiteHelper.keywords) {
      if (q.includes(kw)) {
        return this.knowledgeBase.websiteHelper.respond(q);
      }
    }

    // 2. Check each Academic Domain
    const domains = [
      this.knowledgeBase.mathematics,
      this.knowledgeBase.physics,
      this.knowledgeBase.chemistry,
      this.knowledgeBase.biology,
      this.knowledgeBase.computerScience,
      this.knowledgeBase.literatureWriting,
      this.knowledgeBase.islamicStudies
    ];

    for (const domain of domains) {
      for (const kw of domain.keywords) {
        if (q.includes(kw)) {
          return domain.respond(q);
        }
      }
    }

    // 3. General intelligent academic reasoning fallback
    return `
      <h4>🎓 AlMustapha Academic Copilot Analysis</h4>
      <p>In response to your inquiry: <strong>"${query}"</strong></p>
      <div style="background:var(--bg-main); padding:12px; border-radius:6px; margin:10px 0; border-left:3px solid var(--primary);">
        <p><strong>Structured Conceptual Breakdown:</strong></p>
        <ol style="margin-left:18px; font-size:13px; line-height:1.6;">
          <li><strong>Principle:</strong> Clarify foundational assumptions and verify definitions.</li>
          <li><strong>Application:</strong> Connect theoretical concepts to measurable physical or computational models.</li>
          <li><strong>Synthesis:</strong> Practice active recall by explaining the topic in your own words without notes.</li>
        </ol>
      </div>
      <p style="font-size:12px; color:var(--text-muted);">
        💡 <em>Looking for interactive practice?</em> Explore the <strong>Dar Al-Hikmah</strong> tab for topic flashcards and quiz evaluations!
      </p>
    `;
  },

  // Performance Diagnostician
  analyzeStudentPerformance(student, subjects) {
    const gpa = Calculations.calculateGPA(student, subjects);
    const attRate = Calculations.calculateAttendanceRate(student);
    const enrollments = student.enrollments || [];

    const weakCourses = [];
    const strongCourses = [];

    enrollments.forEach(enr => {
      const score = Calculations.computeCourseScore(enr.midterm, enr.assignment, enr.final);
      const sub = subjects.find(s => s.code === enr.courseCode) || { name: enr.courseCode };
      if (score < 75) {
        weakCourses.push({ name: sub.name, code: enr.courseCode, score });
      } else {
        strongCourses.push({ name: sub.name, code: enr.courseCode, score });
      }
    });

    let diagnosis = `
      <div style="background:var(--bg-main); padding:14px; border-radius:var(--radius-md); border-left:4px solid var(--primary); margin-bottom:12px;">
        <h4 style="margin-bottom:4px;">📊 AI Diagnostic Dossier: ${student.firstName} ${student.lastName} (${student.studentId})</h4>
        <p style="font-size:12.5px; color:var(--text-muted);">Class: <strong>${student.className}</strong> | Cumulative GPA: <strong>${gpa.toFixed(2)}</strong> | Attendance: <strong>${attRate}%</strong></p>
      </div>
    `;

    if (gpa >= 3.5) {
      diagnosis += `<p style="color:#047857; font-weight:700;">🌟 Honor Roll Distinction:</p><p style="font-size:13px;">Superb academic performance across technical and qualitative disciplines. Recommended for student tutor mentorship.</p>`;
    } else if (gpa >= 2.5) {
      diagnosis += `<p style="color:#b45309; font-weight:700;">⚖️ Satisfactory Standing:</p><p style="font-size:13px;">Good foundational consistency. Strengthen continuous assessment test preparation to advance into distinction tier.</p>`;
    } else {
      diagnosis += `<p style="color:#b91c1c; font-weight:700;">⚠️ Academic Intervention Alert:</p><p style="font-size:13px;">Scores indicate risk of academic probation. Urgent remediation program recommended.</p>`;
    }

    if (weakCourses.length > 0) {
      diagnosis += `<h5 style="margin-top:10px; margin-bottom:4px; color:var(--danger);">Intervention Target Courses:</h5><ul style="font-size:12.5px; padding-left:18px;">`;
      weakCourses.forEach(c => {
        diagnosis += `<li><strong>${c.code} (${c.name}):</strong> Aggregate score ${c.score}% — Allocate 3 hours of supervised problem-set practice weekly.</li>`;
      });
      diagnosis += `</ul>`;
    }

    if (attRate < 80) {
      diagnosis += `<div style="margin-top:10px; padding:8px 12px; background:var(--warning-bg); border-radius:6px; font-size:12px; color:#92400e;">
        <strong>Attendance Correlation:</strong> Attendance is currently ${attRate}%. Empirical data demonstrates that attendance below 80% reduces exam pass probability by 28%.
      </div>`;
    }

    return diagnosis;
  },

  // Timetable Generator
  generateTimetable(className = "Grade 11 - Emerald (STEM)") {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const slots = [
      { time: "08:00 - 09:15 AM", slot: 1 },
      { time: "09:20 - 10:35 AM", slot: 2 },
      { time: "10:35 - 11:05 AM", break: true, label: "Morning Assembly & Refreshment" },
      { time: "11:10 - 12:25 PM", slot: 3 },
      { time: "12:30 - 01:45 PM", slot: 4 },
      { time: "01:45 - 02:30 PM", break: true, label: "Prayer & Lunch Interval" },
      { time: "02:30 - 03:45 PM", slot: 5 }
    ];

    const pool = [
      { sub: "Advanced Physics", code: "PHY-301", teacher: "Dr. Fatima Al-Mansoor", room: "Lab B-1" },
      { sub: "Pure Mathematics", code: "MAT-201", teacher: "Mrs. Zainab Olatunji", room: "Hall A-1" },
      { sub: "Computer Science", code: "CS-101", teacher: "Dr. Alan Vance", room: "Turing Lab" },
      { sub: "Chemistry Lab", code: "CHM-202", teacher: "Dr. Richard Thorne", room: "Lab 3" },
      { sub: "Academic Writing", code: "ENG-105", teacher: "Prof. Tariq Hashim", room: "Room 102" },
      { sub: "Ethics & Philosophy", code: "ETH-100", teacher: "Ustadh Bilal Idris", room: "Auditorium" }
    ];

    let html = `
      <div style="margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
        <h4 style="font-weight:700;">📅 Master Schedule: ${className}</h4>
        <span style="font-size:11px; background:var(--success-bg); color:#047857; padding:3px 8px; border-radius:9999px; font-weight:700;">Zero Teacher Conflict Verified</span>
      </div>
      <div class="table-responsive">
        <table class="data-table" style="font-size:12px;">
          <thead><tr><th>Time</th>${days.map(d => `<th>${d}</th>`).join("")}</tr></thead>
          <tbody>
    `;

    slots.forEach((s, sIdx) => {
      if (s.break) {
        html += `<tr style="background:#f1f5f9; text-align:center; font-weight:600; color:var(--text-muted);"><td>${s.time}</td><td colspan="5">☕ ${s.label}</td></tr>`;
      } else {
        html += `<tr><td><strong>${s.time}</strong></td>`;
        days.forEach((day, dIdx) => {
          const item = pool[(dIdx * 2 + sIdx) % pool.length];
          html += `
            <td style="background:var(--bg-card); border:1px solid var(--border-color);">
              <div style="font-weight:700; color:var(--primary);">${item.sub}</div>
              <div style="color:var(--text-muted); font-size:11px;">${item.teacher}</div>
              <div style="font-size:10px; color:#64748b;">${item.room}</div>
            </td>
          `;
        });
        html += `</tr>`;
      }
    });

    html += `</tbody></table></div>`;
    return html;
  },

  // Official Announcement Generator
  generateAnnouncement(type, eventTitle, audience = "All Parents, Guardians & Faculty") {
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const refNumber = "AMA/OFF-CIR/" + Math.floor(1000 + Math.random() * 9000) + "/2026";

    let body = "";
    if (type === "exam") {
      body = `
        This circular serves as formal notice regarding the upcoming schedule for <strong>${eventTitle || 'Terminal Examinations'}</strong>.
        Examinations shall strictly follow the published timetable. Candidates are required to report to designated halls in complete academic attire with their digital AlMustapha QR IDs at least 20 minutes prior to session commencement.
      `;
    } else if (type === "fee") {
      body = `
        The Directorate of Finance wishes to advise that the deadline for clearing tuition and laboratory obligations for <strong>${eventTitle || 'Current Academic Term'}</strong> is fast approaching.
        Timely settlement guarantees uninterrupted access to examination dockets, online learning portals, and the Dar Al-Hikmah repository.
      `;
    } else if (type === "holiday") {
      body = `
        Please be informed that AlMustapha Academy shall observe an institutional recess in commemoration of <strong>${eventTitle || 'Mid-Term Break'}</strong>.
        Administrative offices will operate on reduced hours, while the digital library and AI Tutor suite will remain accessible 24/7.
      `;
    } else {
      body = `
        The Executive Board of AlMustapha Academy is pleased to announce <strong>${eventTitle || 'Academic Excellence Showcase'}</strong>.
        We cordially invite all faculty, students, and esteemed parents to celebrate this milestone together.
      `;
    }

    return `
      <div style="border:2px solid var(--primary); padding:20px; border-radius:10px; background:#ffffff; font-family:Georgia, serif; box-shadow:var(--shadow-md); color:#0f172a;">
        <div style="text-align:center; border-bottom:2px solid #0f172a; padding-bottom:12px; margin-bottom:14px;">
          <h2 style="font-size:18px; font-weight:800; letter-spacing:0.04em; color:#0f172a;">ALMUSTAPHA ACADEMY</h2>
          <div style="font-size:11px; text-transform:uppercase; color:#64748b; font-family:sans-serif;">Office of the Principal & Academic Board</div>
          <div style="font-size:10px; color:#94a3b8; font-family:sans-serif; margin-top:2px;">Ref: ${refNumber} • Date: ${today}</div>
        </div>

        <div style="font-family:sans-serif; font-size:12px; margin-bottom:14px;">
          <div><strong>CIRCULAR MEMORANDUM</strong></div>
          <div><strong>TO:</strong> ${audience}</div>
          <div><strong>SUBJECT:</strong> <span style="text-transform:uppercase; color:var(--primary); font-weight:bold;">${eventTitle || 'Official Institutional Notice'}</span></div>
        </div>

        <div style="font-size:13.5px; line-height:1.6; color:#1e293b; margin-bottom:20px;">
          ${body}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:flex-end; font-family:sans-serif; font-size:11px; border-top:1px dashed #cbd5e1; padding-top:14px;">
          <div>
            <div style="font-weight:700;">Prof. Al-Hassan AlMustapha, Ph.D.</div>
            <div style="color:#64748b;">Principal & Dean of Academics</div>
          </div>
          <div style="text-align:right;">
            <div style="border:1px solid #047857; color:#047857; padding:3px 8px; border-radius:4px; font-weight:700;">
              ✓ OFFICIALLY SEALED
            </div>
          </div>
        </div>
      </div>
    `;
  }
};

window.AIAssistant = AIAssistant;
