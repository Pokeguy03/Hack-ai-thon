// Dashboard Application
class Dashboard {
    constructor() {
        this.userData = this.loadUserData();
        this.aptitudeData = this.loadAptitudeData();
        this.mentors = this.loadMentors();
        this.activities = this.loadActivities();
        this.notifications = this.loadNotifications();
        
        this.initializeEventListeners();
        this.initializeDashboard();
        this.startAnimations();
    }

    loadUserData() {
        // Load from localStorage or default data
        const defaultData = {
            name: "Alex Johnson",
            domain: "AI Engineer",
            grade: "A",
            profilePic: "https://via.placeholder.com/80",
            totalPoints: 275,
            testsCompleted: 3,
            milestonesAchieved: 8,
            mentorSessions: 2
        };
        
        return JSON.parse(localStorage.getItem('userData')) || defaultData;
    }

    loadAptitudeData() {
        // Load aptitude test results
        const defaultData = {
            logical: { score: 85, percentage: 85 },
            quantitative: { score: 70, percentage: 70 },
            verbal: { score: 90, percentage: 90 },
            coding: { score: 75, percentage: 75 },
            personality: { score: 80, percentage: 80 }
        };
        
        return JSON.parse(localStorage.getItem('aptitudeData')) || defaultData;
    }

    loadMentors() {
        return [
            {
                id: 1,
                name: "Dr. Sarah Chen",
                expertise: "AI/ML",
                avatar: "https://via.placeholder.com/50",
                availability: "Available",
                rating: 4.9,
                experience: "10+ years",
                tags: ["Machine Learning", "Deep Learning", "NLP"]
            },
            {
                id: 2,
                name: "Prof. Michael Rodriguez",
                expertise: "Data Science",
                avatar: "https://via.placeholder.com/50",
                availability: "Available",
                rating: 4.8,
                experience: "8+ years",
                tags: ["Statistics", "Python", "Big Data"]
            },
            {
                id: 3,
                name: "Lisa Thompson",
                expertise: "Software Engineering",
                avatar: "https://via.placeholder.com/50",
                availability: "Busy",
                rating: 4.7,
                experience: "12+ years",
                tags: ["Full-Stack", "React", "Node.js"]
            },
            {
                id: 4,
                name: "Dr. James Wilson",
                expertise: "Cybersecurity",
                avatar: "https://via.placeholder.com/50",
                availability: "Available",
                rating: 4.9,
                experience: "15+ years",
                tags: ["Security", "Penetration Testing", "Compliance"]
            }
        ];
    }

    loadActivities() {
        return [
            {
                id: 1,
                type: "test",
                icon: "fas fa-clipboard-check",
                title: "Completed Logical Reasoning Test",
                description: "Scored 85% and earned 40 points",
                time: "2 hours ago",
                color: "#667eea"
            },
            {
                id: 2,
                type: "vr",
                icon: "fas fa-vr-cardboard",
                title: "Unlocked AR/VR Simulation",
                description: "AI Engineer career simulation available",
                time: "1 day ago",
                color: "#764ba2"
            },
            {
                id: 3,
                type: "mentor",
                icon: "fas fa-user-graduate",
                title: "Mentor Session Scheduled",
                description: "Dr. Sarah Chen - Tomorrow at 2 PM",
                time: "2 days ago",
                color: "#4ade80"
            },
            {
                id: 4,
                type: "badge",
                icon: "fas fa-trophy",
                title: "Earned New Badge",
                description: "Aptitude Master - Complete all test categories",
                time: "3 days ago",
                color: "#fbbf24"
            },
            {
                id: 5,
                type: "course",
                icon: "fas fa-book",
                title: "Course Recommendation",
                description: "Python for Data Science - Based on your interests",
                time: "1 week ago",
                color: "#f87171"
            }
        ];
    }

