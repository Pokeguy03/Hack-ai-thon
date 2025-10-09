// Rewards Store Application
class RewardsStore {
    constructor() {
        this.userData = this.loadUserData();
        this.rewards = this.loadRewards();
        this.history = this.loadHistory();
        this.currentFilter = 'all';
        this.selectedReward = null;
        
        this.initializeEventListeners();
        this.initializeStore();
        this.startAnimations();
    }

    loadUserData() {
        const defaultData = {
            name: "Alex Johnson",
            profilePic: "https://via.placeholder.com/40",
            totalPoints: 275,
            availablePoints: 275,
            totalEarned: 500,
            totalSpent: 225
        };
        
        return JSON.parse(localStorage.getItem('userData')) || defaultData;
    }

    loadRewards() {
        return [
            {
                id: 1,
                name: "VR Lab Access",
                description: "Unlock premium AR/VR career simulations and immersive experiences",
                points: 180,
                category: "arvr",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-vr-cardboard",
                validity: "30 days",
                available: true
            },
            {
                id: 2,
                name: "Premium Mentor Session",
                description: "1-on-1 session with industry expert for personalized career guidance",
                points: 150,
                category: "mentorship",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-user-graduate",
                validity: "7 days",
                available: true
            },
            {
                id: 3,
                name: "Advanced Python Course",
                description: "Complete access to comprehensive Python programming course",
                points: 120,
                category: "skills",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-code",
                validity: "90 days",
                available: true
            },
            {
                id: 4,
                name: "Blockchain Certificate",
                description: "Verified blockchain-based certificate for your achievements",
                points: 200,
                category: "certificates",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-certificate",
                validity: "Permanent",
                available: true
            },
            {
                id: 5,
                name: "Premium Dashboard",
                description: "Access to advanced analytics and personalized insights",
                points: 100,
                category: "premium",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-chart-line",
                validity: "30 days",
                available: true
            },
            {
                id: 6,
                name: "AI Career Simulation",
                description: "Experience working as an AI engineer in virtual reality",
                points: 250,
                category: "arvr",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-robot",
                validity: "14 days",
                available: false
            },
            {
                id: 7,
                name: "Data Science Workshop",
                description: "Live workshop with data science experts and hands-on projects",
                points: 300,
                category: "skills",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-database",
                validity: "7 days",
                available: false
            },
            {
                id: 8,
                name: "Executive Mentor Access",
                description: "Connect with C-level executives for career strategy sessions",
                points: 400,
                category: "mentorship",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-crown",
                validity: "14 days",
                available: false
            },
            {
                id: 9,
                name: "Industry Certification",
                description: "Official industry-recognized certification in your field",
                points: 500,
                category: "certificates",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-medal",
                validity: "Permanent",
                available: false
            },
            {
                id: 10,
                name: "Premium AR/VR Suite",
                description: "Complete access to all AR/VR experiences and simulations",
                points: 600,
                category: "premium",
                image: "https://via.placeholder.com/60",
                icon: "fas fa-magic",
                validity: "60 days",
                available: false
            }
        ];
    }

