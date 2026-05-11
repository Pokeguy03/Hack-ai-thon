// Blockchain Verification Application
class BlockchainVerification {
    constructor() {
        this.userData = this.loadUserData();
        this.transactions = this.loadTransactions();
        this.currentFilter = 'all';
        this.demoStep = 1;
        
        this.initializeEventListeners();
        this.initializePage();
        this.startAnimations();
    }

    loadUserData() {
        const defaultData = {
            name: "Alex Johnson",
            profilePic: "https://via.placeholder.com/40",
            totalPoints: 275,
            availablePoints: 275,
            pointsSpent: 225,
            verifiedTransactions: 12
        };
        
        return JSON.parse(localStorage.getItem('userData')) || defaultData;
    }

    loadTransactions() {
        return [
            {
                id: 1,
                type: 'earned',
                description: 'Completed Logical Reasoning Test',
                points: 50,
                status: 'verified',
                date: '2025-01-15 14:30',
                hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
                icon: 'fas fa-brain'
            },
            {
                id: 2,
                type: 'spent',
                description: 'Redeemed VR Lab Access',
                points: 180,
                status: 'verified',
                date: '2025-01-15 10:15',
                hash: '0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a',
                icon: 'fas fa-vr-cardboard'
            },
            {
                id: 3,
                type: 'earned',
                description: 'Completed Quantitative Test',
                points: 75,
                status: 'verified',
                date: '2025-01-14 16:45',
                hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b',
                icon: 'fas fa-calculator'
            },
            {
                id: 4,
                type: 'spent',
                description: 'Redeemed Mentor Session',
                points: 150,
                status: 'verified',
                date: '2025-01-14 09:20',
                hash: '0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c',
                icon: 'fas fa-user-graduate'
            },
            {
                id: 5,
                type: 'achievement',
                description: 'Unlocked Aptitude Master Badge',
                points: 100,
                status: 'verified',
                date: '2025-01-13 18:30',
                hash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d',
                icon: 'fas fa-trophy'
            },
            {
                id: 6,
                type: 'earned',
                description: 'Completed AR/VR Simulation',
                points: 60,
                status: 'verified',
                date: '2025-01-13 14:15',
                hash: '0x6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e',
                icon: 'fas fa-robot'
            },
            {
                id: 7,
                type: 'spent',
                description: 'Redeemed Premium Course',
                points: 200,
                status: 'verified',
                date: '2025-01-12 11:45',
                hash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f',
                icon: 'fas fa-book'
            },
            {
                id: 8,
                type: 'earned',
                description: 'Completed Verbal Test',
                points: 45,
                status: 'verified',
                date: '2025-01-12 08:30',
                hash: '0x8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a',
                icon: 'fas fa-language'
            },
            {
                id: 9,
                type: 'achievement',
                description: 'Unlocked VR Explorer Badge',
                points: 80,
                status: 'verified',
                date: '2025-01-11 16:20',
                hash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
                icon: 'fas fa-vr-cardboard'
            },
            {
                id: 10,
                type: 'earned',
                description: 'Completed Coding Test',
                points: 65,
                status: 'verified',
                date: '2025-01-11 13:10',
                hash: '0x0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
                icon: 'fas fa-code'
            }
        ];
    }

