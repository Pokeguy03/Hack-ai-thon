// Aptitude Assessment Application
class AptitudeAssessment {
    constructor() {
        this.currentScreen = 'welcome';
        this.selectedCategories = [];
        this.currentCategoryIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.scores = {};
        this.points = 0;
        this.timer = null;
        this.timeLeft = 120; // 2 minutes per question
        this.hintsUsed = 0;
        this.maxHints = 3;
        
        this.questions = {
            logical: [
                {
                    id: 1,
                    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
                    options: ["40", "42", "44", "46"],
                    correct: 1,
                    explanation: "The pattern is n(n+1): 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42",
                    difficulty: 1
                },
                {
                    id: 2,
                    question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
                    options: ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
                    correct: 3,
                    explanation: "We know roses are flowers, and some flowers are red, but we don't know if roses are among the red flowers.",
                    difficulty: 2
                },
                {
                    id: 3,
                    question: "Complete the pattern: A, C, F, J, ?",
                    options: ["M", "N", "O", "P"],
                    correct: 2,
                    explanation: "The pattern increases by 2, 3, 4, 5... So A+2=C, C+3=F, F+4=J, J+5=O",
                    difficulty: 2
                },
                {
                    id: 4,
                    question: "If 5 machines can produce 5 widgets in 5 minutes, how many machines are needed to produce 100 widgets in 100 minutes?",
                    options: ["5", "10", "20", "100"],
                    correct: 0,
                    explanation: "Each machine produces 1 widget per 5 minutes, so 5 machines can produce 100 widgets in 100 minutes.",
                    difficulty: 3
                },
                {
                    id: 5,
                    question: "What is the next number in the series: 1, 4, 9, 16, 25, ?",
                    options: ["30", "36", "40", "49"],
                    correct: 1,
                    explanation: "This is the sequence of perfect squares: 1², 2², 3², 4², 5², 6² = 36",
                    difficulty: 1
                }
            ],
            quantitative: [
                {
                    id: 1,
                    question: "If a train travels 240 km in 3 hours, what is its average speed?",
                    options: ["60 km/h", "70 km/h", "80 km/h", "90 km/h"],
                    correct: 2,
                    explanation: "Speed = Distance ÷ Time = 240 km ÷ 3 hours = 80 km/h",
                    difficulty: 1
                },
                {
                    id: 2,
                    question: "What is 25% of 320?",
                    options: ["70", "80", "90", "100"],
                    correct: 1,
                    explanation: "25% of 320 = 0.25 × 320 = 80",
                    difficulty: 1
                },
                {
                    id: 3,
                    question: "If the price of a product increases by 20% and then decreases by 20%, what is the net change?",
                    options: ["No change", "4% decrease", "4% increase", "20% decrease"],
                    correct: 1,
                    explanation: "Let original price = 100. After 20% increase: 120. After 20% decrease: 120 × 0.8 = 96. Net change = 4% decrease",
                    difficulty: 2
                },
                {
                    id: 4,
                    question: "A rectangle has length 12 cm and width 8 cm. What is its area?",
                    options: ["96 cm²", "40 cm²", "20 cm²", "80 cm²"],
                    correct: 0,
                    explanation: "Area = Length × Width = 12 cm × 8 cm = 96 cm²",
                    difficulty: 1
                },
                {
                    id: 5,
                    question: "If 3x + 7 = 22, what is the value of x?",
                    options: ["3", "4", "5", "6"],
                    correct: 2,
                    explanation: "3x + 7 = 22 → 3x = 15 → x = 5",
                    difficulty: 2
                }
            ],
            verbal: [
                {
                    id: 1,
                    question: "What is the synonym of 'BENEVOLENT'?",
                    options: ["Malevolent", "Kind", "Strict", "Harsh"],
                    correct: 1,
                    explanation: "Benevolent means kind and generous, showing goodwill.",
                    difficulty: 2
                },
                {
                    id: 2,
                    question: "What is the antonym of 'EPHEMERAL'?",
                    options: ["Temporary", "Permanent", "Brief", "Short"],
                    correct: 1,
                    explanation: "Ephemeral means lasting for a very short time, so its antonym is permanent.",
                    difficulty: 3
                },
                {
                    id: 3,
                    question: "Read the passage: 'The company's profits have been declining steadily over the past three quarters. However, the management remains optimistic about the future prospects.' What can be inferred?",
                    options: ["The company is doing well", "Management is concerned", "Profits are increasing", "Management believes things will improve"],
                    correct: 3,
                    explanation: "The passage states that despite declining profits, management remains optimistic about future prospects.",
                    difficulty: 2
                },
                {
                    id: 4,
                    question: "Which word is misspelled?",
                    options: ["Accommodate", "Occurrence", "Seperate", "Recommend"],
                    correct: 2,
                    explanation: "The correct spelling is 'Separate', not 'Seperate'.",
                    difficulty: 1
                },
                {
                    id: 5,
                    question: "What is the meaning of 'SERENDIPITY'?",
                    options: ["Bad luck", "Good luck", "The occurrence of happy accidents", "Misfortune"],
                    correct: 2,
                    explanation: "Serendipity means the occurrence of events by chance in a happy or beneficial way.",
                    difficulty: 3
                }
            ],
            coding: [
                {
                    id: 1,
                    question: "What will be the output of: console.log(5 + '3' + 2);",
                    options: ["10", "532", "55", "Error"],
                    correct: 1,
                    explanation: "JavaScript converts 5 to string '5', then concatenates: '5' + '3' + 2 = '532'",
                    difficulty: 2
                },
                {
                    id: 2,
                    question: "Which data structure follows LIFO (Last In, First Out) principle?",
                    options: ["Queue", "Stack", "Array", "Linked List"],
                    correct: 1,
                    explanation: "Stack follows LIFO - the last element added is the first one to be removed.",
                    difficulty: 2
                },
                {
                    id: 3,
                    question: "What is the time complexity of binary search?",
                    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
                    correct: 1,
                    explanation: "Binary search has O(log n) time complexity as it eliminates half the search space in each iteration.",
                    difficulty: 3
                },
                {
                    id: 4,
                    question: "Which keyword is used to create a constant in JavaScript?",
                    options: ["var", "let", "const", "final"],
                    correct: 2,
                    explanation: "The 'const' keyword is used to declare constants in JavaScript.",
                    difficulty: 1
                },
                {
                    id: 5,
                    question: "What does API stand for?",
                    options: ["Application Programming Interface", "Advanced Programming Interface", "Automated Programming Interface", "Application Process Interface"],
                    correct: 0,
                    explanation: "API stands for Application Programming Interface - a set of protocols for building software applications.",
                    difficulty: 1
                }
            ],
            personality: [
                {
                    id: 1,
                    question: "When working on a project, I prefer to:",
                    options: ["Work independently", "Collaborate with a team", "Lead the team", "Follow clear instructions"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 2,
                    question: "I am most motivated by:",
                    options: ["Recognition and praise", "Financial rewards", "Learning new skills", "Helping others"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 3,
                    question: "When faced with a difficult problem, I:",
                    options: ["Analyze it step by step", "Ask for help immediately", "Try multiple approaches", "Take a break and return later"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 4,
                    question: "I work best in an environment that is:",
                    options: ["Quiet and structured", "Dynamic and fast-paced", "Creative and flexible", "Competitive and challenging"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 5,
                    question: "My ideal work schedule would be:",
                    options: ["9-5 fixed hours", "Flexible hours", "Project-based deadlines", "Part-time"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 6,
                    question: "I prefer to communicate through:",
                    options: ["Face-to-face meetings", "Email and messages", "Video calls", "Written reports"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 7,
                    question: "When learning something new, I:",
                    options: ["Read documentation first", "Jump in and experiment", "Watch tutorials", "Ask experts"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 8,
                    question: "I am most comfortable with:",
                    options: ["Routine tasks", "Creative projects", "Technical challenges", "People management"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 9,
                    question: "My ideal career would involve:",
                    options: ["Solving complex problems", "Creating new products", "Helping people", "Managing teams"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                },
                {
                    id: 10,
                    question: "I handle stress by:",
                    options: ["Making detailed plans", "Taking breaks", "Talking to others", "Exercising"],
                    correct: null,
                    type: "preference",
                    difficulty: 1
                }
            ]
        };

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Welcome screen
        document.getElementById('start-assessment').addEventListener('click', () => {
            const name = document.getElementById('user-name').value.trim();
            const domain = document.getElementById('user-domain').value;
            
            if (!name || !domain) {
                alert('Please enter your name and select a domain.');
                return;
            }
            
            this.userName = name;
            this.userDomain = domain;
            this.showScreen('category');
        });

        // Category selection
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.toggleCategory(category);
            });
        });

        document.getElementById('proceed-to-test').addEventListener('click', () => {
            if (this.selectedCategories.length === 0) {
                alert('Please select at least one category.');
                return;
            }
            this.startTest();
        });

        // Test controls
        document.getElementById('hint-btn').addEventListener('click', () => this.useHint());
        document.getElementById('skip-btn').addEventListener('click', () => this.skipQuestion());
        document.getElementById('prev-question').addEventListener('click', () => this.previousQuestion());
        document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());
        document.getElementById('submit-test').addEventListener('click', () => this.submitTest());

        // Results actions
        document.getElementById('view-dashboard').addEventListener('click', () => {
            window.location.href = 'dashboard.html';
        });
        document.getElementById('retake-test').addEventListener('click', () => {
            this.resetTest();
        });
        document.getElementById('share-results').addEventListener('click', () => this.shareResults());
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(`${screenName}-screen`).classList.add('active');
        this.currentScreen = screenName;
    }

    toggleCategory(category) {
        const card = document.querySelector(`[data-category="${category}"]`);
        const button = card.querySelector('.btn-category');
        
        if (this.selectedCategories.includes(category)) {
            this.selectedCategories = this.selectedCategories.filter(c => c !== category);
            card.classList.remove('selected');
            button.textContent = 'Select';
        } else {
            this.selectedCategories.push(category);
            card.classList.add('selected');
            button.textContent = 'Selected';
        }
        
        const proceedBtn = document.getElementById('proceed-to-test');
        proceedBtn.disabled = this.selectedCategories.length === 0;
    }

    startTest() {
        this.currentCategoryIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.scores = {};
        this.points = 0;
        this.hintsUsed = 0;
        
        this.showScreen('test');
        this.loadQuestion();
        this.startTimer();
        this.updateFloatingProgress();
    }

    loadQuestion() {
        const category = this.selectedCategories[this.currentCategoryIndex];
        const questions = this.questions[category];
        const question = questions[this.currentQuestionIndex];
        
        document.getElementById('current-category').textContent = this.getCategoryName(category);
        document.getElementById('question-counter').textContent = 
            `Question ${this.currentQuestionIndex + 1} of ${questions.length}`;
        
        // Update progress bar
        const totalQuestions = this.getTotalQuestions();
        const completedQuestions = this.getCompletedQuestions();
        const progress = (completedQuestions / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;
        
        // Load question content
        document.getElementById('question-text').textContent = question.question;
        
        // Load options
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        if (question.type === 'preference') {
            // Personality questions - no correct answer
            question.options.forEach((option, index) => {
                const optionElement = this.createOptionElement(option, index, false);
                optionsContainer.appendChild(optionElement);
            });
        } else {
            // Regular questions with correct answers
            question.options.forEach((option, index) => {
                const optionElement = this.createOptionElement(option, index, true);
                optionsContainer.appendChild(optionElement);
            });
        }
        
        // Update navigation buttons
        this.updateNavigationButtons();
    }

    createOptionElement(optionText, index, hasCorrectAnswer) {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'answer';
        radio.value = index;
        radio.id = `option-${index}`;
        
        const label = document.createElement('label');
        label.htmlFor = `option-${index}`;
        label.textContent = optionText;
        
        optionDiv.appendChild(radio);
        optionDiv.appendChild(label);
        
        // Add click handler
        optionDiv.addEventListener('click', () => {
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            optionDiv.classList.add('selected');
            radio.checked = true;
        });
        
        return optionDiv;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-question');
        const nextBtn = document.getElementById('next-question');
        const submitBtn = document.getElementById('submit-test');
        
        prevBtn.disabled = this.currentCategoryIndex === 0 && this.currentQuestionIndex === 0;
        
        const isLastCategory = this.currentCategoryIndex === this.selectedCategories.length - 1;
        const isLastQuestion = this.currentQuestionIndex === this.questions[this.selectedCategories[this.currentCategoryIndex]].length - 1;
        
        if (isLastCategory && isLastQuestion) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    nextQuestion() {
        this.saveAnswer();
        
        const category = this.selectedCategories[this.currentCategoryIndex];
        const questions = this.questions[category];
        
        if (this.currentQuestionIndex < questions.length - 1) {
            this.currentQuestionIndex++;
        } else if (this.currentCategoryIndex < this.selectedCategories.length - 1) {
            this.currentCategoryIndex++;
            this.currentQuestionIndex = 0;
        }
        
        this.loadQuestion();
        this.resetTimer();
    }

    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
        } else if (this.currentCategoryIndex > 0) {
            this.currentCategoryIndex--;
            this.currentQuestionIndex = this.questions[this.selectedCategories[this.currentCategoryIndex]].length - 1;
        }
        
        this.loadQuestion();
        this.resetTimer();
    }

    skipQuestion() {
        this.saveAnswer();
        this.nextQuestion();
    }

    saveAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        const category = this.selectedCategories[this.currentCategoryIndex];
        const questionId = this.questions[category][this.currentQuestionIndex].id;
        
        if (selectedOption) {
            this.answers[`${category}-${questionId}`] = parseInt(selectedOption.value);
        }
    }

    useHint() {
        if (this.hintsUsed >= this.maxHints) {
            alert('You have used all available hints!');
            return;
        }
        
        const category = this.selectedCategories[this.currentCategoryIndex];
        const question = this.questions[category][this.currentQuestionIndex];
        
        if (question.explanation) {
            alert(`Hint: ${question.explanation}`);
        } else {
            alert('Hint: Think about the key concepts and patterns in this question.');
        }
        
        this.hintsUsed++;
        document.getElementById('hint-btn').textContent = `💡 Hint (${this.maxHints - this.hintsUsed} left)`;
        
        if (this.hintsUsed >= this.maxHints) {
            document.getElementById('hint-btn').disabled = true;
        }
    }

    startTimer() {
        this.timeLeft = 120; // 2 minutes
        this.updateTimerDisplay();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    resetTimer() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.startTimer();
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const timerElement = document.getElementById('timer');
        timerElement.textContent = display;
        
        if (this.timeLeft <= 30) {
            timerElement.classList.add('warning');
        } else {
            timerElement.classList.remove('warning');
        }
    }

    timeUp() {
        clearInterval(this.timer);
        alert('Time\'s up! Moving to next question.');
        this.nextQuestion();
    }

    submitTest() {
        this.saveAnswer();
        this.calculateScores();
        this.showResults();
    }

    calculateScores() {
        this.selectedCategories.forEach(category => {
            const questions = this.questions[category];
            let categoryScore = 0;
            let totalQuestions = questions.length;
            
            questions.forEach(question => {
                const answerKey = `${category}-${question.id}`;
                const userAnswer = this.answers[answerKey];
                
                if (question.type === 'preference') {
                    // Personality questions - give points based on selection
                    categoryScore += 10; // Base points for answering
                } else if (userAnswer !== undefined && userAnswer === question.correct) {
                    // Correct answer - points based on difficulty
                    const points = question.difficulty * 10;
                    categoryScore += points;
                    this.points += points;
                }
            });
            
            this.scores[category] = {
                score: categoryScore,
                total: totalQuestions * 10,
                percentage: Math.round((categoryScore / (totalQuestions * 10)) * 100)
            };
        });
        
        // Add bonus points for completion
        this.points += 50;
    }

    showResults() {
        this.showScreen('results');
        this.displayResults();
    }

    displayResults() {
        // Calculate total score
        const totalScore = Object.values(this.scores).reduce((sum, score) => sum + score.percentage, 0);
        const averageScore = Math.round(totalScore / Object.keys(this.scores).length);
        
        document.getElementById('total-score').textContent = averageScore;
        document.getElementById('points-earned').textContent = this.points;
        
        // Generate blockchain hash (simulated)
        const blockchainHash = this.generateBlockchainHash();
        document.getElementById('blockchain-hash').textContent = blockchainHash;
        
        // Create performance chart
        this.createPerformanceChart();
        
        // Display strengths and weaknesses
        this.displayStrengthsWeaknesses();
        
        // Display recommendations
        this.displayRecommendations();
    }

    createPerformanceChart() {
        const ctx = document.getElementById('performance-chart').getContext('2d');
        const categories = Object.keys(this.scores);
        const scores = categories.map(cat => this.scores[cat].percentage);
        const labels = categories.map(cat => this.getCategoryName(cat));
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Performance',
                    data: scores,
                    backgroundColor: 'rgba(102, 126, 234, 0.2)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(102, 126, 234, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    displayStrengthsWeaknesses() {
        const strengths = [];
        const weaknesses = [];
        
        Object.entries(this.scores).forEach(([category, score]) => {
            if (score.percentage >= 70) {
                strengths.push(this.getCategoryName(category));
            } else if (score.percentage < 50) {
                weaknesses.push(this.getCategoryName(category));
            }
        });
        
        const strengthsList = document.getElementById('strengths-list');
        const weaknessesList = document.getElementById('weaknesses-list');
        
        strengthsList.innerHTML = strengths.map(strength => `<li>${strength}</li>`).join('');
        weaknessesList.innerHTML = weaknesses.map(weakness => `<li>${weakness}</li>`).join('');
    }

    displayRecommendations() {
        const recommendations = this.generateRecommendations();
        const container = document.getElementById('recommendations-container');
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <a href="${rec.link}" target="_blank" class="btn-secondary">Learn More</a>
            </div>
        `).join('');
    }

    generateRecommendations() {
        const recommendations = [];
        const topCategory = Object.entries(this.scores)
            .sort(([,a], [,b]) => b.percentage - a.percentage)[0][0];
        
        const categoryRecommendations = {
            logical: [
                {
                    title: "Practice Logic Puzzles",
                    description: "Improve your logical reasoning with daily puzzle practice.",
                    link: "https://www.brainbashers.com/logicpuzzles.asp"
                },
                {
                    title: "Learn Formal Logic",
                    description: "Study formal logic and reasoning patterns.",
                    link: "https://www.coursera.org/learn/logic-introduction"
                }
            ],
            quantitative: [
                {
                    title: "Math Practice",
                    description: "Strengthen your quantitative skills with practice problems.",
                    link: "https://www.khanacademy.org/math"
                },
                {
                    title: "Data Analysis Course",
                    description: "Learn data analysis and statistics fundamentals.",
                    link: "https://www.coursera.org/learn/data-analysis"
                }
            ],
            verbal: [
                {
                    title: "Vocabulary Building",
                    description: "Expand your vocabulary with daily word practice.",
                    link: "https://www.vocabulary.com"
                },
                {
                    title: "Reading Comprehension",
                    description: "Improve reading skills with comprehension exercises.",
                    link: "https://www.readingrockets.org"
                }
            ],
            coding: [
                {
                    title: "Programming Fundamentals",
                    description: "Learn basic programming concepts and syntax.",
                    link: "https://www.freecodecamp.org"
                },
                {
                    title: "Algorithm Practice",
                    description: "Practice coding problems and algorithms.",
                    link: "https://leetcode.com"
                }
            ],
            personality: [
                {
                    title: "Career Counseling",
                    description: "Get personalized career guidance based on your personality.",
                    link: "https://www.careerkey.org"
                },
                {
                    title: "Soft Skills Development",
                    description: "Develop essential workplace soft skills.",
                    link: "https://www.linkedin.com/learning"
                }
            ]
        };
        
        return categoryRecommendations[topCategory] || categoryRecommendations.logical;
    }

    generateBlockchainHash() {
        const data = {
            user: this.userName,
            domain: this.userDomain,
            scores: this.scores,
            points: this.points,
            timestamp: new Date().toISOString()
        };
        
        // Simulate blockchain hash generation
        const hash = btoa(JSON.stringify(data)).substring(0, 20);
        return `0x${hash}...`;
    }

    getCategoryName(category) {
        const names = {
            logical: 'Logical Reasoning',
            quantitative: 'Quantitative Ability',
            verbal: 'Verbal Ability',
            coding: 'Coding/Tech Aptitude',
            personality: 'Personality & Interests'
        };
        return names[category] || category;
    }

    getTotalQuestions() {
        return this.selectedCategories.reduce((total, category) => {
            return total + this.questions[category].length;
        }, 0);
    }

    getCompletedQuestions() {
        let completed = 0;
        this.selectedCategories.forEach(category => {
            const questions = this.questions[category];
            questions.forEach(question => {
                const answerKey = `${category}-${question.id}`;
                if (this.answers[answerKey] !== undefined) {
                    completed++;
                }
            });
        });
        return completed;
    }

    updateFloatingProgress() {
        const total = this.getTotalQuestions();
        const completed = this.getCompletedQuestions();
        const percentage = Math.round((completed / total) * 100);
        
        document.getElementById('progress-percentage').textContent = `${percentage}%`;
        
        const circle = document.querySelector('.circle');
        circle.style.strokeDasharray = `${percentage}, 100`;
    }

    resetTest() {
        this.currentScreen = 'welcome';
        this.selectedCategories = [];
        this.currentCategoryIndex = 0;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.scores = {};
        this.points = 0;
        this.hintsUsed = 0;
        
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Reset UI
        document.querySelectorAll('.category-card').forEach(card => {
            card.classList.remove('selected');
            card.querySelector('.btn-category').textContent = 'Select';
        });
        
        document.getElementById('proceed-to-test').disabled = true;
        document.getElementById('user-name').value = '';
        document.getElementById('user-domain').value = '';
        
        this.showScreen('welcome');
    }

    shareResults() {
        const results = {
            name: this.userName,
            domain: this.userDomain,
            scores: this.scores,
            points: this.points,
            timestamp: new Date().toISOString()
        };
        
        const shareText = `I just completed my aptitude assessment! Check out my results: ${JSON.stringify(results, null, 2)}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Aptitude Assessment Results',
                text: shareText
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Results copied to clipboard!');
            });
        }
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AptitudeAssessment();
});
