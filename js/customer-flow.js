// Customer Flow Manager - Handles Post Job, Providers, Bids, Chat, and History
class CustomerFlowManager {
    constructor() {
        this.postedJobs = this.loadPostedJobs();
        this.providers = this.loadProviders();
        this.bids = this.loadBids();
        this.messages = this.loadMessages();
        this.jobHistory = this.loadJobHistory();
        this.loyaltyPoints = this.loadLoyaltyPoints();
        this.selectedJobId = null;
        this.selectedChatId = null;
        this.uploadedPhotos = [];
    }

    loadPostedJobs() {
        const saved = localStorage.getItem('piecejob_posted_jobs');
        return saved ? JSON.parse(saved) : [];
    }

    loadProviders() {
        const saved = localStorage.getItem('piecejob_providers');
        if (saved) return JSON.parse(saved);
        
        // Mock providers data
        const mockProviders = [
            {
                id: 1,
                name: 'Thabo Mthembu',
                role: 'Professional Cleaner',
                avatar: 'TM',
                rating: 4.9,
                reviewCount: 127,
                distance: 2.3,
                location: 'Sandton, Johannesburg',
                qualifications: 'Certified cleaning professional with 8+ years experience. Insured and bonded.',
                skills: ['Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning'],
                verified: true
            },
            {
                id: 2,
                name: 'Sarah van der Merwe',
                role: 'Garden Specialist',
                avatar: 'SM',
                rating: 4.8,
                reviewCount: 89,
                distance: 4.1,
                location: 'Rosebank, Johannesburg',
                qualifications: 'Horticulture diploma, 10 years landscaping experience. Own equipment.',
                skills: ['Lawn Care', 'Pruning', 'Garden Design'],
                verified: true
            },
            {
                id: 3,
                name: 'Michael Johnson',
                role: 'Handyman',
                avatar: 'MJ',
                rating: 4.7,
                reviewCount: 156,
                distance: 6.8,
                location: 'Midrand, Johannesburg',
                qualifications: 'Multi-skilled tradesman. Licensed electrician and plumber.',
                skills: ['Electrical', 'Plumbing', 'Carpentry'],
                verified: true
            },
            {
                id: 4,
                name: 'Nomsa Dlamini',
                role: 'House Cleaner',
                avatar: 'ND',
                rating: 4.9,
                reviewCount: 203,
                distance: 3.2,
                location: 'Sandton, Johannesburg',
                qualifications: 'Professional cleaning service with own supplies. Background checked.',
                skills: ['House Cleaning', 'Deep Cleaning', 'Move-in/out'],
                verified: true
            }
        ];
        
        this.saveProviders(mockProviders);
        return mockProviders;
    }

    loadBids() {
        const saved = localStorage.getItem('piecejob_bids');
        if (saved) return JSON.parse(saved);
        
        // Mock bids data
        const mockBids = [
            {
                id: 1,
                jobId: 1,
                providerId: 1,
                amount: 450,
                message: 'I can clean your house thoroughly including all bathrooms and kitchen. I bring my own supplies and equipment. Available this weekend.',
                submittedDate: '2024-01-16T10:30:00Z',
                status: 'pending'
            },
            {
                id: 2,
                jobId: 1,
                providerId: 4,
                amount: 420,
                message: 'Professional house cleaning service. I have 15+ years experience and excellent references. Can start immediately.',
                submittedDate: '2024-01-16T14:15:00Z',
                status: 'pending'
            }
        ];
        
        this.saveBids(mockBids);
        return mockBids;
    }

