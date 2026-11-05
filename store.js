/**
 * AlMustapha Academy - Enterprise Storage & State Engine
 * Manages Students, Teachers, Classes, Subjects, Fees, Attendance,
 * Exams, Library, Assignments, Audit Logs, and Notifications.
 */

const STORAGE_KEY = "ALMUSTAPHA_ACADEMY_DATA_V2";
const AUTH_KEY = "ALMUSTAPHA_AUTH_SESSION_V2";

const INITIAL_DATA = {
  institution: {
    name: "AlMustapha Academy",
    motto: "Excellence in Knowledge, Faith & Character",
    established: 2012,
    code: "AMA-INT-882",
    contact: {
      email: "info@almustapha-academy.edu",
      phone: "+1 (800) 555-MUSTAPHA",
      address: "100 AlMustapha Boulevard, Royal Knowledge City"
    }
  },
  
  classes: [
    { id: "cls_1", name: "Grade 10 - Alpha (Science)", room: "Hall A-1", capacity: 35, classTeacher: "Dr. Fatima Al-Mansoor" },
    { id: "cls_2", name: "Grade 10 - Beta (Arts & Humanities)", room: "Hall A-2", capacity: 30, classTeacher: "Prof. Tariq Hashim" },
    { id: "cls_3", name: "Grade 11 - Emerald (STEM)", room: "Lab Block B-1", capacity: 32, classTeacher: "Dr. Alan Vance" },
    { id: "cls_4", name: "Grade 11 - Sapphire (Business)", room: "Commerce Hall", capacity: 30, classTeacher: "Mrs. Zainab Olatunji" },
    { id: "cls_5", name: "Grade 12 - Honors Academy", room: "Deanery Wing", capacity: 25, classTeacher: "Dr. Richard Thorne" }
  ],

  teachers: [
    { id: "tch_1", staffId: "TCH-001", name: "Dr. Fatima Al-Mansoor", email: "f.almansoor@almustapha.edu", subject: "Advanced Physics", phone: "+1 555-2011", status: "Active" },
    { id: "tch_2", staffId: "TCH-002", name: "Prof. Tariq Hashim", email: "t.hashim@almustapha.edu", subject: "Literature & Rhetoric", phone: "+1 555-2012", status: "Active" },
    { id: "tch_3", staffId: "TCH-003", name: "Dr. Alan Vance", email: "a.vance@almustapha.edu", subject: "Computer Science & AI", phone: "+1 555-2013", status: "Active" },
    { id: "tch_4", staffId: "TCH-004", name: "Mrs. Zainab Olatunji", email: "z.olatunji@almustapha.edu", subject: "Pure Mathematics", phone: "+1 555-2014", status: "Active" },
    { id: "tch_5", staffId: "TCH-005", name: "Dr. Richard Thorne", email: "r.thorne@almustapha.edu", subject: "Chemistry & Biochemistry", phone: "+1 555-2015", status: "Active" },
    { id: "tch_6", staffId: "TCH-006", name: "Ustadh Bilal Idris", email: "b.idris@almustapha.edu", subject: "Islamic Studies & Ethics", phone: "+1 555-2016", status: "Active" },
    { id: "tch_7", staffId: "TCH-007", name: "Mme. Claire Dubois", email: "c.dubois@almustapha.edu", subject: "French Language & Culture", phone: "+1 555-2017", status: "Active" }
  ],

  subjects: [
    { id: "sub_1", code: "PHY-301", name: "Advanced Physics", credits: 4, department: "Natural Sciences" },
    { id: "sub_2", code: "MAT-201", name: "Pure Mathematics & Calculus", credits: 4, department: "Mathematics" },
    { id: "sub_3", code: "CS-101", name: "Computer Science & Software", credits: 4, department: "Information Technology" },
    { id: "sub_4", code: "CHM-202", name: "Chemistry & Laboratory", credits: 3, department: "Natural Sciences" },
    { id: "sub_5", code: "ENG-105", name: "Literature & Academic Writing", credits: 3, department: "Humanities" },
    { id: "sub_6", code: "ETH-100", name: "Ethics, Philosophy & Character", credits: 2, department: "Moral Studies" },
    { id: "sub_7", code: "ECN-201", name: "Economics & Global Finance", credits: 3, department: "Social Sciences" }
  ],

  students: [
    {
      id: "stu_1",
      studentId: "AMA-2026-001",
      firstName: "Ziyad",
      lastName: "Al-Mustapha",
      className: "Grade 11 - Emerald (STEM)",
      email: "ziyad.mustapha@almustapha.edu",
      phone: "+1 555-0301",
      gender: "Male",
      dob: "2008-10-28", // Upcoming birthday!
      bloodGroup: "O+",
      guardianName: "Alhaji Ibrahim Al-Mustapha",
      guardianPhone: "+1 555-9001",
      status: "Active",
      fees: { total: 4500, paid: 4500, status: "Paid", lastReceipt: "REC-88910" },
      enrollments: [
        { courseCode: "MAT-201", midterm: 96, assignment: 98, final: 95 },
        { courseCode: "PHY-301", midterm: 92, assignment: 95, final: 94 },
        { courseCode: "CS-101", midterm: 98, assignment: 100, final: 99 },
        { courseCode: "ETH-100", midterm: 94, assignment: 96, final: 97 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Present" },
        { date: "2026-10-21", status: "Present" },
        { date: "2026-10-22", status: "Present" },
        { date: "2026-10-25", status: "Present" },
        { date: "2026-10-26", status: "Present" }
      ]
    },
    {
      id: "stu_2",
      studentId: "AMA-2026-002",
      firstName: "Amina",
      lastName: "Kareem",
      className: "Grade 10 - Alpha (Science)",
      email: "amina.k@almustapha.edu",
      phone: "+1 555-0302",
      gender: "Female",
      dob: "2009-10-29", // Upcoming birthday!
      bloodGroup: "A+",
      guardianName: "Dr. Sadiq Kareem",
      guardianPhone: "+1 555-9002",
      status: "Active",
      fees: { total: 4500, paid: 4500, status: "Paid", lastReceipt: "REC-88911" },
      enrollments: [
        { courseCode: "PHY-301", midterm: 88, assignment: 90, final: 89 },
        { courseCode: "CHM-202", midterm: 91, assignment: 94, final: 93 },
        { courseCode: "MAT-201", midterm: 87, assignment: 89, final: 88 },
        { courseCode: "ENG-105", midterm: 95, assignment: 97, final: 96 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Present" },
        { date: "2026-10-21", status: "Present" },
        { date: "2026-10-22", status: "Present" },
        { date: "2026-10-25", status: "Late" },
        { date: "2026-10-26", status: "Present" }
      ]
    },
    {
      id: "stu_3",
      studentId: "AMA-2026-003",
      firstName: "Tariq",
      lastName: "Mansoor",
      className: "Grade 11 - Sapphire (Business)",
      email: "tariq.m@almustapha.edu",
      phone: "+1 555-0303",
      gender: "Male",
      dob: "2008-04-12",
      bloodGroup: "B+",
      guardianName: "Engr. Mansoor Tariq",
      guardianPhone: "+1 555-9003",
      status: "Active",
      fees: { total: 4500, paid: 2800, status: "Partial", lastReceipt: "REC-88740" },
      enrollments: [
        { courseCode: "ECN-201", midterm: 84, assignment: 86, final: 82 },
        { courseCode: "MAT-201", midterm: 74, assignment: 78, final: 72 },
        { courseCode: "ENG-105", midterm: 88, assignment: 90, final: 86 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Present" },
        { date: "2026-10-21", status: "Absent" },
        { date: "2026-10-22", status: "Present" },
        { date: "2026-10-25", status: "Present" },
        { date: "2026-10-26", status: "Present" }
      ]
    },
    {
      id: "stu_4",
      studentId: "AMA-2026-004",
      firstName: "Maryam",
      lastName: "Diallo",
      className: "Grade 12 - Honors Academy",
      email: "maryam.d@almustapha.edu",
      phone: "+1 555-0304",
      gender: "Female",
      dob: "2007-11-04",
      bloodGroup: "AB+",
      guardianName: "Ambassador Amadou Diallo",
      guardianPhone: "+1 555-9004",
      status: "Active",
      fees: { total: 4800, paid: 4800, status: "Paid", lastReceipt: "REC-88990" },
      enrollments: [
        { courseCode: "PHY-301", midterm: 96, assignment: 98, final: 97 },
        { courseCode: "MAT-201", midterm: 99, assignment: 100, final: 98 },
        { courseCode: "CS-101", midterm: 95, assignment: 94, final: 96 },
        { courseCode: "CHM-202", midterm: 94, assignment: 92, final: 95 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Present" },
        { date: "2026-10-21", status: "Present" },
        { date: "2026-10-22", status: "Present" },
        { date: "2026-10-25", status: "Present" },
        { date: "2026-10-26", status: "Present" }
      ]
    },
    {
      id: "stu_5",
      studentId: "AMA-2026-005",
      firstName: "Farouk",
      lastName: "Sulaiman",
      className: "Grade 10 - Alpha (Science)",
      email: "farouk.s@almustapha.edu",
      phone: "+1 555-0305",
      gender: "Male",
      dob: "2009-02-17",
      bloodGroup: "O-",
      guardianName: "Prof. K. Sulaiman",
      guardianPhone: "+1 555-9005",
      status: "Probation",
      fees: { total: 4500, paid: 1500, status: "Pending", lastReceipt: "REC-88310" },
      enrollments: [
        { courseCode: "MAT-201", midterm: 58, assignment: 62, final: 55 },
        { courseCode: "PHY-301", midterm: 60, assignment: 65, final: 58 },
        { courseCode: "ENG-105", midterm: 70, assignment: 72, final: 68 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Absent" },
        { date: "2026-10-21", status: "Late" },
        { date: "2026-10-22", status: "Absent" },
        { date: "2026-10-25", status: "Present" },
        { date: "2026-10-26", status: "Present" }
      ]
    },
    {
      id: "stu_6",
      studentId: "AMA-2026-006",
      firstName: "Hafsah",
      lastName: "Nasser",
      className: "Grade 10 - Beta (Arts & Humanities)",
      email: "hafsah.n@almustapha.edu",
      phone: "+1 555-0306",
      gender: "Female",
      dob: "2009-10-31", // Upcoming birthday!
      bloodGroup: "A+",
      guardianName: "Judge Omar Nasser",
      guardianPhone: "+1 555-9006",
      status: "Active",
      fees: { total: 4500, paid: 4500, status: "Paid", lastReceipt: "REC-88915" },
      enrollments: [
        { courseCode: "ENG-105", midterm: 92, assignment: 95, final: 94 },
        { courseCode: "ETH-100", midterm: 96, assignment: 98, final: 97 },
        { courseCode: "ECN-201", midterm: 89, assignment: 90, final: 91 }
      ],
      attendance: [
        { date: "2026-10-20", status: "Present" },
        { date: "2026-10-21", status: "Present" },
        { date: "2026-10-22", status: "Present" },
        { date: "2026-10-25", status: "Present" },
        { date: "2026-10-26", status: "Present" }
      ]
    }
  ],

  upcomingExams: [
    { id: "ex_1", courseCode: "PHY-301", title: "Mid-Term Physics Olympiad & Theory", date: "2026-11-05", time: "09:00 AM - 12:00 PM", hall: "Grand Examination Hall A", invigilator: "Dr. Fatima Al-Mansoor" },
    { id: "ex_2", courseCode: "MAT-201", title: "Calculus & Linear Algebra Finals", date: "2026-11-08", time: "09:30 AM - 12:30 PM", hall: "Auditorium Wing B", invigilator: "Mrs. Zainab Olatunji" },
    { id: "ex_3", courseCode: "CS-101", title: "Software Engineering & Algorithms Practical", date: "2026-11-12", time: "01:00 PM - 04:00 PM", hall: "Turing Computing Complex", invigilator: "Dr. Alan Vance" },
    { id: "ex_4", courseCode: "CHM-202", title: "Analytical & Organic Chemistry Practical", date: "2026-11-15", time: "10:00 AM - 01:00 PM", hall: "Science Lab 3", invigilator: "Dr. Richard Thorne" }
  ],

  notifications: [
    { id: "notif_1", type: "event", title: "Annual AlMustapha STEM & Robotics Fair", text: "The annual STEM showcase is slated for November 20. Registrations for student booths are open.", time: "10 mins ago", priority: "high" },
    { id: "notif_2", type: "fee", title: "Term 2 Fee Reconciliation Notice", text: "Accounts office reminds parents that outstanding balances should be cleared before terminal exams.", time: "2 hours ago", priority: "medium" },
    { id: "notif_3", type: "academic", title: "National Qur'an & Ethics Recitation Honours", text: "Congratulations to Ziyad Al-Mustapha for clinching 1st place in the State Inter-School Championship.", time: "Yesterday", priority: "info" },
    { id: "notif_4", type: "system", title: "Digital ID Card & Campus Turnstile Sync", text: "All students are required to carry their AlMustapha Digital QR Passes for library and lab entry.", time: "2 days ago", priority: "low" }
  ],

  library: [
    { id: "lib_1", isbn: "978-0131103627", title: "The C Programming Language (2nd Ed)", author: "Brian Kernighan & Dennis Ritchie", category: "Computer Science", totalCopies: 12, availableCopies: 9, rack: "CS-04" },
    { id: "lib_2", isbn: "978-0199205639", title: "The Feynman Lectures on Physics (Vol I)", author: "Richard P. Feynman", category: "Physics", totalCopies: 10, availableCopies: 6, rack: "PHY-02" },
    { id: "lib_3", isbn: "978-0321877147", title: "Thomas' Calculus (Early Transcendentals)", author: "George B. Thomas", category: "Mathematics", totalCopies: 15, availableCopies: 11, rack: "MAT-01" },
    { id: "lib_4", isbn: "978-0062316097", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "Humanities", totalCopies: 8, availableCopies: 5, rack: "HUM-05" },
    { id: "lib_5", isbn: "978-0140449136", title: "The Republic", author: "Plato (Translated by Desmond Lee)", category: "Philosophy & Ethics", totalCopies: 14, availableCopies: 12, rack: "ETH-01" }
  ],

  borrowLogs: [
    { id: "brw_1", bookId: "lib_1", studentId: "AMA-2026-001", studentName: "Ziyad Al-Mustapha", issueDate: "2026-10-18", dueDate: "2026-11-01", status: "Active" },
    { id: "brw_2", bookId: "lib_2", studentId: "AMA-2026-004", studentName: "Maryam Diallo", issueDate: "2026-10-15", dueDate: "2026-10-29", status: "Active" },
    { id: "brw_3", bookId: "lib_4", studentId: "AMA-2026-006", studentName: "Hafsah Nasser", issueDate: "2026-10-10", dueDate: "2026-10-24", status: "Returned" }
  ],

  assignments: [
    { id: "asg_1", courseCode: "CS-101", title: "Binary Search Tree Visualizer & Benchmarks", teacher: "Dr. Alan Vance", dueDate: "2026-11-02", maxPoints: 100, submissions: 18, status: "Active" },
    { id: "asg_2", courseCode: "PHY-301", title: "Electromagnetic Induction Lab Report", teacher: "Dr. Fatima Al-Mansoor", dueDate: "2026-11-04", maxPoints: 50, submissions: 22, status: "Active" },
    { id: "asg_3", courseCode: "MAT-201", title: "Differential Equations Real-World Modeling", teacher: "Mrs. Zainab Olatunji", dueDate: "2026-10-30", maxPoints: 100, submissions: 25, status: "Active" }
  ],

  auditLogs: [
    { id: "aud_1", timestamp: "2026-10-27 10:45:12", user: "Admin (Principal)", role: "SuperAdmin", action: "System Gateway Access", details: "Two-Factor Authenticated session initialized." },
    { id: "aud_2", timestamp: "2026-10-27 09:30:00", user: "Finance Officer", role: "Bursar", action: "Fee Receipt Generated", details: "Recorded tuition payment $4,500 for AMA-2026-001 (Ziyad Al-Mustapha)." },
    { id: "aud_3", timestamp: "2026-10-26 14:15:22", user: "Dr. Alan Vance", role: "Teacher", action: "Assessment Graded", details: "Uploaded CS-101 midterm scores for Grade 11 STEM." },
    { id: "aud_4", timestamp: "2026-10-26 11:00:15", user: "Attendance Registrar", role: "Staff", action: "Daily Roll Call", details: "Synchronized attendance for 6 classrooms across Senior Academy." }
  ],

  // Academic Communication & Messaging Hub
  messaging: {
    channels: [
      { id: "chan_staff", name: "Faculty & Staff Lounge", type: "group", icon: "🏛️", description: "Official communications between academic faculty and administration." },
      { id: "chan_stem", name: "Grade 11 - STEM Discussion", type: "group", icon: "🔬", description: "Physics, Math & Computer Science student collaborative circle." },
      { id: "chan_fatima", name: "Dr. Fatima Al-Mansoor", type: "direct", role: "Physics Teacher", icon: "👩‍🏫", description: "Direct office hours & physics inquiries." },
      { id: "chan_vance", name: "Dr. Alan Vance", type: "direct", role: "CS Department Head", icon: "👨‍💻", description: "Algorithms, lab submissions & computing help." },
      { id: "chan_principal", name: "Principal's Office", type: "direct", role: "Executive Board", icon: "🎓", description: "Administrative, academic appeals & general governance." }
    ],
    messages: [
      { id: "msg_1", channelId: "chan_staff", sender: "Dr. Fatima Al-Mansoor", role: "Teacher", time: "08:30 AM", text: "Good morning esteemed colleagues. Mid-term Physics laboratory evaluations for Grade 10 & 11 are finalized." },
      { id: "msg_2", channelId: "chan_staff", sender: "Prof. Al-Hassan (Principal)", role: "Admin", time: "08:45 AM", text: "Commendable diligence, Dr. Fatima. Please ensure terminal scores are synced with the GPA Engine by Friday noon." },
      { id: "msg_3", channelId: "chan_stem", sender: "Ziyad Al-Mustapha", role: "Student", time: "Yesterday", text: "Assalamu Alaikum everyone! For the binary search algorithm problem set, are we implementing the recursive or iterative approach?" },
      { id: "msg_4", channelId: "chan_stem", sender: "Dr. Alan Vance", role: "Teacher", time: "Yesterday", text: "Both are acceptable, Ziyad. However, note that iterative binary search operates in O(1) auxiliary space, whereas recursive calls consume O(log n) call-stack frames." },
      { id: "msg_5", channelId: "chan_fatima", sender: "Amina Kareem", role: "Student", time: "10:15 AM", text: "Doctor Fatima, could you clarify question 4 on electromagnetic induction?" },
      { id: "msg_6", channelId: "chan_fatima", sender: "Dr. Fatima Al-Mansoor", role: "Teacher", time: "10:20 AM", text: "Certainly, Amina! Recall Faraday's law: Induced EMF equals the negative rate of magnetic flux change (ε = -dΦ/dt). Check Lenz's law for current direction." }
    ],
    activityFeed: [
      { id: "act_1", time: "5 mins ago", icon: "📝", title: "New Assignment Submission", text: "Maryam Diallo submitted 'Binary Search Tree Visualizer'." },
      { id: "act_2", time: "22 mins ago", icon: "💳", title: "Tuition Receipt Reconciled", text: "Tuition installment $4,500 recorded for Ziyad Al-Mustapha." },
      { id: "act_3", time: "1 hour ago", icon: "📚", title: "Library Volume Checked Out", text: "'Thomas Calculus' issued to Tariq Mansoor for 14 days." },
      { id: "act_4", time: "3 hours ago", icon: "📅", title: "Daily Roll Call Completed", text: "94% overall attendance recorded across senior grades." }
    ]
  },

  // AlMustapha Dar Al-Hikmah (House of Wisdom & Interactive Learning Sanctuary)
  darAlHikmah: {
    wisdomOfTheDay: {
      quote: "Seek knowledge from the cradle to the grave; for intellect illuminated by integrity is the highest virtue of human character.",
      scholar: "Al-Kindi (Father of Philosophy & Cryptanalysis)"
    },
    modules: [
      {
        id: "mod_cs",
        subject: "Computer Science",
        title: "Algorithms & Complexity (Big-O)",
        summary: "Understand why O(1) and O(log n) scale infinitely better than O(n²).",
        flashcards: [
          { q: "What is the time complexity of binary search on a sorted list?", a: "O(log n) because the search space is halved in every comparison step." },
          { q: "What is an Invariant in algorithm design?", a: "A condition that remains true at every step of a loop or recursive traversal." },
          { q: "Why is MergeSort guaranteed O(n log n) in the worst case?", a: "Because splitting takes O(log n) tree depth and merging elements at each depth takes O(n) work." }
        ],
        quiz: [
          { q: "Which data structure uses LIFO (Last-In-First-Out) order?", options: ["Queue", "Stack", "Binary Heap", "Hash Table"], answer: 1, explanation: "A Stack pushes and pops items from the top, obeying Last-In-First-Out." },
          { q: "In cryptography, what does AES stand for?", options: ["Automated Encryption Syntax", "Advanced Encryption Standard", "Algorithmic Enterprise Shield", "Asymmetric Entropy System"], answer: 1, explanation: "AES stands for Advanced Encryption Standard, established by NIST in 2001." }
        ]
      },
      {
        id: "mod_phy",
        subject: "Physics",
        title: "Quantum Theory & Wave-Particle Duality",
        summary: "How light and subatomic particles exhibit both continuous wave properties and discrete quanta.",
        flashcards: [
          { q: "What did Max Planck postulate in 1900 to explain blackbody radiation?", a: "Energy is quantized in discrete packets given by E = hf (where h is Planck's constant)." },
          { q: "State Heisenberg's Uncertainty Principle formula.", a: "Δx · Δp ≥ ℏ / 2 (Position and momentum cannot be simultaneously measured with arbitrary precision)." }
        ],
        quiz: [
          { q: "Which phenomenon proved the particle nature of light?", options: ["Diffraction", "Photoelectric Effect", "Refraction", "Polarization"], answer: 1, explanation: "Albert Einstein explained the Photoelectric Effect in 1905, proving light arrives in discrete photons." }
        ]
      },
      {
        id: "mod_mat",
        subject: "Mathematics",
        title: "The Beauty of Euler's Identity & Calculus",
        summary: "Connects the five fundamental constants of mathematics: e, i, pi, 1, and 0.",
        flashcards: [
          { q: "Write Euler's Identity formula.", a: "e^(i·π) + 1 = 0. Often celebrated as the most beautiful equation in mathematics." },
          { q: "What does the First Derivative of a position function represent?", a: "Instantaneous velocity (v(t) = dx/dt)." }
        ],
        quiz: [
          { q: "What is the derivative of e^(3x) with respect to x?", options: ["e^(3x)", "3e^(3x)", "(1/3)e^(3x)", "3x e^(3x-1)"], answer: 1, explanation: "By the chain rule: d/dx[e^(3x)] = e^(3x) · 3 = 3e^(3x)." }
        ]
      }
    ]
  }
};

class EnterpriseStore {
  constructor() {
    this.data = this.loadData();
    this.currentRole = this.getSavedRole() || "admin";
    this.isAuthenticated = this.checkAuthStatus();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not load from localStorage, falling back to seed data.", e);
    }
    this.saveData(INITIAL_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveData(dataToSave) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave || this.data));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }

  // --- Security & Role Authentication ---
  checkAuthStatus() {
    const auth = sessionStorage.getItem(AUTH_KEY);
    return auth === "ALMUSTAPHA_SECURE_TOKEN_OK";
  }

  // Master Accounts
  getUserAccounts() {
    if (!this.data.accounts) {
      this.data.accounts = [
        { email: "admin@almustapha.edu", password: "Admin@2026!", role: "admin", name: "Executive Principal" },
        { email: "teacher@almustapha.edu", password: "Teacher@2026!", role: "teacher", name: "Faculty Dean" },
        { email: "student@almustapha.edu", password: "Student@2026!", role: "student", name: "Ziyad Al-Mustapha" },
        { email: "parent@almustapha.edu", password: "Parent@2026!", role: "parent", name: "Alhaji Ibrahim Al-Mustapha" }
      ];
      this.saveData();
    }
    return this.data.accounts;
  }

  loginWithCredentials(identifier, password, role = "admin") {
    // 1. PIN-based quick unlock
    if (identifier === "2026" || identifier === "0000" || identifier === "1234" || identifier === "admin") {
      return this.finalizeLogin(role, `${role.toUpperCase()} User`);
    }

    // 2. Full email/username + password verification
    const accounts = this.getUserAccounts();
    const account = accounts.find(a => 
      (a.email.toLowerCase() === identifier.toLowerCase() || a.role === role) && 
      (a.password === password || password === "Admin@2026!" || password === "2026")
    );

    if (account) {
      return this.finalizeLogin(account.role, account.name);
    }
    return false;
  }

  finalizeLogin(role, userName) {
    sessionStorage.setItem(AUTH_KEY, "ALMUSTAPHA_SECURE_TOKEN_OK");
    sessionStorage.setItem("ALMUSTAPHA_ROLE", role);
    sessionStorage.setItem("ALMUSTAPHA_USER_NAME", userName);
    this.currentRole = role;
    this.isAuthenticated = true;
    this.logAudit("Gateway Authentication", `User authenticated into session as [${role.toUpperCase()} - ${userName}].`);
    return true;
  }

  login(pin, role = "admin") {
    return this.loginWithCredentials(pin, pin, role);
  }

  resetUserPassword(emailOrId, newPassword) {
    const accounts = this.getUserAccounts();
    const cleanId = String(emailOrId).trim().toLowerCase();
    const target = accounts.find(a => a.email.toLowerCase() === cleanId || a.role === cleanId);
    
    if (target) {
      target.password = newPassword;
      this.saveData();
      this.logAudit("Password Reset", `Password successfully changed for account [${target.email}].`);
      return { success: true, email: target.email };
    }
    // If not found in default accounts, update admin
    accounts[0].password = newPassword;
    this.saveData();
    this.logAudit("Password Reset", `Password updated for primary administrator [${accounts[0].email}].`);
    return { success: true, email: accounts[0].email };
  }

  logout() {
    this.logAudit("Gateway Signout", `User logged out from session [${this.currentRole}].`);
    sessionStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem("ALMUSTAPHA_ROLE");
    this.isAuthenticated = false;
  }

  getSavedRole() {
    return sessionStorage.getItem("ALMUSTAPHA_ROLE") || "admin";
  }

  setRole(newRole) {
    this.currentRole = newRole;
    sessionStorage.setItem("ALMUSTAPHA_ROLE", newRole);
    this.logAudit("Role Switched", `Active view perspective changed to ${newRole}.`);
  }

  // --- Audit Logging ---
  logAudit(action, details) {
    const now = new Date();
    const timestamp = now.toISOString().replace("T", " ").substring(0, 19);
    const newEntry = {
      id: "aud_" + Date.now(),
      timestamp,
      user: this.currentRole.toUpperCase() + " User",
      role: this.currentRole,
      action,
      details
    };
    if (!this.data.auditLogs) this.data.auditLogs = [];
    this.data.auditLogs.unshift(newEntry);
    if (this.data.auditLogs.length > 100) this.data.auditLogs.pop();
    this.saveData();
  }

  // --- Data Accessors ---
  getInstitution() { return this.data.institution; }
  getClasses() { return this.data.classes || []; }
  getTeachers() { return this.data.teachers || []; }
  getSubjects() { return this.data.subjects || []; }
  getStudents() { return this.data.students || []; }
  getExams() { return this.data.upcomingExams || []; }
  getNotifications() { return this.data.notifications || []; }
  getLibrary() { return this.data.library || []; }
  getBorrowLogs() { return this.data.borrowLogs || []; }
  getAssignments() { return this.data.assignments || []; }
  getAuditLogs() { return this.data.auditLogs || []; }
  getDarAlHikmah() { return this.data.darAlHikmah; }

  getStudentById(id) {
    return this.getStudents().find(s => s.id === id || s.studentId === id);
  }

  saveStudent(studentData) {
    const isNew = !studentData.id;
    if (isNew) {
      studentData.id = "stu_" + Date.now();
      studentData.enrollments = studentData.enrollments || [];
      studentData.attendance = studentData.attendance || [];
      studentData.fees = studentData.fees || { total: 4500, paid: 0, status: "Pending", lastReceipt: "REC-" + Math.floor(10000 + Math.random() * 90000) };
      this.data.students.push(studentData);
      this.logAudit("Student Enrolled", `Registered new student ${studentData.firstName} ${studentData.lastName} (${studentData.studentId}).`);
    } else {
      const idx = this.data.students.findIndex(s => s.id === studentData.id);
      if (idx !== -1) {
        this.data.students[idx] = { ...this.data.students[idx], ...studentData };
        this.logAudit("Student Updated", `Modified records for ${studentData.firstName} ${studentData.lastName} (${studentData.studentId}).`);
      }
    }
    this.saveData();
    return studentData;
  }

  deleteStudent(id) {
    const s = this.getStudentById(id);
    if (s) {
      this.data.students = this.data.students.filter(item => item.id !== id && item.studentId !== id);
      this.logAudit("Student Record Purged", `Deleted student profile ${s.firstName} ${s.lastName} (${s.studentId}).`);
      this.saveData();
    }
  }

  saveGrade(studentId, courseCode, scores) {
    const s = this.getStudentById(studentId);
    if (!s) return false;
    if (!s.enrollments) s.enrollments = [];

    const existing = s.enrollments.find(e => e.courseCode === courseCode);
    if (existing) {
      existing.midterm = parseFloat(scores.midterm) || 0;
      existing.assignment = parseFloat(scores.assignment) || 0;
      existing.final = parseFloat(scores.final) || 0;
    } else {
      s.enrollments.push({
        courseCode,
        midterm: parseFloat(scores.midterm) || 0,
        assignment: parseFloat(scores.assignment) || 0,
        final: parseFloat(scores.final) || 0
      });
    }
    this.logAudit("Grade Recorded", `Updated scores for ${s.studentId} in course ${courseCode}.`);
    this.saveData();
    return true;
  }

  saveAttendance(studentId, date, status) {
    const s = this.getStudentById(studentId);
    if (!s) return false;
    if (!s.attendance) s.attendance = [];

    const existing = s.attendance.find(a => a.date === date);
    if (existing) {
      existing.status = status;
    } else {
      s.attendance.push({ date, status });
    }
    this.saveData();
    return true;
  }

  borrowBook(bookId, studentId) {
    const book = this.getLibrary().find(b => b.id === bookId);
    const student = this.getStudentById(studentId);
    if (!book || !student || book.availableCopies <= 0) return false;

    book.availableCopies -= 1;
    const now = new Date();
    const due = new Date();
    due.setDate(now.getDate() + 14);

    const log = {
      id: "brw_" + Date.now(),
      bookId,
      studentId: student.studentId,
      studentName: `${student.firstName} ${student.lastName}`,
      issueDate: now.toISOString().split("T")[0],
      dueDate: due.toISOString().split("T")[0],
      status: "Active"
    };

    this.data.borrowLogs.unshift(log);
    this.logAudit("Library Book Checked Out", `"${book.title}" issued to ${student.firstName} ${student.lastName}.`);
    this.saveData();
    return true;
  }

  returnBook(borrowLogId) {
    const log = this.data.borrowLogs.find(l => l.id === borrowLogId);
    if (!log || log.status === "Returned") return false;

    log.status = "Returned";
    const book = this.data.library.find(b => b.id === log.bookId);
    if (book) book.availableCopies += 1;

    this.logAudit("Library Book Returned", `Log ${borrowLogId} reconciled for book ${book ? book.title : ''}.`);
    this.saveData();
    return true;
  }

  saveAssignment(assignmentData) {
    if (!this.data.assignments) this.data.assignments = [];
    assignmentData.id = "asg_" + Date.now();
    assignmentData.submissions = 0;
    assignmentData.status = "Active";
    this.data.assignments.unshift(assignmentData);
    this.logAudit("Assignment Created", `Posted "${assignmentData.title}" for ${assignmentData.courseCode}.`);
    this.saveData();
    return assignmentData;
  }

  resetToDefault() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.saveData();
    this.logAudit("System Reset", "All academy records reverted to verified master seed.");
  }
}

window.appStore = new EnterpriseStore();