    loadHistory() {
        return [
            {
                id: 1,
                type: "earned",
                title: "Completed Logical Reasoning Test",
                description: "Scored 85% and earned bonus points",
                points: 50,
                time: "2 hours ago",
                icon: "fas fa-brain"
            },
            {
                id: 2,
                type: "spent",
                title: "Redeemed VR Lab Access",
                description: "Unlocked premium AR/VR experiences",
                points: 180,
                time: "1 day ago",
                icon: "fas fa-vr-cardboard"
            },
            {
                id: 3,
                type: "earned",
                title: "Completed Quantitative Test",
                description: "Achieved 90% score with perfect bonus",
                points: 75,
                time: "2 days ago",
                icon: "fas fa-calculator"
            },
            {
                id: 4,
                type: "spent",
                title: "Redeemed Mentor Session",
                description: "Booked session with Dr. Sarah Chen",
                points: 150,
                time: "3 days ago",
                icon: "fas fa-user-graduate"
            },
            {
                id: 5,
                type: "earned",
                title: "AR/VR Simulation Complete",
                description: "Finished AI Engineer career simulation",
                points: 100,
                time: "1 week ago",
                icon: "fas fa-robot"
            },
            {
                id: 6,
                type: "earned",
                title: "Mentor Session Attended",
                description: "Completed session and received feedback",
                points: 25,
                time: "1 week ago",
                icon: "fas fa-handshake"
            }
        ];
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search functionality
        document.getElementById('search-rewards').addEventListener('input', (e) => {
            this.filterRewards(e.target.value);
        });

        // Category filter
        document.getElementById('category-filter').addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });

        // History filter
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterHistory(e.target.dataset.filter);
            });
        });

        // Modal controls
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModal();
            });
        });

        // Redeem button
        document.getElementById('redeem-btn').addEventListener('click', () => {
            this.showConfirmationModal();
        });

        // Confirmation controls
        document.getElementById('cancel-redeem').addEventListener('click', () => {
            this.closeConfirmationModal();
        });

        document.getElementById('confirm-redeem').addEventListener('click', () => {
            this.confirmRedemption();
        });

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }

    initializeStore() {
        this.updateUserProfile();
        this.updatePointsDisplay();
        this.loadRewardsGrid();
        this.loadHistoryTimeline();
        this.updateAchievements();
    }

    updateUserProfile() {
        document.getElementById('user-name').textContent = this.userData.name;
        document.getElementById('profile-pic').src = this.userData.profilePic;
    }

    updatePointsDisplay() {
        this.animateCounter('total-points', this.userData.totalPoints);
        this.animateCounter('available-points', this.userData.availablePoints);
        this.animateCounter('total-earned', this.userData.totalEarned);
        this.animateCounter('total-spent', this.userData.totalSpent);
        
        // Update points circle
        const circle = document.querySelector('.circle');
        const progress = (this.userData.availablePoints / this.userData.totalPoints) * 100;
        
        setTimeout(() => {
            circle.style.strokeDasharray = `${progress}, 100`;
        }, 1000);
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

    loadRewardsGrid() {
        const container = document.getElementById('rewards-grid');
        const filteredRewards = this.getFilteredRewards();
        
        container.innerHTML = filteredRewards.map(reward => `
            <div class="reward-card ${reward.available ? 'available' : 'unavailable'} animate-fadeIn" 
                 data-reward-id="${reward.id}">
                <div class="reward-image">
                    <i class="${reward.icon}"></i>
                </div>
                <div class="reward-info">
                    <h4>${reward.name}</h4>
                    <p class="reward-description">${reward.description}</p>
                    <div class="reward-meta">
                        <div class="reward-points">
                            <i class="fas fa-coins"></i>
                            <span>${reward.points} points</span>
                        </div>
                        <div class="reward-category">${this.getCategoryName(reward.category)}</div>
                    </div>
                    <div class="reward-actions">
                        <button class="btn-redeem" ${!reward.available ? 'disabled' : ''} 
                                onclick="rewardsStore.showRewardModal(${reward.id})">
                            <i class="fas fa-gift"></i>
                            ${reward.available ? 'Redeem' : 'Not Available'}
                        </button>
                        <button class="btn-details" onclick="rewardsStore.showRewardModal(${reward.id})">
                            <i class="fas fa-info"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFilteredRewards() {
        let filtered = this.rewards;
        
        // Filter by category
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(reward => reward.category === this.currentFilter);
        }
        
        // Filter by search term
        const searchTerm = document.getElementById('search-rewards').value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(reward => 
                reward.name.toLowerCase().includes(searchTerm) ||
                reward.description.toLowerCase().includes(searchTerm)
            );
        }
        
        return filtered;
    }

    filterRewards(searchTerm) {
        this.loadRewardsGrid();
    }

    filterByCategory(category) {
        this.currentFilter = category;
        this.loadRewardsGrid();
    }

    showRewardModal(rewardId) {
        const reward = this.rewards.find(r => r.id === rewardId);
        if (!reward) return;
        
        this.selectedReward = reward;
        
        // Update modal content
        document.getElementById('modal-title').textContent = reward.name;
        document.getElementById('modal-name').textContent = reward.name;
        document.getElementById('modal-description').textContent = reward.description;
        document.getElementById('modal-image').src = reward.image;
        document.getElementById('modal-points').textContent = `${reward.points} points`;
        document.getElementById('modal-category').textContent = this.getCategoryName(reward.category);
        document.getElementById('modal-validity').textContent = `Valid for ${reward.validity}`;
        
        // Show modal
        document.getElementById('reward-modal').classList.add('active');
    }

    showConfirmationModal() {
        if (!this.selectedReward) return;
        
        const remainingPoints = this.userData.availablePoints - this.selectedReward.points;
        
        document.getElementById('confirmation-reward').textContent = this.selectedReward.name;
        document.getElementById('confirmation-cost').textContent = `${this.selectedReward.points} points`;
        document.getElementById('confirmation-remaining').textContent = `${remainingPoints} points`;
        
        // Close reward modal and show confirmation
        this.closeModal();
        document.getElementById('confirmation-modal').classList.add('active');
    }

    confirmRedemption() {
        if (!this.selectedReward) return;
        
        // Check if user has enough points
        if (this.userData.availablePoints < this.selectedReward.points) {
            this.showToast('Insufficient points!', 'error');
            this.closeConfirmationModal();
            return;
        }
        
        // Process redemption
        this.userData.availablePoints -= this.selectedReward.points;
        this.userData.totalSpent += this.selectedReward.points;
        
        // Add to history
        this.history.unshift({
            id: Date.now(),
            type: "spent",
            title: `Redeemed ${this.selectedReward.name}`,
            description: `Spent ${this.selectedReward.points} points`,
            points: this.selectedReward.points,
            time: "Just now",
            icon: this.selectedReward.icon
        });
        
        // Update local storage
        localStorage.setItem('userData', JSON.stringify(this.userData));
        localStorage.setItem('rewardsHistory', JSON.stringify(this.history));
        
        // Update UI
        this.updatePointsDisplay();
        this.loadHistoryTimeline();
        this.loadRewardsGrid();
        
        // Show success message
        this.showToast(`Successfully redeemed ${this.selectedReward.name}!`, 'success');
        
        // Log to blockchain (simulated)
        this.logToBlockchain('redemption', {
            reward: this.selectedReward.name,
            points: this.selectedReward.points,
            timestamp: new Date().toISOString()
        });
        
        this.closeConfirmationModal();
    }

    closeModal() {
        document.getElementById('reward-modal').classList.remove('active');
    }

    closeConfirmationModal() {
        document.getElementById('confirmation-modal').classList.remove('active');
    }

    loadHistoryTimeline() {
        const container = document.getElementById('history-timeline');
        const filteredHistory = this.getFilteredHistory();
        
        container.innerHTML = filteredHistory.map(item => `
            <div class="history-item ${item.type} animate-slideIn">
                <div class="history-icon ${item.type}">
                    <i class="${item.icon}"></i>
                </div>
                <div class="history-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                </div>
                <div class="history-meta">
                    <div class="history-points ${item.type}">
                        ${item.type === 'earned' ? '+' : '-'}${item.points}
                    </div>
                    <div class="history-time">${item.time}</div>
                </div>
            </div>
        `).join('');
    }

    getFilteredHistory() {
        const filter = document.querySelector('.btn-filter.active')?.dataset.filter || 'all';
        
        if (filter === 'all') {
            return this.history;
        } else {
            return this.history.filter(item => item.type === filter);
        }
    }

    filterHistory(filter) {
        // Update active filter button
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.loadHistoryTimeline();
    }

    updateAchievements() {
        // In a real app, this would check actual achievements
        // For now, we'll simulate based on user data
        const achievements = document.querySelectorAll('.achievement-badge');
        
        achievements.forEach(badge => {
            const achievementName = badge.querySelector('span').textContent;
            
            // Simulate achievement unlocking based on user data
            if (achievementName === 'Aptitude Master' && this.userData.totalEarned >= 200) {
                badge.classList.add('earned');
                badge.classList.remove('locked');
            } else if (achievementName === 'VR Explorer' && this.userData.totalSpent >= 180) {
                badge.classList.add('earned');
                badge.classList.remove('locked');
            }
        });
    }

    getCategoryName(category) {
        const names = {
            'arvr': 'AR/VR',
            'mentorship': 'Mentorship',
            'skills': 'Skills',
            'certificates': 'Certificates',
            'premium': 'Premium'
        };
        return names[category] || category;
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = toast.querySelector('.toast-icon');
        const messageEl = toast.querySelector('.toast-message');
        
        // Update content
        messageEl.textContent = message;
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        // Update styling
        toast.className = `toast ${type}`;
        
        // Show toast
        toast.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    logToBlockchain(action, data) {
        // Simulate blockchain logging
        console.log('Blockchain Log:', {
            action,
            data,
            hash: this.generateBlockchainHash(),
            timestamp: new Date().toISOString()
        });
        
        // In a real app, this would send to actual blockchain
        // For now, we'll just log to console
    }

    generateBlockchainHash() {
        const data = JSON.stringify({ action: 'redemption', data, timestamp: Date.now() });
        return '0x' + btoa(data).substring(0, 20) + '...';
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
        // Animate cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        });

        document.querySelectorAll('.reward-card').forEach(card => {
            observer.observe(card);
        });
    }
}

// Global functions
function redeemPoints(rewardName, pointsRequired) {
    // This function can be called from other parts of the app
    console.log(`Redeeming ${rewardName} for ${pointsRequired} points`);
}

// Initialize the rewards store when page loads
let rewardsStore;
document.addEventListener('DOMContentLoaded', () => {
    rewardsStore = new RewardsStore();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});