    initializeEventListeners() {
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Hero buttons
        document.getElementById('view-ledger-btn').addEventListener('click', () => {
            document.getElementById('ledger-section').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('learn-how-btn').addEventListener('click', () => {
            document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
        });

        // Filter tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterTransactions(e.target.dataset.filter);
            });
        });

        // Search functionality
        document.getElementById('transaction-search').addEventListener('input', (e) => {
            this.searchTransactions(e.target.value);
        });

        // Demo functionality
        document.getElementById('complete-test-btn').addEventListener('click', () => {
            this.runDemo();
        });

        // Verification tools
        document.getElementById('verify-tx-btn').addEventListener('click', () => {
            this.verifyTransaction();
        });

        document.getElementById('verify-achievements-btn').addEventListener('click', () => {
            this.verifyAchievements();
        });

        document.getElementById('export-pdf-btn').addEventListener('click', () => {
            this.exportLedger('pdf');
        });

        document.getElementById('export-json-btn').addEventListener('click', () => {
            this.exportLedger('json');
        });

        // Blockchain network nodes
        document.querySelectorAll('.node').forEach(node => {
            node.addEventListener('click', () => {
                this.activateNode(node);
            });
        });
    }

    initializePage() {
        this.updateUserProfile();
        this.updateStats();
        this.loadTransactions();
        this.animateCounters();
    }

    updateUserProfile() {
        document.getElementById('user-name').textContent = this.userData.name;
        document.getElementById('profile-pic').src = this.userData.profilePic;
    }

    updateStats() {
        document.getElementById('total-points').textContent = this.userData.totalPoints;
        document.getElementById('points-spent').textContent = this.userData.pointsSpent;
        document.getElementById('available-points').textContent = this.userData.availablePoints;
        document.getElementById('verified-transactions').textContent = this.userData.verifiedTransactions;
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-content h3');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent);
            const duration = 2000;
            let startTimestamp = null;
            
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                counter.textContent = Math.floor(progress * target);
                
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        });
    }

    loadTransactions() {
        const container = document.getElementById('transactions-list');
        const filteredTransactions = this.getFilteredTransactions();
        
        container.innerHTML = filteredTransactions.map(tx => `
            <div class="transaction-row" data-tx-id="${tx.id}">
                <div class="transaction-type">
                    <i class="${tx.icon}"></i>
                    <span>${this.getTypeLabel(tx.type)}</span>
                </div>
                <div class="transaction-description">${tx.description}</div>
                <div class="transaction-points ${tx.type}">
                    ${tx.type === 'spent' ? '-' : '+'}${tx.points}
                </div>
                <div class="transaction-status">
                    <i class="fas fa-check-circle"></i>
                    <span class="status-${tx.status}">${tx.status}</span>
                </div>
                <div class="transaction-date">${tx.date}</div>
                <div class="transaction-hash" title="${tx.hash}">${tx.hash.substring(0, 20)}...</div>
            </div>
        `).join('');

        // Add click handlers for transaction rows
        document.querySelectorAll('.transaction-row').forEach(row => {
            row.addEventListener('click', () => {
                this.showTransactionDetails(row.dataset.txId);
            });
        });
    }

    getFilteredTransactions() {
        let filtered = this.transactions;
        
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(tx => tx.type === this.currentFilter);
        }
        
        return filtered;
    }

    getTypeLabel(type) {
        const labels = {
            'earned': 'Earned',
            'spent': 'Spent',
            'achievement': 'Achievement'
        };
        return labels[type] || type;
    }

    filterTransactions(filter) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.currentFilter = filter;
        this.loadTransactions();
    }

    searchTransactions(query) {
        const rows = document.querySelectorAll('.transaction-row');
        const searchTerm = query.toLowerCase();
        
        rows.forEach(row => {
            const description = row.querySelector('.transaction-description').textContent.toLowerCase();
            const type = row.querySelector('.transaction-type span').textContent.toLowerCase();
            
            if (description.includes(searchTerm) || type.includes(searchTerm)) {
                row.style.display = 'grid';
            } else {
                row.style.display = 'none';
            }
        });
    }

    showTransactionDetails(txId) {
        const transaction = this.transactions.find(tx => tx.id == txId);
        if (!transaction) return;
        
        // Create modal or show details
        alert(`Transaction Details:\n\nType: ${this.getTypeLabel(transaction.type)}\nDescription: ${transaction.description}\nPoints: ${transaction.points}\nStatus: ${transaction.status}\nDate: ${transaction.date}\nHash: ${transaction.hash}`);
    }

    runDemo() {
        const steps = document.querySelectorAll('.demo-step');
        const blocks = document.querySelectorAll('.block');
        
        // Reset demo
        steps.forEach(step => step.classList.remove('active'));
        blocks.forEach(block => block.classList.remove('highlighted'));
        
        // Step 1: Complete test
        document.getElementById('step-1').classList.add('active');
        this.animatePointsEarned();
        
        setTimeout(() => {
            // Step 2: Points earned
            document.getElementById('step-2').classList.add('active');
            document.getElementById('step-1').classList.remove('active');
            
            // Highlight first block
            document.querySelector('[data-block="1"]').classList.add('highlighted');
        }, 2000);
        
        setTimeout(() => {
            // Step 3: Transaction confirmed
            document.getElementById('step-3').classList.add('active');
            document.getElementById('step-2').classList.remove('active');
            
            // Show transaction hash animation
            this.animateTransactionHash();
        }, 4000);
        
        setTimeout(() => {
            // Reset demo
            document.getElementById('step-3').classList.remove('active');
            document.querySelector('[data-block="1"]').classList.remove('highlighted');
            document.getElementById('complete-test-btn').textContent = 'Try Again';
        }, 6000);
    }

    animatePointsEarned() {
        const pointsElement = document.querySelector('.points-earned');
        if (pointsElement) {
            pointsElement.style.display = 'block';
            pointsElement.classList.add('bounce');
        }
    }

    animateTransactionHash() {
        const hashElement = document.querySelector('.transaction-hash code');
        if (hashElement) {
            hashElement.style.animation = 'typing 2s steps(40) 1s 1 normal both';
        }
    }

    activateNode(node) {
        // Remove active class from all nodes
        document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
        
        // Add active class to clicked node
        node.classList.add('active');
        
        // Show tooltip or info
        const nodeType = node.dataset.node;
        const info = this.getNodeInfo(nodeType);
        
        // Create temporary tooltip
        this.showNodeTooltip(node, info);
    }

    getNodeInfo(nodeType) {
        const info = {
            'user': 'Your profile and progress data',
            'points': 'Points earned through activities',
            'rewards': 'Rewards redeemed with points',
            'mentors': 'Mentor connections and sessions',
            'achievements': 'Badges and accomplishments',
            'certificates': 'Verified certificates and credentials'
        };
        return info[nodeType] || 'Blockchain node';
    }

    showNodeTooltip(node, info) {
        // Remove existing tooltip
        const existingTooltip = document.querySelector('.node-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'node-tooltip';
        tooltip.textContent = info;
        tooltip.style.cssText = `
            position: absolute;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.9rem;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = node.getBoundingClientRect();
        tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }

    verifyTransaction() {
        const hash = document.getElementById('tx-hash-input').value.trim();
        if (!hash) {
            alert('Please enter a transaction hash');
            return;
        }
        
        // Simulate verification
        const isValid = this.simulateVerification(hash);
        
        if (isValid) {
            alert('✅ Transaction verified successfully!\n\nThis transaction is valid and confirmed on the blockchain.');
        } else {
            alert('❌ Transaction verification failed!\n\nThis transaction hash is invalid or not found.');
        }
    }

    simulateVerification(hash) {
        // Simulate verification by checking if hash exists in transactions
        return this.transactions.some(tx => tx.hash.includes(hash.substring(0, 10)));
    }

    verifyAchievements() {
        // Simulate verification process
        const achievements = document.querySelectorAll('.achievement-card');
        let verifiedCount = 0;
        
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                achievement.style.opacity = '0.5';
                achievement.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    achievement.style.opacity = '1';
                    achievement.style.transform = 'scale(1)';
                    verifiedCount++;
                    
                    if (verifiedCount === achievements.length) {
                        alert('✅ All achievements verified successfully!\n\nAll your achievements are confirmed on the blockchain.');
                    }
                }, 500);
            }, index * 200);
        });
    }

    exportLedger(format) {
        const data = {
            user: this.userData,
            transactions: this.transactions,
            exportDate: new Date().toISOString()
        };
        
        if (format === 'json') {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blockchain-ledger.json';
            a.click();
            URL.revokeObjectURL(url);
        } else if (format === 'pdf') {
            // For PDF export, we would need a PDF library like jsPDF
            alert('PDF export would require additional library. JSON export is available.');
        }
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
        // Animate blockchain nodes
        const nodes = document.querySelectorAll('.node');
        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '0';
                node.style.transform = 'scale(0)';
                node.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    node.style.opacity = '1';
                    node.style.transform = 'scale(1)';
                }, 100);
            }, index * 200);
        });

        // Animate blocks in blockchain visualization
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            setTimeout(() => {
                block.style.opacity = '0';
                block.style.transform = 'translateX(-50px)';
                block.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    block.style.opacity = '1';
                    block.style.transform = 'translateX(0)';
                }, 100);
            }, index * 300);
        });
    }
}

// Initialize the blockchain verification when page loads
let blockchainApp;
document.addEventListener('DOMContentLoaded', () => {
    blockchainApp = new BlockchainVerification();
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    const themeIcon = document.querySelector('#theme-toggle i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});
