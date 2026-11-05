/**
 * AlMustapha Academy - Academic Analytics, GPA, Fees & Birthday Engine
 */

const Calculations = {
  // 4.0 Scale Conversion
  getGradePoint(score) {
    const s = parseFloat(score) || 0;
    if (s >= 93) return { letter: "A", points: 4.0, remark: "Distinction / Outstanding", badgeClass: "badge-gpa-high" };
    if (s >= 90) return { letter: "A-", points: 3.7, remark: "Excellent Performance", badgeClass: "badge-gpa-high" };
    if (s >= 87) return { letter: "B+", points: 3.3, remark: "Very Good / High Credit", badgeClass: "badge-gpa-high" };
    if (s >= 83) return { letter: "B", points: 3.0, remark: "Good / Commendable", badgeClass: "badge-gpa-mid" };
    if (s >= 80) return { letter: "B-", points: 2.7, remark: "Above Average", badgeClass: "badge-gpa-mid" };
    if (s >= 77) return { letter: "C+", points: 2.3, remark: "Average Standard", badgeClass: "badge-gpa-mid" };
    if (s >= 73) return { letter: "C", points: 2.0, remark: "Satisfactory Pass", badgeClass: "badge-gpa-mid" };
    if (s >= 70) return { letter: "C-", points: 1.7, remark: "Marginal Pass", badgeClass: "badge-gpa-low" };
    if (s >= 60) return { letter: "D", points: 1.0, remark: "Needs Serious Improvement", badgeClass: "badge-gpa-low" };
    return { letter: "F", points: 0.0, remark: "Unsatisfactory / Fail", badgeClass: "badge-gpa-low" };
  },

  computeCourseScore(midterm, assignment, final) {
    const m = parseFloat(midterm) || 0;
    const a = parseFloat(assignment) || 0;
    const f = parseFloat(final) || 0;
    const total = (m * 0.3) + (a * 0.2) + (f * 0.5);
    return Math.round(total * 10) / 10;
  },

  calculateGPA(student, subjects) {
    if (!student.enrollments || student.enrollments.length === 0) return 0.0;
    let totalQualityPoints = 0;
    let totalCredits = 0;

    student.enrollments.forEach(enr => {
      const subject = subjects.find(s => s.code === enr.courseCode) || { credits: 3 };
      const score = this.computeCourseScore(enr.midterm, enr.assignment, enr.final);
      const grade = this.getGradePoint(score);
      totalQualityPoints += (grade.points * subject.credits);
      totalCredits += subject.credits;
    });

    if (totalCredits === 0) return 0.0;
    return Math.round((totalQualityPoints / totalCredits) * 100) / 100;
  },

  calculateAttendanceRate(student) {
    if (!student.attendance || student.attendance.length === 0) return 100;
    let earned = 0;
    student.attendance.forEach(att => {
      if (att.status === "Present" || att.status === "Excused") earned += 1;
      else if (att.status === "Late") earned += 0.5;
    });
    return Math.round((earned / student.attendance.length) * 100);
  },

  // Calculate Overall Class Rankings
  computeClassRankings(students, subjects) {
    const list = students.map(s => ({
      id: s.id,
      studentId: s.studentId,
      name: `${s.firstName} ${s.lastName}`,
      className: s.className,
      gpa: this.calculateGPA(s, subjects),
      attendance: this.calculateAttendanceRate(s)
    }));

    list.sort((a, b) => b.gpa - a.gpa);
    list.forEach((item, index) => {
      item.rank = index + 1;
    });
    return list;
  },

  // Upcoming Student Birthdays (Current month / Next 14 days)
  getUpcomingBirthdays(students) {
    const now = new Date();
    const currentMonth = now.getMonth(); // 0-indexed
    const currentDay = now.getDate();

    return students.filter(s => {
      if (!s.dob) return false;
      const bDate = new Date(s.dob);
      const bMonth = bDate.getMonth();
      const bDay = bDate.getDate();

      // Check if birthday falls in current month and is today or upcoming
      if (bMonth === currentMonth && bDay >= currentDay - 1 && bDay <= currentDay + 14) {
        return true;
      }
      return false;
    }).map(s => {
      const bDate = new Date(s.dob);
      const isToday = bDate.getMonth() === currentMonth && bDate.getDate() === currentDay;
      return {
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        className: s.className,
        dob: s.dob,
        dayStr: bDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        isToday
      };
    });
  },

  // Total Fees Accounting
  getFinancialSummary(students) {
    let totalBilled = 0;
    let totalCollected = 0;
    let totalPending = 0;

    students.forEach(s => {
      const f = s.fees || { total: 4500, paid: 4500 };
      totalBilled += (f.total || 0);
      totalCollected += (f.paid || 0);
      totalPending += Math.max(0, (f.total || 0) - (f.paid || 0));
    });

    const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 100;

    return {
      totalBilled,
      totalCollected,
      totalPending,
      collectionRate
    };
  },

  // Master Dashboard Aggregator
  getEnterpriseMetrics(store) {
    const students = store.getStudents();
    const subjects = store.getSubjects();
    const classes = store.getClasses();
    const teachers = store.getTeachers();

    const totalStudents = students.length;
    const totalSubjects = subjects.length;
    const totalClasses = classes.length;
    const totalTeachers = teachers.length;

    // Attendance stats
    let totalAtt = 0;
    students.forEach(s => { totalAtt += this.calculateAttendanceRate(s); });
    const overallAttendance = totalStudents > 0 ? Math.round(totalAtt / totalStudents) : 100;

    // Academic performance stats
    let totalGpa = 0;
    let honorRoll = 0;
    const gradeTiers = { "Tier A (3.7-4.0)": 0, "Tier B (3.0-3.6)": 0, "Tier C (2.0-2.9)": 0, "Tier D/F (<2.0)": 0 };

    students.forEach(s => {
      const gpa = this.calculateGPA(s, subjects);
      totalGpa += gpa;
      if (gpa >= 3.5) honorRoll++;
      if (gpa >= 3.7) gradeTiers["Tier A (3.7-4.0)"]++;
      else if (gpa >= 3.0) gradeTiers["Tier B (3.0-3.6)"]++;
      else if (gpa >= 2.0) gradeTiers["Tier C (2.0-2.9)"]++;
      else gradeTiers["Tier D/F (<2.0)"]++;
    });

    const averageGpa = totalStudents > 0 ? (totalGpa / totalStudents).toFixed(2) : "0.00";
    const passRate = totalStudents > 0 ? Math.round(((totalStudents - gradeTiers["Tier D/F (<2.0)"]) / totalStudents) * 100) : 100;

    const financials = this.getFinancialSummary(students);
    const birthdays = this.getUpcomingBirthdays(students);

    return {
      totalStudents,
      totalSubjects,
      totalClasses,
      totalTeachers,
      overallAttendance,
      averageGpa,
      honorRoll,
      passRate,
      gradeTiers,
      financials,
      birthdays
    };
  }
};

window.Calculations = Calculations;
