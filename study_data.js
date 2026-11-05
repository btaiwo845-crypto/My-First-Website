/**
 * AlMustapha Academy - Interactive Subject Lessons, Topic Curriculum & IQ Test Engine
 * Provides structured multi-topic syllabi across 6 core disciplines + standardized IQ testing.
 */

const AcademicCurriculum = {
  subjects: [
    {
      id: "subj_math",
      name: "Mathematics",
      code: "MAT-201",
      icon: "📐",
      description: "Algebraic foundations, calculus, trigonometry, probability and mathematical proofs.",
      topics: [
        {
          id: "top_math_1",
          title: "Quadratic Equations & Roots Analysis",
          readingMinutes: 6,
          summary: "Mastering factoring, the quadratic formula, and the discriminant Δ = b² - 4ac.",
          lesson: `
            <h3>1. The Standard Quadratic Form</h3>
            <p>Every single-variable quadratic polynomial can be expressed as:</p>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">ax² + bx + c = 0, where a ≠ 0</pre>
            
            <h3>2. The Universal Quadratic Formula</h3>
            <p>Derived by completing the square on the general equation:</p>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">x = (-b ± √(b² - 4ac)) / (2a)</pre>

            <h3>3. Discriminant (Δ) Behavior</h3>
            <ul>
              <li><strong>Δ &gt; 0:</strong> Two distinct real solutions (parabola intersects x-axis twice).</li>
              <li><strong>Δ = 0:</strong> One distinct real root (parabola touches x-axis at vertex: <code>x = -b / 2a</code>).</li>
              <li><strong>Δ &lt; 0:</strong> No real roots; two complex conjugate solutions (parabola never touches x-axis).</li>
            </ul>

            <h3>4. Worked Example</h3>
            <p>Solve: <code>2x² - 4x - 6 = 0</code></p>
            <p>Here <code>a = 2, b = -4, c = -6</code>.</p>
            <p><code>Δ = (-4)² - 4(2)(-6) = 16 + 48 = 64</code>. Since <code>√64 = 8</code>:</p>
            <p><code>x = (4 ± 8) / 4 ⟹ x₁ = 3, x₂ = -1</code>.</p>
          `,
          quiz: [
            {
              q: "What does a discriminant of Δ = 0 indicate about the roots of ax² + bx + c = 0?",
              options: ["Two unequal real roots", "Exactly one repeated real root", "Two complex imaginary roots", "No mathematical solution exists"],
              answer: 1,
              explanation: "When b² - 4ac = 0, the ± term vanishes, leaving a single repeated real root at x = -b/(2a)."
            },
            {
              q: "Find the roots of x² - 5x + 6 = 0:",
              options: ["x = 2 and x = 3", "x = -2 and x = -3", "x = 1 and x = 6", "x = -1 and x = 5"],
              answer: 0,
              explanation: "Factoring: (x - 2)(x - 3) = 0 yields x = 2 and x = 3."
            }
          ]
        },
        {
          id: "top_math_2",
          title: "Differential Calculus & Tangent Slopes",
          readingMinutes: 8,
          summary: "Rates of change, limits, power rule, product rule, and instantaneous velocity.",
          lesson: `
            <h3>1. Definition of the Derivative</h3>
            <p>The derivative represents the instantaneous rate of change of a function, defined as the limit of the difference quotient:</p>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">f'(x) = lim_{h → 0} [f(x + h) - f(x)] / h</pre>

            <h3>2. Essential Differentiation Rules</h3>
            <ul>
              <li><strong>Constant Rule:</strong> <code>d/dx [c] = 0</code></li>
              <li><strong>Power Rule:</strong> <code>d/dx [xⁿ] = n · xⁿ⁻¹</code></li>
              <li><strong>Constant Multiple:</strong> <code>d/dx [c · f(x)] = c · f'(x)</code></li>
              <li><strong>Sum/Difference:</strong> <code>(f ± g)' = f' ± g'</code></li>
              <li><strong>Product Rule:</strong> <code>(u · v)' = u'v + uv'</code></li>
              <li><strong>Quotient Rule:</strong> <code>(u / v)' = (u'v - uv') / v²</code></li>
              <li><strong>Chain Rule:</strong> <code>d/dx [f(g(x))] = f'(g(x)) · g'(x)</code></li>
            </ul>

            <h3>3. Physical Application: Kinematics</h3>
            <p>If position is given by <code>s(t)</code>, then velocity is <code>v(t) = s'(t)</code>, and acceleration is <code>a(t) = v'(t) = s''(t)</code>.</p>
          `,
          quiz: [
            {
              q: "What is the derivative of f(x) = 4x³ - 5x² + 7x - 9?",
              options: ["12x² - 10x + 7", "4x² - 5x + 7", "12x³ - 10x² + 7x", "x⁴ - (5/3)x³ + (7/2)x²"],
              answer: 0,
              explanation: "Using the power rule: d/dx[4x³] = 12x², d/dx[-5x²] = -10x, d/dx[7x] = 7, d/dx[-9] = 0."
            },
            {
              q: "By the chain rule, what is d/dx [sin(3x²)]?",
              options: ["6x · cos(3x²)", "cos(3x²)", "3x · cos(6x)", "6x · sin(3x²)"],
              answer: 0,
              explanation: "Outer derivative of sin(u) is cos(u). Inner derivative of 3x² is 6x. Product = 6x·cos(3x²)."
            }
          ]
        },
        {
          id: "top_math_3",
          title: "Trigonometric Identities & The Unit Circle",
          readingMinutes: 7,
          summary: "Sin, Cos, Tan definitions on the Cartesian plane and Pythagorean identities.",
          lesson: `
            <h3>1. The Unit Circle Coordinates</h3>
            <p>For any angle <code>θ</code> measured counter-clockwise from positive x-axis on a circle of radius 1:</p>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">x = cos(θ),  y = sin(θ),  tan(θ) = y / x = sin(θ) / cos(θ)</pre>

            <h3>2. Fundamental Pythagorean Identities</h3>
            <ul>
              <li><code>sin²(θ) + cos²(θ) = 1</code></li>
              <li><code>1 + tan²(θ) = sec²(θ)</code></li>
              <li><code>1 + cot²(θ) = csc²(θ)</code></li>
            </ul>

            <h3>3. Double Angle Formulas</h3>
            <p><code>sin(2θ) = 2 · sin(θ) · cos(θ)</code></p>
            <p><code>cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)</code></p>
          `,
          quiz: [
            {
              q: "If sin(θ) = 3/5 in Quadrant I, what is cos(θ)?",
              options: ["4/5", "3/4", "5/4", "1/5"],
              answer: 0,
              explanation: "Since sin²(θ) + cos²(θ) = 1: (3/5)² + cos²(θ) = 1 ⟹ 9/25 + cos²(θ) = 1 ⟹ cos²(θ) = 16/25 ⟹ cos(θ) = 4/5."
            }
          ]
        }
      ]
    },

    {
      id: "subj_phys",
      name: "Physics",
      code: "PHY-301",
      icon: "⚡",
      description: "Classical Newtonian dynamics, energy conservation, electromagnetism and optics.",
      topics: [
        {
          id: "top_phys_1",
          title: "Newton's Laws of Motion & Momentum Conservation",
          readingMinutes: 7,
          summary: "Forces, inertia, F = ma, impulse, and closed-system momentum collisions.",
          lesson: `
            <h3>1. Newton's Three Axioms</h3>
            <ol>
              <li><strong>Law of Inertia:</strong> Every body preserves in its state of being at rest or moving uniformly forward in a straight line, unless acted on by net force: <code>ΣF = 0 ⟹ v = const</code>.</li>
              <li><strong>Fundamental Law of Dynamics:</strong> The alteration of motion is proportional to the motive force impressed: <code>F_net = m · a = dp/dt</code>.</li>
              <li><strong>Action-Reaction Law:</strong> To every action there is always opposed an equal reaction: <code>F_AB = -F_BA</code>.</li>
            </ol>

            <h3>2. Linear Momentum & Impulse</h3>
            <p>Momentum is a vector quantity defined as: <code>p = m · v</code> (in kg·m/s).</p>
            <p>Impulse is the integral of force over elapsed time: <code>J = ∫ F dt = Δp = m·v_f - m·v_i</code>.</p>
            <p><strong>Conservation Principle:</strong> In an isolated system (<code>ΣF_ext = 0</code>), total initial momentum equals total final momentum in all elastic and inelastic collisions.</p>
          `,
          quiz: [
            {
              q: "A 1,200 kg car accelerates from rest at 3.0 m/s². What net horizontal force acted upon it?",
              options: ["3,600 N", "400 N", "1,200 N", "7,200 N"],
              answer: 0,
              explanation: "F = m · a = 1,200 kg · 3.0 m/s² = 3,600 N."
            },
            {
              q: "In an isolated system, when two objects collide and stick together (completely inelastic collision), what is conserved?",
              options: ["Total linear momentum only", "Kinetic energy only", "Both momentum and kinetic energy", "Neither is conserved"],
              answer: 0,
              explanation: "Momentum is always conserved in isolated collisions. In an inelastic collision, some kinetic energy transforms into heat and acoustic deformation."
            }
          ]
        },
        {
          id: "top_phys_2",
          title: "Electromagnetism, Circuits & Ohm's Law",
          readingMinutes: 8,
          summary: "Voltage, current, electrical resistance, series/parallel networks and power dissipation.",
          lesson: `
            <h3>1. Electric Current & Potential Difference</h3>
            <p>Current (<code>I</code>) is the rate of flow of electric charge: <code>I = Q / t</code> (measured in Amperes, 1 A = 1 C/s).</p>
            <p>Voltage (<code>V</code>) is the work done per unit charge in moving charge between two points: <code>V = W / Q</code> (Volts).</p>

            <h3>2. Ohm's Law</h3>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">V = I · R  (where R is electrical resistance in Ohms, Ω)</pre>

            <h3>3. Resistor Circuit Combinations</h3>
            <ul>
              <li><strong>Series Circuits:</strong> Current is identical across all components. Total resistance: <code>R_total = R₁ + R₂ + ... + Rₙ</code>.</li>
              <li><strong>Parallel Circuits:</strong> Voltage is identical across each branch. Equivalent resistance: <code>1/R_total = 1/R₁ + 1/R₂ + ... + 1/Rₙ</code>.</li>
            </ul>

            <h3>4. Electrical Power & Joule Heating</h3>
            <p><code>P = V · I = I² · R = V² / R</code> (Watts, W).</p>
          `,
          quiz: [
            {
              q: "Two resistors of 6 Ω and 12 Ω are connected in parallel. What is their equivalent resistance?",
              options: ["4 Ω", "18 Ω", "8 Ω", "2 Ω"],
              answer: 0,
              explanation: "1/R = 1/6 + 1/12 = 2/12 + 1/12 = 3/12 = 1/4 ⟹ R = 4 Ω."
            }
          ]
        }
      ]
    },

    {
      id: "subj_cs",
      name: "Computer Science",
      code: "CS-101",
      icon: "💻",
      description: "Data structures, algorithms, complexity theory, Python engineering, and security.",
      topics: [
        {
          id: "top_cs_1",
          title: "Algorithmic Efficiency & Big-O Notation",
          readingMinutes: 6,
          summary: "Time vs space tradeoffs, logarithmic scaling, and search/sort optimization.",
          lesson: `
            <h3>1. What is Big-O Complexity?</h3>
            <p>Big-O notation describes the upper bound of runtime or memory requirements as input size <code>n</code> grows towards infinity.</p>

            <h3>2. Hierarchy of Common Complexities (Best to Worst)</h3>
            <ul>
              <li><strong>O(1) - Constant:</strong> Array index access, hash map lookup (amortized).</li>
              <li><strong>O(log n) - Logarithmic:</strong> Binary search on sorted arrays, balanced binary tree operations.</li>
              <li><strong>O(n) - Linear:</strong> Single loop traversal, linear search.</li>
              <li><strong>O(n log n) - Linearithmic:</strong> MergeSort, QuickSort (average), HeapSort.</li>
              <li><strong>O(n²) - Quadratic:</strong> Nested loops (BubbleSort, SelectionSort).</li>
              <li><strong>O(2ⁿ) - Exponential:</strong> Brute force recursive Fibonacci without memoization.</li>
            </ul>

            <h3>3. Binary Search Code</h3>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px; font-size:12px;">
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1  # Not found</pre>
          `,
          quiz: [
            {
              q: "If an algorithm requires 1,000 steps for n=10 and 1,000,000 steps for n=1,000, what is its likely time complexity?",
              options: ["O(n²)", "O(n)", "O(log n)", "O(1)"],
              answer: 0,
              explanation: "When n increases by a factor of 100 (10 to 1,000), steps increase by 100² = 10,000 (1,000 to 1,000,000). This characterizes O(n²)."
            },
            {
              q: "Which data structure provides amortized O(1) time complexity for insertion, deletion, and lookup?",
              options: ["Hash Table / Hash Map", "Linked List", "Binary Search Tree", "Sorted Array"],
              answer: 0,
              explanation: "Hash tables convert keys into array indices using a hash function, achieving O(1) average time complexity."
            }
          ]
        },
        {
          id: "top_cs_2",
          title: "Defensive Coding & SQL Injection Immunity",
          readingMinutes: 7,
          summary: "Parameterized statements, sanitization, XSS mitigation, and defense in depth.",
          lesson: `
            <h3>1. The Mechanics of SQL Injection</h3>
            <p>SQL Injection occurs when untrusted user input is directly concatenated into a dynamic SQL string. An attacker injects SQL syntax to alter query execution logic:</p>
            <pre style="background:#0f172a; color:#ef4444; padding:10px; border-radius:6px;">-- VULNERABLE CODE:
query = "SELECT * FROM users WHERE user = '" + input + "' AND pass = '" + pass + "'"
-- An attacker inputs: ' OR '1'='1
-- Altered SQL executes as:
SELECT * FROM users WHERE user = '' OR '1'='1'</pre>

            <h3>2. The Absolute Defense: Parameterized Queries</h3>
            <p>Parameterized queries (prepared statements) treat input data strictly as values, never as executable code:</p>
            <pre style="background:#0f172a; color:#34d399; padding:10px; border-radius:6px;"># SECURE CODE:
cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, hashed_pass))</pre>
          `,
          quiz: [
            {
              q: "Why does parameterization guarantee immunity against SQL injection?",
              options: [
                "The database engine compiles query structure before binding parameters as literals",
                "It automatically encrypts user input with AES-256",
                "It disables all SQL SELECT statements",
                "It removes all single quotes from the database"
              ],
              answer: 0,
              explanation: "Prepared statements compile SQL command syntax beforehand. Parameters are strictly passed as literal values without altering the execution plan."
            }
          ]
        }
      ]
    },

    {
      id: "subj_chem",
      name: "Chemistry",
      code: "CHM-202",
      icon: "🧪",
      description: "Atomic structure, periodic trends, chemical bonding, stoichiometry, and acids/bases.",
      topics: [
        {
          id: "top_chem_1",
          title: "Periodic Trends & Atomic Orbitals",
          readingMinutes: 6,
          summary: "Electronegativity, ionization energy, atomic radius, and electron configurations.",
          lesson: `
            <h3>1. Periodic Table Periodic Trends</h3>
            <ul>
              <li><strong>Atomic Radius:</strong> Decreases from left to right across a period (due to increasing effective nuclear charge Z_eff); increases down a group (due to additional electron shells).</li>
              <li><strong>Ionization Energy:</strong> Increases across a period; decreases down a group.</li>
              <li><strong>Electronegativity:</strong> Increases across a period towards Fluorine (most electronegative element at 3.98 Pauling); decreases down a group.</li>
            </ul>

            <h3>2. Quantum Subshells & Aufbau Principle</h3>
            <p>Electrons fill lowest energy atomic orbitals first: <code>1s < 2s < 2p < 3s < 3p < 4s < 3d < 4p...</code></p>
            <p>Pauli Exclusion Principle states no two electrons can share all four identical quantum numbers.</p>
          `,
          quiz: [
            {
              q: "Which element possesses the highest electronegativity on the periodic table?",
              options: ["Fluorine (F)", "Cesium (Cs)", "Oxygen (O)", "Helium (He)"],
              answer: 0,
              explanation: "Fluorine has the highest electronegativity (3.98) due to its high effective nuclear charge and compact atomic radius."
            }
          ]
        }
      ]
    },

    {
      id: "subj_bio",
      name: "Biology",
      code: "BIO-105",
      icon: "🧬",
      description: "Cellular biology, genetics, DNA transcription, and human physiological systems.",
      topics: [
        {
          id: "top_bio_1",
          title: "The Central Dogma & Protein Synthesis",
          readingMinutes: 7,
          summary: "DNA replication, transcription in the nucleus, and translation at ribosomes.",
          lesson: `
            <h3>1. The Central Dogma Pathway</h3>
            <pre style="background:#0f172a; color:#38bdf8; padding:10px; border-radius:6px;">DNA ──[Transcription (RNA Polymerase)]──> mRNA ──[Translation (tRNA & Ribosome)]──> Polypeptide Protein</pre>

            <h3>2. Base Pairing Rules</h3>
            <ul>
              <li><strong>In DNA:</strong> Adenine (A) pairs with Thymine (T) via 2 hydrogen bonds; Cytosine (C) pairs with Guanine (G) via 3 hydrogen bonds.</li>
              <li><strong>In RNA:</strong> Uracil (U) replaces Thymine (T). A pairs with U.</li>
            </ul>

            <h3>3. Codons & Amino Acid Assembly</h3>
            <p>Messenger RNA is read in triplets called <strong>codons</strong>. The universal start codon is <code>AUG</code> (Methionine). Stop codons include <code>UAA, UAG, UGA</code>.</p>
          `,
          quiz: [
            {
              q: "If a DNA template strand has sequence 3'-TAC GGC TTA-5', what is the complementary mRNA sequence?",
              options: ["5'-AUG CCG AAU-3'", "5'-ATG CCG AAT-3'", "3'-AUG CCG AAU-5'", "5'-UAC GGC UUA-3'"],
              answer: 0,
              explanation: "Transcription matches T->A, A->U, C->G, G->C antiparallel from 5' to 3': TAC -> AUG, GGC -> CCG, TTA -> AAU."
            }
          ]
        }
      ]
    },

    {
      id: "subj_eng",
      name: "English & Rhetoric",
      code: "ENG-105",
      icon: "✍️",
      description: "Academic writing, rhetorical analysis, thesis architecture, and grammar.",
      topics: [
        {
          id: "top_eng_1",
          title: "The PEEL Academic Essay Architecture",
          readingMinutes: 5,
          summary: "Mastering the Point, Evidence, Explanation, and Link paragraph construct.",
          lesson: `
            <h3>1. The PEEL Paragraph Framework</h3>
            <ul>
              <li><strong>P - Point:</strong> Open with a clear topic sentence that directly supports your overarching thesis.</li>
              <li><strong>E - Evidence:</strong> Present empirical data, statistical proof, or direct textual citation.</li>
              <li><strong>E - Explanation:</strong> Analyze the evidence. Explain <em>how</em> and <em>why</em> this evidence validates your point. Avoid simple plot summary.</li>
              <li><strong>L - Link:</strong> Conclude by synthesizing the argument and transitioning smoothly to the next point or restating relevance to the thesis.</li>
            </ul>
          `,
          quiz: [
            {
              q: "In the PEEL paragraph structure, what is the primary role of the 'Explanation' phase?",
              options: [
                "Critically analyzing how the evidence proves the point, rather than summarizing",
                "Quoting the book for the first time",
                "Introducing the final bibliography",
                "Listing dictionary definitions"
              ],
              answer: 0,
              explanation: "Explanation is the analytical core where the writer articulates the logical mechanism connecting the citation to the thesis."
            }
          ]
        }
      ]
    }
  ],

  // =========================================================================
  // STANDARDIZED ACADEMIC IQ & COGNITIVE REASONING TEST BANK
  // =========================================================================
  iqTest: {
    title: "Standardized Academic Cognitive & IQ Evaluation",
    durationSeconds: 300, // 5 minutes
    questions: [
      {
        id: "iq_1",
        category: "Numerical Sequence Logic",
        q: "What number comes next in the sequence: 2, 6, 12, 20, 30, ?",
        options: ["40", "42", "44", "36"],
        answer: 1,
        explanation: "Differences increase by 2: +4, +6, +8, +10, +12. 30 + 12 = 42. (Or n² + n for n=1,2,3,4,5,6 ⟹ 6² + 6 = 42)."
      },
      {
        id: "iq_2",
        category: "Verbal Analogy",
        q: "ARCHITECT is to BLUEPRINT as COMPOSER is to:",
        options: ["SCORE", "SYMPHONY", "PIANO", "ORCHESTRA"],
        answer: 0,
        explanation: "An architect creates a blueprint (written design for buildings); a composer creates a musical score (written design for performance)."
      },
      {
        id: "iq_3",
        category: "Mathematical Reasoning",
        q: "If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
        options: ["100 minutes", "5 minutes", "20 minutes", "1 minute"],
        answer: 1,
        explanation: "1 machine takes 5 minutes to make 1 widget. Therefore, 100 machines running concurrently will take 5 minutes to produce 100 widgets."
      },
      {
        id: "iq_4",
        category: "Pattern Recognition",
        q: "Which letter comes next in the sequence: B, D, G, K, P, ?",
        options: ["V", "U", "W", "T"],
        answer: 0,
        explanation: "Letter position jumps increase: B(+2) -> D(+3) -> G(+4) -> K(+5) -> P(+6) -> V."
      },
      {
        id: "iq_5",
        category: "Deductive Syllogism",
        q: "All scholars at AlMustapha read daily. Some daily readers write journals. No journal writers are dishonest. Which statement MUST be true?",
        options: [
          "Some scholars are not dishonest",
          "All scholars write journals",
          "No scholars are daily readers",
          "All daily readers are scholars"
        ],
        answer: 0,
        explanation: "Since some daily readers (including scholars) write journals, and all journal writers are not dishonest, those who overlap are not dishonest."
      },
      {
        id: "iq_6",
        category: "Geometric / Spatial Logic",
        q: "A cube of wood 3 cm × 3 cm × 3 cm is painted black on all exterior faces, then sliced into 27 equal 1 cm cubes. How many small cubes have EXACTLY 1 painted face?",
        options: ["6", "8", "12", "1"],
        answer: 0,
        explanation: "The center cube on each of the 6 faces has exactly 1 painted face. There are 6 faces, so 6 cubes."
      },
      {
        id: "iq_7",
        category: "Mathematical Logic",
        q: "If x + 1/x = 4, what is the value of x² + 1/x²?",
        options: ["16", "14", "12", "18"],
        answer: 1,
        explanation: "Square both sides: (x + 1/x)² = x² + 2 + 1/x² = 16 ⟹ x² + 1/x² = 16 - 2 = 14."
      },
      {
        id: "iq_8",
        category: "Logical Negation",
        q: "What is the logical negation of: 'Every student in the hall passed the examination'?",
        options: [
          "At least one student in the hall did not pass the examination",
          "Every student in the hall failed the examination",
          "No student passed the examination",
          "Most students failed"
        ],
        answer: 0,
        explanation: "The negation of universal quantification (∀x P(x)) is existential negation (∃x ¬P(x)): At least one student failed."
      },
      {
        id: "iq_9",
        category: "Algorithmic Sequence",
        q: "What is the missing number in the matrix series: 3 ⟶ 9,  4 ⟶ 16,  5 ⟶ 25,  7 ⟶ ?",
        options: ["49", "35", "42", "56"],
        answer: 0,
        explanation: "The function is f(x) = x². 7² = 49."
      },
      {
        id: "iq_10",
        category: "Conditional Logic",
        q: "If today is Tuesday, then tomorrow is Wednesday. If tomorrow is Wednesday, the library receives new books. The library did NOT receive new books tomorrow. What can we conclude?",
        options: [
          "Today is not Tuesday",
          "Today is Tuesday",
          "Tomorrow is Thursday",
          "No valid deduction"
        ],
        answer: 0,
        explanation: "By Modus Tollens: If P ⟹ Q and Q ⟹ R, then P ⟹ R. Given ¬R (no books), we deduce ¬P (Today is not Tuesday)."
      }
    ],

    calculateIQ(correctCount, elapsedSeconds) {
      // Standardized Stanford-Binet / Mensa distribution approximation
      // Base score 90 for 0 correct, scaling up to 145+ for 10/10 with time bonus
      const accuracyScore = correctCount * 5; // up to 50
      let timeBonus = 0;
      if (elapsedSeconds < 180 && correctCount >= 8) timeBonus = 5;
      else if (elapsedSeconds < 240 && correctCount >= 7) timeBonus = 3;

      const estimatedIQ = 95 + accuracyScore + timeBonus;

      let tier = "Average Cognitive Intelligence";
      let badgeClass = "badge-gpa-mid";
      let percentile = "50th Percentile";

      if (estimatedIQ >= 140) {
        tier = "Genius / High Mensa Tier (Top 0.5%)";
        badgeClass = "badge-gpa-high";
        percentile = "99.5th Percentile";
      } else if (estimatedIQ >= 130) {
        tier = "Very Superior Intellect (Top 2%)";
        badgeClass = "badge-gpa-high";
        percentile = "98th Percentile";
      } else if (estimatedIQ >= 120) {
        tier = "Superior Cognitive Performance";
        badgeClass = "badge-gpa-high";
        percentile = "90th Percentile";
      } else if (estimatedIQ >= 110) {
        tier = "High Average Intellect";
        badgeClass = "badge-gpa-mid";
        percentile = "75th Percentile";
      }

      return {
        estimatedIQ,
        correctCount,
        total: 10,
        tier,
        badgeClass,
        percentile,
        elapsedSeconds
      };
    }
  }
};

window.AcademicCurriculum = AcademicCurriculum;