    loadNotifications() {
        return [
            {
                id: 1,
                type: "mentor",
                icon: "fas fa-user-graduate",
                title: "Mentor Session Reminder",
                description: "Your session with Dr. Sarah Chen is in 1 hour",
                time: "1 hour ago",
                unread: true
            },
            {
                id: 2,
                type: "milestone",
                icon: "fas fa-flag",
                title: "New Milestone Available",
                description: "Blockchain Certification milestone unlocked",
                time: "3 hours ago",
                unread: true
            },
            {
                id: 3,
                type: "course",
                icon: "fas fa-book",
                title: "Course Recommendation",
                description: "Advanced Machine Learning course suggested",
                time: "1 day ago",
                unread: false
            },
            {
                id: 4,
                type: "reward",
                icon: "fas fa-gift",
                title: "New Reward Available",
                description: "Unlock premium AR/VR experiences with 100 points",
                time: "2 days ago",
                unread: false
            }
        ];
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Progress section toggles
        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchProgressSection(e.target.dataset.target);
            });
        });

        // Refresh recommendations
        document.getElementById('refresh-recommendations').addEventListener('click', () => {
            this.refreshRecommendations();
        });

        // FAB actions
        document.querySelectorAll('.fab-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleFABAction(e.target.closest('.fab-item').dataset.action);
            });
        });

        // Mark all notifications as read
        document.getElementById('mark-all-read').addEventListener('click', () => {
            this.markAllNotificationsRead();
        });

        // View all activities
        document.getElementById('view-all-activities').addEventListener('click', () => {
            this.viewAllActivities();
        });

        // Find mentors
        document.getElementById('find-mentors').addEventListener('click', () => {
            this.findMoreMentors();
        });
    }

    initializeDashboard() {
        this.updateUserProfile();
        this.updateStats();
        this.createAptitudeCharts();
        this.loadRecommendations();
        this.loadMentors();
        this.loadActivitiesFeed();
        this.loadNotifications();
        this.updatePointsCircle();
    }

    updateUserProfile() {
        document.getElementById('welcome-name').textContent = this.userData.name;
        document.getElementById('profile-name').textContent = this.userData.name;
        document.getElementById('profile-domain').textContent = this.userData.domain;
        document.getElementById('grade-badge').textContent = `Grade ${this.userData.grade}`;
        document.getElementById('user-name').textContent = this.userData.name;
        document.getElementById('main-profile-pic').src = this.userData.profilePic;
        document.getElementById('profile-pic').src = this.userData.profilePic;
    }

    updateStats() {
        this.animateCounter('total-points', this.userData.totalPoints);
        this.animateCounter('tests-completed', this.userData.testsCompleted);
        this.animateCounter('milestones-achieved', this.userData.milestonesAchieved);
        this.animateCounter('mentor-sessions', this.userData.mentorSessions);
        
        // Update progress bars
        const progressFill = document.querySelector('.stat-card .progress-fill');
        const progressText = document.querySelector('.stat-card .progress-text');
        const progress = (this.userData.totalPoints / 1000) * 100;
        
        setTimeout(() => {
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${this.userData.totalPoints}/1000`;
        }, 500);
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const duration = 1000;
        const start = 0;
        const increment = targetValue / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    createAptitudeCharts() {
        this.createRadarChart();
        this.createBarChart();
    }

    createRadarChart() {
        const ctx = document.getElementById('aptitude-radar-chart').getContext('2d');
        const categories = Object.keys(this.aptitudeData);
        const scores = categories.map(cat => this.aptitudeData[cat].percentage);
        const labels = categories.map(cat => this.capitalizeFirst(cat));

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

    createBarChart() {
        const ctx = document.getElementById('aptitude-bar-chart').getContext('2d');
        const categories = Object.keys(this.aptitudeData);
        const scores = categories.map(cat => this.aptitudeData[cat].percentage);
        const labels = categories.map(cat => this.capitalizeFirst(cat));

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score (%)',
                    data: scores,
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(118, 75, 162, 0.8)',
                        'rgba(74, 222, 128, 0.8)',
                        'rgba(251, 191, 36, 0.8)',
                        'rgba(248, 113, 113, 0.8)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(118, 75, 162, 1)',
                        'rgba(74, 222, 128, 1)',
                        'rgba(251, 191, 36, 1)',
                        'rgba(248, 113, 113, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
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

    loadRecommendations() {
        const recommendations = this.generateRecommendations();
        const container = document.getElementById('recommendations-container');
        
        container.innerHTML = recommendations.map(rec => `
            <div class="recommendation-card animate-fadeInUp">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <a href="${rec.link}" class="btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    ${rec.action}
                </a>
            </div>
        `).join('');
    }

    generateRecommendations() {
        const topCategory = Object.entries(this.aptitudeData)
            .sort(([,a], [,b]) => b.percentage - a.percentage)[0][0];
        
        const recommendations = [
            {
                title: "Complete AR/VR Simulation",
                description: "Experience your dream job in virtual reality and earn 40 points.",
                action: "Start Now",
                link: "arvr.html"
            },
            {
                title: "Connect with Mentor",
                description: "Get personalized guidance from industry experts in your field.",
                action: "Find Mentor",
                link: "#mentor-section"
            },
            {
                title: "Blockchain Certification",
                description: "Earn verified credentials and unlock new opportunities.",
                action: "View Details",
                link: "blockchain.html"
            }
        ];

        // Add category-specific recommendations
        if (topCategory === 'logical') {
            recommendations.push({
                title: "Advanced Logic Puzzles",
                description: "Strengthen your logical reasoning with advanced problem-solving exercises.",
                action: "Practice Now",
                link: "https://www.brainbashers.com/logicpuzzles.asp"
            });
        } else if (topCategory === 'coding') {
            recommendations.push({
                title: "Coding Challenge",
                description: "Test your programming skills with real-world coding problems.",
                action: "Start Challenge",
                link: "https://leetcode.com"
            });
        }

        return recommendations;
    }

    loadMentors() {
        const container = document.getElementById('mentors-container');
        
        container.innerHTML = this.mentors.map(mentor => `
            <div class="mentor-card animate-slideInRight">
                <div class="mentor-header">
                    <img src="${mentor.avatar}" alt="${mentor.name}" class="mentor-avatar">
                    <div class="mentor-info">
                        <h4>${mentor.name}</h4>
                        <p>${mentor.expertise} • ${mentor.experience}</p>
                    </div>
                </div>
                <div class="mentor-expertise">
                    ${mentor.tags.map(tag => `<span class="expertise-tag">${tag}</span>`).join('')}
                </div>
                <div class="mentor-availability">
                    <div class="availability-dot"></div>
                    <span>${mentor.availability}</span>
                </div>
                <button class="btn-primary" onclick="requestMentorSession(${mentor.id})">
                    <i class="fas fa-user-plus"></i>
                    Request Session
                </button>
            </div>
        `).join('');
    }

    loadActivitiesFeed() {
        const container = document.getElementById('activities-feed');
        
        container.innerHTML = this.activities.map(activity => `
            <div class="activity-item animate-fadeInUp">
                <div class="activity-icon" style="background-color: ${activity.color}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    loadNotifications() {
        const container = document.getElementById('notifications-list');
        
        container.innerHTML = this.notifications.map(notification => `
            <div class="notification-item ${notification.unread ? 'unread' : ''} animate-slideInRight">
                <div class="notification-icon">
                    <i class="${notification.icon}"></i>
                </div>
                <div class="notification-content">
                    <h4>${notification.title}</h4>
                    <p>${notification.description}</p>
                </div>
            </div>
        `).join('');
    }

    updatePointsCircle() {
        const circle = document.querySelector('.circle');
        const progress = (this.userData.totalPoints / 1000) * 100;
        
        setTimeout(() => {
            circle.style.strokeDasharray = `${progress}, 100`;
        }, 1000);
        
        document.getElementById('current-points').textContent = this.userData.totalPoints;
    }

    switchProgressSection(section) {
        // Remove active class from all sections
        document.querySelectorAll('.progress-content').forEach(content => {
            content.classList.remove('active');
        });
        
        document.querySelectorAll('.btn-toggle').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected section
        document.getElementById(section).classList.add('active');
        document.querySelector(`[data-target="${section}"]`).classList.add('active');
    }

    refreshRecommendations() {
        const container = document.getElementById('recommendations-container');
        container.style.opacity = '0.5';
        
        setTimeout(() => {
            this.loadRecommendations();
            container.style.opacity = '1';
        }, 500);
    }

    handleFABAction(action) {
        switch(action) {
            case 'start-test':
                window.location.href = 'aptitude.html';
                break;
            case 'find-mentor':
                document.getElementById('mentor-section').scrollIntoView({ behavior: 'smooth' });
                break;
            case 'view-rewards':
                window.location.href = 'rewards.html';
                break;
        }
    }

    markAllNotificationsRead() {
        this.notifications.forEach(notification => {
            notification.unread = false;
        });
        this.loadNotifications();
    }

    viewAllActivities() {
        // In a real app, this would open a detailed activities page
        alert('Viewing all activities...');
    }

    findMoreMentors() {
        // In a real app, this would open a mentor search page
        alert('Finding more mentors...');
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const themeIcon = document.querySelector('#theme-toggle i');
        themeIcon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    startAnimations() {
        // Animate stat cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                }
            });
        });

        document.querySelectorAll('.stat-card').forEach(card => {
            observer.observe(card);
        });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Global functions for mentor requests
function requestMentorSession(mentorId) {
    const mentor = dashboard.mentors.find(m => m.id === mentorId);
    if (mentor) {
        alert(`Requesting session with ${mentor.name}...`);
        // In a real app, this would open a booking modal or redirect to booking page
    }
}

// Initialize dashboard when page loads
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new Dashboard();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});