    loadMessages() {
        const saved = localStorage.getItem('piecejob_messages');
        if (saved) return JSON.parse(saved);
        
        // Mock messages data
        const mockMessages = [
            {
                id: 1,
                providerId: 1,
                providerName: 'Thabo Mthembu',
                messages: [
                    {
                        id: 1,
                        sender: 'provider',
                        text: 'Hi! I saw your cleaning job posting. I can help you with that.',
                        timestamp: '2024-01-16T09:00:00Z'
                    },
                    {
                        id: 2,
                        sender: 'customer',
                        text: 'Great! When would you be available?',
                        timestamp: '2024-01-16T09:15:00Z'
                    },
                    {
                        id: 3,
                        sender: 'provider',
                        text: 'I can come this Saturday morning around 9 AM. Would that work?',
                        timestamp: '2024-01-16T09:20:00Z'
                    }
                ],
                lastMessage: 'I can come this Saturday morning around 9 AM. Would that work?',
                lastMessageTime: '2024-01-16T09:20:00Z'
            },
            {
                id: 2,
                providerId: 2,
                providerName: 'Sarah van der Merwe',
                messages: [
                    {
                        id: 1,
                        sender: 'provider',
                        text: 'Hello! I specialize in garden maintenance and would love to help with your garden.',
                        timestamp: '2024-01-15T16:30:00Z'
                    }
                ],
                lastMessage: 'Hello! I specialize in garden maintenance and would love to help with your garden.',
                lastMessageTime: '2024-01-15T16:30:00Z'
            }
        ];
        
        this.saveMessages(mockMessages);
        return mockMessages;
    }

    loadJobHistory() {
        const saved = localStorage.getItem('piecejob_job_history');
        if (saved) return JSON.parse(saved);
        
        // Mock job history
        const mockHistory = [
            {
                id: 1,
                title: 'House Deep Cleaning',
                photo: '🏠',
                status: 'completed',
                providerName: 'Maria Santos',
                rating: 5,
                completedDate: '2024-01-10',
                amount: 450
            },
            {
                id: 2,
                title: 'Garden Maintenance',
                photo: '🌿',
                status: 'completed',
                providerName: 'John Green',
                rating: 4,
                completedDate: '2024-01-05',
                amount: 300
            },
            {
                id: 3,
                title: 'Plumbing Repair',
                photo: '🔧',
                status: 'cancelled',
                providerName: 'Mike Wilson',
                rating: null,
                completedDate: '2024-01-03',
                amount: 0
            }
        ];
        
        this.saveJobHistory(mockHistory);
        return mockHistory;
    }

    loadLoyaltyPoints() {
        const saved = localStorage.getItem('piecejob_loyalty_points');
        return saved ? parseInt(saved) : 50; // Default 50 points
    }

    savePostedJobs(jobs) {
        localStorage.setItem('piecejob_posted_jobs', JSON.stringify(jobs));
    }

    saveProviders(providers) {
        localStorage.setItem('piecejob_providers', JSON.stringify(providers));
    }

    saveBids(bids) {
        localStorage.setItem('piecejob_bids', JSON.stringify(bids));
    }

    saveMessages(messages) {
        localStorage.setItem('piecejob_messages', JSON.stringify(messages));
    }

    saveJobHistory(history) {
        localStorage.setItem('piecejob_job_history', JSON.stringify(history));
    }

    saveLoyaltyPoints(points) {
        localStorage.setItem('piecejob_loyalty_points', points.toString());
    }

    // Photo upload handling
    handlePhotoUpload(files) {
        if (this.uploadedPhotos.length + files.length > 10) {
            alert('Maximum 10 photos allowed');
            return;
        }

        Array.from(files).forEach(file => {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert(`File ${file.name} is too large. Maximum 5MB per photo.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedPhotos.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    url: e.target.result
                });
                this.renderPhotoPreview();
            };
            reader.readAsDataURL(file);
        });
    }

    removePhoto(photoId) {
        this.uploadedPhotos = this.uploadedPhotos.filter(photo => photo.id !== photoId);
        this.renderPhotoPreview();
    }

    renderPhotoPreview() {
        const previewContainer = document.getElementById('photoPreview');
        if (!previewContainer) return;

        previewContainer.innerHTML = this.uploadedPhotos.map(photo => `
            <div class="photo-preview-item">
                <img src="${photo.url}" alt="${photo.name}">
                <button type="button" class="photo-remove-btn" onclick="customerFlow.removePhoto(${photo.id})">×</button>
            </div>
        `).join('');
    }

    // Post job functionality
    handlePostJob(formData) {
        const newJob = {
            id: Date.now(),
            title: formData.get('jobTitle'),
            category: formData.get('jobCategory'),
            description: formData.get('jobDescription'),
            location: formData.get('jobLocation'),
            budget: formData.get('jobBudget'),
            photos: [...this.uploadedPhotos],
            status: 'open',
            postedDate: new Date().toISOString(),
            customerId: window.app.currentUser.id
        };

        this.postedJobs.push(newJob);
        this.savePostedJobs(this.postedJobs);
        
        // Reset form
        this.uploadedPhotos = [];
        
        // Show success message
        this.showMessage('Job posted successfully! Providers will start bidding soon.', 'success');
        
        // Navigate to browse providers
        setTimeout(() => {
            window.app.navigateTo('browse-providers');
        }, 2000);
    }

    // Render providers page
    renderProviders() {
        const container = document.getElementById('providersList');
        if (!container) return;

        // Filter providers within 15km of Johannesburg CBD
        const nearbyProviders = this.providers.filter(provider => provider.distance <= 15);
        
        if (nearbyProviders.length === 0) {
            container.innerHTML = `
                <div class="text-center" style="padding: 40px;">
                    <h3>No providers found</h3>
                    <p style="color: #718096;">No service providers have placed bids yet. Check back later!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="provider-grid">
                ${nearbyProviders.map(provider => this.renderProviderCard(provider)).join('')}
            </div>
        `;
    }

    renderProviderCard(provider) {
        const bid = this.bids.find(b => b.providerId === provider.id);
        const stars = '⭐'.repeat(Math.floor(provider.rating));
        
        return `
            <div class="provider-card">
                <div class="provider-header">
                    <div class="provider-avatar">${provider.avatar}</div>
                    <div class="provider-info">
                        <h3>${provider.name} ${provider.verified ? '✓' : ''}</h3>
                        <div class="provider-role">${provider.role}</div>
                        <div class="provider-rating">
                            <span class="stars">${stars}</span>
                            <span>${provider.rating}/5 (${provider.reviewCount} reviews)</span>
                        </div>
                    </div>
                </div>
                
                <div class="provider-qualifications">
                    ${provider.qualifications}
                </div>
                
                <div class="provider-distance">
                    📍 ${provider.distance}km away • ${provider.location}
                </div>
                
                ${bid ? `
                    <div class="provider-bid">
                        <div class="bid-amount">R${bid.amount}</div>
                        <div class="bid-message">${bid.message}</div>
                    </div>
                ` : ''}
                
                <button class="btn btn-primary" style="width: 100%;" onclick="customerFlow.viewBid(${provider.id})">
                    ${bid ? 'View Bid' : 'Contact Provider'}
                </button>
            </div>
        `;
    }

    viewBid(providerId) {
        this.selectedJobId = providerId;
        window.app.navigateTo('view-bids');
    }

    // Render bids page
    renderBids() {
        const container = document.getElementById('bidsContent');
        if (!container) return;

        const provider = this.providers.find(p => p.id === this.selectedJobId);
        const bid = this.bids.find(b => b.providerId === this.selectedJobId);
        const job = this.postedJobs[0]; // For demo, use first posted job

        if (!provider || !bid) {
            container.innerHTML = '<p>Bid not found.</p>';
            return;
        }

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="job-card" style="margin-bottom: 32px;">
                    <h2>Job Details</h2>
                    ${job ? `
                        <h3>${job.title}</h3>
                        <p>${job.description}</p>
                        <p><strong>Location:</strong> ${job.location}</p>
                        <p><strong>Budget:</strong> ${job.budget || 'Not specified'}</p>
                    ` : `
                        <h3>House Cleaning Service</h3>
                        <p>Need a reliable cleaner for my 3-bedroom house in Sandton. Deep cleaning required including bathrooms, kitchen, and all bedrooms.</p>
                        <p><strong>Location:</strong> Sandton, Johannesburg</p>
                        <p><strong>Budget:</strong> R450</p>
                    `}
                </div>
                
                <div class="provider-card">
                    <h2>Bid from ${provider.name}</h2>
                    <div class="provider-header">
                        <div class="provider-avatar">${provider.avatar}</div>
                        <div class="provider-info">
                            <h3>${provider.name} ${provider.verified ? '✓' : ''}</h3>
                            <div class="provider-role">${provider.role}</div>
                            <div class="provider-rating">
                                <span class="stars">⭐⭐⭐⭐⭐</span>
                                <span>${provider.rating}/5 (${provider.reviewCount} reviews)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="provider-bid">
                        <div class="bid-amount">R${bid.amount}</div>
                        <div class="bid-message">${bid.message}</div>
                    </div>
                    
                    <div style="display: flex; gap: 16px; margin-top: 24px;">
                        <button class="btn btn-primary" onclick="customerFlow.confirmBooking(${provider.id})" style="flex: 1;">
                            Confirm Booking
                        </button>
                        <button class="btn btn-secondary" onclick="customerFlow.openChat(${provider.id})" style="flex: 1;">
                            Message Provider
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    confirmBooking(providerId) {
        // Update job status to booked
        const jobIndex = this.postedJobs.findIndex(job => job.status === 'open');
        if (jobIndex !== -1) {
            this.postedJobs[jobIndex].status = 'booked';
            this.postedJobs[jobIndex].providerId = providerId;
            this.savePostedJobs(this.postedJobs);
        }

        // Show success message with AI reminder teaser
        this.showBookingConfirmation();
    }

    showBookingConfirmation() {
        const container = document.getElementById('bidsContent');
        container.innerHTML = `
            <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                <div class="feature-card" style="padding: 40px;">
                    <div style="font-size: 64px; margin-bottom: 24px;">✅</div>
                    <h2>Booking Confirmed!</h2>
                    <p style="margin-bottom: 32px;">Your service has been booked successfully. The provider will contact you soon to confirm details.</p>
                    
                    <div style="background: linear-gradient(135deg, #38a169 0%, #48bb78 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                        <h3>🤖 AI Reminder Unlocked!</h3>
                        <p>Get smart reminders and tips for your upcoming service. Our AI will help you prepare and get the best results.</p>
                        <button class="btn" style="background: rgba(255,255,255,0.2); color: white; margin-top: 12px;">
                            Set Up Reminders
                        </button>
                    </div>
                    
                    <div style="display: flex; gap: 16px; justify-content: center;">
                        <button class="btn btn-primary" onclick="window.app.navigateTo('chat')">
                            Message Provider
                        </button>
                        <button class="btn btn-secondary" onclick="window.app.navigateTo('job-history')">
                            View My Jobs
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Chat functionality
    renderChat() {
        const container = document.getElementById('chatContent');
        if (!container) return;

        container.innerHTML = `
            <div class="chat-container">
                <div class="chat-sidebar">
                    <ul class="chat-list">
                        ${this.messages.map((chat, index) => `
                            <li class="chat-item ${index === 0 ? 'active' : ''}" onclick="customerFlow.selectChat(${chat.id})">
                                <div class="chat-item-name">${chat.providerName}</div>
                                <div class="chat-item-preview">${chat.lastMessage}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="chat-main">
                    <div class="chat-header">
                        ${this.messages[0]?.providerName || 'Select a conversation'}
                    </div>
                    <div class="chat-messages" id="chatMessages">
                        ${this.renderChatMessages(this.messages[0]?.id || 1)}
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type a message..." id="messageInput" onkeypress="customerFlow.handleMessageKeyPress(event)">
                        <button class="chat-send-btn" onclick="customerFlow.sendMessage()">Send</button>
                    </div>
                </div>
            </div>
        `;
        
        this.selectedChatId = this.messages[0]?.id || 1;
    }

    renderChatMessages(chatId) {
        const chat = this.messages.find(c => c.id === chatId);
        if (!chat) return '';

        return chat.messages.map(message => `
            <div class="message ${message.sender === 'customer' ? 'sent' : 'received'}">
                <div class="message-bubble">${message.text}</div>
                <div class="message-time">${this.formatTime(message.timestamp)}</div>
            </div>
        `).join('');
    }

    selectChat(chatId) {
        this.selectedChatId = chatId;
        
        // Update active state
        document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
        event.target.closest('.chat-item').classList.add('active');
        
        // Update chat content
        const chat = this.messages.find(c => c.id === chatId);
        document.querySelector('.chat-header').textContent = chat.providerName;
        document.getElementById('chatMessages').innerHTML = this.renderChatMessages(chatId);
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const text = input.value.trim();
        if (!text) return;

        const chat = this.messages.find(c => c.id === this.selectedChatId);
        if (!chat) return;

        const newMessage = {
            id: Date.now(),
            sender: 'customer',
            text: text,
            timestamp: new Date().toISOString()
        };

        chat.messages.push(newMessage);
        chat.lastMessage = text;
        chat.lastMessageTime = newMessage.timestamp;
        
        this.saveMessages(this.messages);
        
        // Update UI
        document.getElementById('chatMessages').innerHTML = this.renderChatMessages(this.selectedChatId);
        input.value = '';
        
        // Scroll to bottom
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    handleMessageKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    openChat(providerId) {
        window.app.navigateTo('chat');
    }

    // Job history functionality
    renderJobHistory() {
        const container = document.getElementById('jobHistoryContent');
        if (!container) return;

        const completedJobs = this.jobHistory.filter(job => job.status === 'completed').length;
        const totalEarned = this.loyaltyPoints;

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="loyalty-card">
                    <div class="loyalty-points">${this.loyaltyPoints}</div>
                    <div class="loyalty-title">Loyalty Points</div>
                    <div class="loyalty-subtitle">Earn 10 points for each completed job</div>
                </div>
                
                <div class="features" style="margin-bottom: 32px;">
                    <div class="feature-card">
                        <div class="feature-icon">📊</div>
                        <h3>Jobs Completed</h3>
                        <p>${completedJobs} services</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">💰</div>
                        <h3>Total Spent</h3>
                        <p>R${this.jobHistory.reduce((sum, job) => sum + job.amount, 0)}</p>
                    </div>
                    <div class="feature-card">
                        <div class="feature-icon">⭐</div>
                        <h3>Average Rating</h3>
                        <p>4.7/5 stars</p>
                    </div>
                </div>
                
                <h2>Your Job History</h2>
                <div class="job-history-grid">
                    ${this.jobHistory.map(job => this.renderJobHistoryItem(job)).join('')}
                </div>
            </div>
        `;
    }

    renderJobHistoryItem(job) {
        const stars = job.rating ? '⭐'.repeat(job.rating) : 'Not rated';
        
        return `
            <div class="job-history-item">
                <div class="job-history-photo">${job.photo}</div>
                <div class="job-history-details">
                    <h3>${job.title}</h3>
                    <span class="job-status ${job.status}">${job.status}</span>
                    <div class="job-provider">Provider: ${job.providerName}</div>
                    <div class="job-rating">Rating: ${stars}</div>
                    <div style="color: #718096; font-size: 14px;">Completed: ${job.completedDate}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 18px; font-weight: 600; color: #38a169;">R${job.amount}</div>
                    ${job.status === 'completed' ? '<div style="font-size: 12px; color: #718096;">+10 points</div>' : ''}
                </div>
            </div>
        `;
    }

    // Utility functions
    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    showMessage(message, type = 'info') {
        // Reuse the auth manager's message system
        if (window.authManager) {
            window.authManager.showMessage(message, type);
        }
    }
}

// Initialize customer flow manager
document.addEventListener('DOMContentLoaded', () => {
    window.customerFlow = new CustomerFlowManager();
    
    // Handle post job form submission
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'postJobForm') {
            e.preventDefault();
            const formData = new FormData(e.target);
            window.customerFlow.handlePostJob(formData);
        }
    });
    
    // Handle photo upload
    document.addEventListener('click', (e) => {
        if (e.target.closest('.photo-upload-area')) {
            document.getElementById('jobPhotos')?.click();
        }
    });
    
    document.addEventListener('change', (e) => {
        if (e.target.id === 'jobPhotos') {
            window.customerFlow.handlePhotoUpload(e.target.files);
        }
    });
    
    // Render content when pages load
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const providersList = document.getElementById('providersList');
                const bidsContent = document.getElementById('bidsContent');
                const chatContent = document.getElementById('chatContent');
                const jobHistoryContent = document.getElementById('jobHistoryContent');
                
                if (providersList && !providersList.hasChildNodes()) {
                    window.customerFlow.renderProviders();
                }
                if (bidsContent && !bidsContent.hasChildNodes()) {
                    window.customerFlow.renderBids();
                }
                if (chatContent && !chatContent.hasChildNodes()) {
                    window.customerFlow.renderChat();
                }
                if (jobHistoryContent && !jobHistoryContent.hasChildNodes()) {
                    window.customerFlow.renderJobHistory();
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});