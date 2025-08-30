// Service Provider Manager - Handles account, bidding, and messaging
class ServiceProviderManager {
    constructor() {
        this.profile = this.loadProfile();
        this.bids = this.loadBids();
        this.messages = this.loadMessages();
        this.uploadedDocuments = [];
        this.uploadedPhotos = [];
    }

    loadProfile() {
        const saved = localStorage.getItem('piecejob_provider_profile');
        if (saved) return JSON.parse(saved);
        
        // Default profile structure
        return {
            skills: [],
            qualifications: '',
            medicalCertificate: null,
            bankingDetails: {
                accountHolder: '',
                bankName: '',
                accountNumber: '',
                branchCode: ''
            },
            documents: [],
            photos: [],
            hourlyRate: '',
            availability: 'full-time',
            experience: '',
            bio: ''
        };
    }

    loadBids() {
        const saved = localStorage.getItem('piecejob_provider_bids');
        return saved ? JSON.parse(saved) : [];
    }

    loadMessages() {
        const saved = localStorage.getItem('piecejob_provider_messages');
        if (saved) return JSON.parse(saved);
        
        // Mock messages for service provider
        const mockMessages = [
            {
                id: 1,
                clientId: 2,
                clientName: 'Sarah van der Merwe',
                jobTitle: 'House Cleaning Service',
                messages: [
                    {
                        id: 1,
                        sender: 'client',
                        text: 'Hi! I saw your bid for the house cleaning job. When would you be available?',
                        timestamp: '2024-01-16T09:00:00Z'
                    },
                    {
                        id: 2,
                        sender: 'provider',
                        text: 'Hello! I can start this Saturday morning around 9 AM. Would that work for you?',
                        timestamp: '2024-01-16T09:15:00Z'
                    }
                ],
                lastMessage: 'Hello! I can start this Saturday morning around 9 AM. Would that work for you?',
                lastMessageTime: '2024-01-16T09:15:00Z',
                status: 'active'
            },
            {
                id: 2,
                clientId: 3,
                clientName: 'Michael Johnson',
                jobTitle: 'Garden Maintenance',
                messages: [
                    {
                        id: 1,
                        sender: 'client',
                        text: 'Are you available for weekly garden maintenance starting next week?',
                        timestamp: '2024-01-15T16:30:00Z'
                    }
                ],
                lastMessage: 'Are you available for weekly garden maintenance starting next week?',
                lastMessageTime: '2024-01-15T16:30:00Z',
                status: 'pending'
            }
        ];
        
        this.saveMessages(mockMessages);
        return mockMessages;
    }

    saveProfile(profile) {
        localStorage.setItem('piecejob_provider_profile', JSON.stringify(profile));
    }

    saveBids(bids) {
        localStorage.setItem('piecejob_provider_bids', JSON.stringify(bids));
    }

    saveMessages(messages) {
        localStorage.setItem('piecejob_provider_messages', JSON.stringify(messages));
    }

    // Render account page
    renderAccount() {
        const container = document.getElementById('accountContent');
        if (!container) return;

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto;">
                <div class="account-tabs">
                    <button class="tab-btn active" onclick="serviceProvider.showTab('profile')">Profile & Skills</button>
                    <button class="tab-btn" onclick="serviceProvider.showTab('documents')">Documents</button>
                    <button class="tab-btn" onclick="serviceProvider.showTab('banking')">Banking Details</button>
                </div>
                
                <div id="profileTab" class="tab-content active">
                    ${this.renderProfileTab()}
                </div>
                
                <div id="documentsTab" class="tab-content">
                    ${this.renderDocumentsTab()}
                </div>
                
                <div id="bankingTab" class="tab-content">
                    ${this.renderBankingTab()}
                </div>
            </div>
        `;
    }

    renderProfileTab() {
        return `
            <form id="profileForm" class="account-form">
                <div class="form-section">
                    <h3>Professional Information</h3>
                    
                    <div class="form-group">
                        <label class="form-label" for="bio">Professional Bio</label>
                        <textarea id="bio" class="form-input" rows="4" placeholder="Tell clients about your experience and what makes you unique...">${this.profile.bio}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="hourlyRate">Hourly Rate (R)</label>
                        <input type="number" id="hourlyRate" class="form-input" placeholder="e.g. 150" value="${this.profile.hourlyRate}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="experience">Years of Experience</label>
                        <select id="experience" class="form-input">
                            <option value="">Select experience level</option>
                            <option value="0-1" ${this.profile.experience === '0-1' ? 'selected' : ''}>0-1 years</option>
                            <option value="2-5" ${this.profile.experience === '2-5' ? 'selected' : ''}>2-5 years</option>
                            <option value="6-10" ${this.profile.experience === '6-10' ? 'selected' : ''}>6-10 years</option>
                            <option value="10+" ${this.profile.experience === '10+' ? 'selected' : ''}>10+ years</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="availability">Availability</label>
                        <select id="availability" class="form-input">
                            <option value="full-time" ${this.profile.availability === 'full-time' ? 'selected' : ''}>Full-time</option>
                            <option value="part-time" ${this.profile.availability === 'part-time' ? 'selected' : ''}>Part-time</option>
                            <option value="weekends" ${this.profile.availability === 'weekends' ? 'selected' : ''}>Weekends only</option>
                            <option value="evenings" ${this.profile.availability === 'evenings' ? 'selected' : ''}>Evenings only</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Skills & Services</h3>
                    <div class="skills-container">
                        <div class="skills-input-group">
                            <input type="text" id="skillInput" class="form-input" placeholder="Add a skill (e.g. House Cleaning)">
                            <button type="button" class="btn btn-secondary" onclick="serviceProvider.addSkill()">Add</button>
                        </div>
                        <div class="skills-list" id="skillsList">
                            ${this.renderSkillsList()}
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Qualifications (Optional)</h3>
                    <div class="form-group">
                        <label class="form-label" for="qualifications">Certifications, Training, or Qualifications</label>
                        <textarea id="qualifications" class="form-input" rows="3" placeholder="List any relevant certifications, training courses, or qualifications...">${this.profile.qualifications}</textarea>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Profile Photos</h3>
                    <div class="form-group">
                        <label class="form-label">Upload Photos (Up to 5)</label>
                        <div class="photo-upload-area" onclick="document.getElementById('profilePhotos').click()">
                            <div class="upload-placeholder">
                                <div class="upload-icon">📷</div>
                                <p>Click to upload photos or drag and drop</p>
                                <p class="upload-hint">Show your work, tools, or professional headshots</p>
                            </div>
                            <input type="file" id="profilePhotos" multiple accept="image/*" style="display: none;">
                        </div>
                        <div id="profilePhotoPreview" class="photo-preview-grid">
                            ${this.renderPhotoPreview()}
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary form-submit">Save Profile</button>
            </form>
        `;
    }

    renderDocumentsTab() {
        return `
            <form id="documentsForm" class="account-form">
                <div class="form-section">
                    <h3>Medical Certificate</h3>
                    <div class="form-group">
                        <label class="form-label">Upload Medical Certificate</label>
                        <div class="document-upload-area" onclick="document.getElementById('medicalCert').click()">
                            <div class="upload-placeholder">
                                <div class="upload-icon">🏥</div>
                                <p>Click to upload medical certificate</p>
                                <p class="upload-hint">PDF, JPG, or PNG up to 5MB</p>
                            </div>
                            <input type="file" id="medicalCert" accept=".pdf,.jpg,.jpeg,.png" style="display: none;">
                        </div>
                        ${this.profile.medicalCertificate ? `
                            <div class="uploaded-document">
                                <span>✅ Medical certificate uploaded</span>
                                <button type="button" onclick="serviceProvider.removeMedicalCert()" class="btn-remove">Remove</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Additional Documents</h3>
                    <div class="form-group">
                        <label class="form-label">Upload Supporting Documents</label>
                        <div class="document-upload-area" onclick="document.getElementById('additionalDocs').click()">
                            <div class="upload-placeholder">
                                <div class="upload-icon">📄</div>
                                <p>Click to upload documents</p>
                                <p class="upload-hint">Certificates, licenses, insurance papers (PDF, JPG, PNG)</p>
                            </div>
                            <input type="file" id="additionalDocs" multiple accept=".pdf,.jpg,.jpeg,.png" style="display: none;">
                        </div>
                        <div id="documentsPreview" class="documents-list">
                            ${this.renderDocumentsList()}
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary form-submit">Save Documents</button>
            </form>
        `;
    }

    renderBankingTab() {
        return `
            <form id="bankingForm" class="account-form">
                <div class="form-section">
                    <h3>Banking Information</h3>
                    <p style="color: #718096; margin-bottom: 24px;">Your banking details are encrypted and secure. This information is used to process payments for completed jobs.</p>
                    
                    <div class="form-group">
                        <label class="form-label" for="accountHolder">Account Holder Name</label>
                        <input type="text" id="accountHolder" class="form-input" placeholder="Full name as on bank account" value="${this.profile.bankingDetails.accountHolder}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="bankName">Bank Name</label>
                        <select id="bankName" class="form-input" required>
                            <option value="">Select your bank</option>
                            <option value="ABSA" ${this.profile.bankingDetails.bankName === 'ABSA' ? 'selected' : ''}>ABSA</option>
                            <option value="Standard Bank" ${this.profile.bankingDetails.bankName === 'Standard Bank' ? 'selected' : ''}>Standard Bank</option>
                            <option value="FNB" ${this.profile.bankingDetails.bankName === 'FNB' ? 'selected' : ''}>FNB</option>
                            <option value="Nedbank" ${this.profile.bankingDetails.bankName === 'Nedbank' ? 'selected' : ''}>Nedbank</option>
                            <option value="Capitec" ${this.profile.bankingDetails.bankName === 'Capitec' ? 'selected' : ''}>Capitec</option>
                            <option value="African Bank" ${this.profile.bankingDetails.bankName === 'African Bank' ? 'selected' : ''}>African Bank</option>
                            <option value="Other" ${this.profile.bankingDetails.bankName === 'Other' ? 'selected' : ''}>Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="accountNumber">Account Number</label>
                        <input type="text" id="accountNumber" class="form-input" placeholder="Enter account number" value="${this.profile.bankingDetails.accountNumber}" required>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label" for="branchCode">Branch Code</label>
                        <input type="text" id="branchCode" class="form-input" placeholder="6-digit branch code" value="${this.profile.bankingDetails.branchCode}" required>
                    </div>
                    
                    <div class="security-notice">
                        <div class="security-icon">🔒</div>
                        <div>
                            <h4>Your information is secure</h4>
                            <p>All banking details are encrypted using bank-level security. We never store your full account details on our servers.</p>
                        </div>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary form-submit">Save Banking Details</button>
            </form>
        `;
    }

    renderSkillsList() {
        return this.profile.skills.map(skill => `
            <div class="skill-item">
                <span>${skill}</span>
                <button type="button" onclick="serviceProvider.removeSkill('${skill}')" class="skill-remove">×</button>
            </div>
        `).join('');
    }

    renderPhotoPreview() {
        return this.profile.photos.map(photo => `
            <div class="photo-preview-item">
                <img src="${photo.url}" alt="${photo.name}">
                <button type="button" class="photo-remove-btn" onclick="serviceProvider.removePhoto(${photo.id})">×</button>
            </div>
        `).join('');
    }

    renderDocumentsList() {
        return this.profile.documents.map(doc => `
            <div class="document-item">
                <div class="document-info">
                    <span class="document-name">${doc.name}</span>
                    <span class="document-type">${doc.type}</span>
                </div>
                <button type="button" onclick="serviceProvider.removeDocument(${doc.id})" class="btn-remove">Remove</button>
            </div>
        `).join('');
    }

    // Tab switching
    showTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById(`${tabName}Tab`).classList.add('active');
    }

    // Skills management
    addSkill() {
        const input = document.getElementById('skillInput');
        const skill = input.value.trim();
        
        if (!skill) return;
        
        if (this.profile.skills.includes(skill)) {
            this.showMessage('Skill already added', 'error');
            return;
        }
        
        this.profile.skills.push(skill);
        this.saveProfile(this.profile);
        
        input.value = '';
        document.getElementById('skillsList').innerHTML = this.renderSkillsList();
        
        this.showMessage('Skill added successfully', 'success');
    }

    removeSkill(skill) {
        this.profile.skills = this.profile.skills.filter(s => s !== skill);
        this.saveProfile(this.profile);
        document.getElementById('skillsList').innerHTML = this.renderSkillsList();
        this.showMessage('Skill removed', 'info');
    }

    // Photo management
    handlePhotoUpload(files) {
        if (this.profile.photos.length + files.length > 5) {
            this.showMessage('Maximum 5 photos allowed', 'error');
            return;
        }

        Array.from(files).forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showMessage(`File ${file.name} is too large. Maximum 5MB per photo.`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.profile.photos.push({
                    id: Date.now() + Math.random(),
                    name: file.name,
                    url: e.target.result
                });
                this.saveProfile(this.profile);
                document.getElementById('profilePhotoPreview').innerHTML = this.renderPhotoPreview();
            };
            reader.readAsDataURL(file);
        });
    }

    removePhoto(photoId) {
        this.profile.photos = this.profile.photos.filter(photo => photo.id !== photoId);
        this.saveProfile(this.profile);
        document.getElementById('profilePhotoPreview').innerHTML = this.renderPhotoPreview();
    }

    // Document management
    handleDocumentUpload(files, isMedical = false) {
        Array.from(files).forEach(file => {
            if (file.size > 5 * 1024 * 1024) {
                this.showMessage(`File ${file.name} is too large. Maximum 5MB per document.`, 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                if (isMedical) {
                    this.profile.medicalCertificate = {
                        id: Date.now(),
                        name: file.name,
                        url: e.target.result,
                        uploadDate: new Date().toISOString()
                    };
                } else {
                    this.profile.documents.push({
                        id: Date.now() + Math.random(),
                        name: file.name,
                        type: file.type,
                        url: e.target.result,
                        uploadDate: new Date().toISOString()
                    });
                }
                this.saveProfile(this.profile);
                
                // Re-render the documents tab
                document.getElementById('documentsTab').innerHTML = this.renderDocumentsTab();
            };
            reader.readAsDataURL(file);
        });
    }

    removeMedicalCert() {
        this.profile.medicalCertificate = null;
        this.saveProfile(this.profile);
        document.getElementById('documentsTab').innerHTML = this.renderDocumentsTab();
    }

    removeDocument(docId) {
        this.profile.documents = this.profile.documents.filter(doc => doc.id !== docId);
        this.saveProfile(this.profile);
        document.getElementById('documentsTab').innerHTML = this.renderDocumentsTab();
    }

    // Form submissions
    handleProfileSubmit(form) {
        const formData = new FormData(form);
        
        this.profile.bio = form.querySelector('#bio').value;
        this.profile.hourlyRate = form.querySelector('#hourlyRate').value;
        this.profile.experience = form.querySelector('#experience').value;
        this.profile.availability = form.querySelector('#availability').value;
        this.profile.qualifications = form.querySelector('#qualifications').value;
        
        this.saveProfile(this.profile);
        this.showMessage('Profile updated successfully!', 'success');
    }

    handleBankingSubmit(form) {
        this.profile.bankingDetails = {
            accountHolder: form.querySelector('#accountHolder').value,
            bankName: form.querySelector('#bankName').value,
            accountNumber: form.querySelector('#accountNumber').value,
            branchCode: form.querySelector('#branchCode').value
        };
        
        this.saveProfile(this.profile);
        this.showMessage('Banking details saved securely!', 'success');
    }

    // Job bidding
    submitBid(jobId, amount, message) {
        const newBid = {
            id: Date.now(),
            jobId: jobId,
            providerId: window.app.currentUser.id,
            amount: amount,
            message: message,
            submittedDate: new Date().toISOString(),
            status: 'pending'
        };

        this.bids.push(newBid);
        this.saveBids(this.bids);
        
        this.showMessage('Bid submitted successfully!', 'success');
    }

    // Messages for service providers
    renderMessages() {
        const container = document.getElementById('messagesContent');
        if (!container) return;

        container.innerHTML = `
            <div class="chat-container">
                <div class="chat-sidebar">
                    <h3 style="padding: 16px; margin: 0; border-bottom: 1px solid rgba(0,0,0,0.1);">Client Messages</h3>
                    <ul class="chat-list">
                        ${this.messages.map((chat, index) => `
                            <li class="chat-item ${index === 0 ? 'active' : ''}" onclick="serviceProvider.selectChat(${chat.id})">
                                <div class="chat-item-name">${chat.clientName}</div>
                                <div class="chat-item-job">${chat.jobTitle}</div>
                                <div class="chat-item-preview">${chat.lastMessage}</div>
                                <div class="chat-status ${chat.status}">${chat.status}</div>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="chat-main">
                    <div class="chat-header">
                        <div>
                            <div class="chat-client-name">${this.messages[0]?.clientName || 'Select a conversation'}</div>
                            <div class="chat-job-title">${this.messages[0]?.jobTitle || ''}</div>
                        </div>
                    </div>
                    <div class="chat-messages" id="providerChatMessages">
                        ${this.renderChatMessages(this.messages[0]?.id || 1)}
                    </div>
                    <div class="chat-input">
                        <input type="text" placeholder="Type a message..." id="providerMessageInput" onkeypress="serviceProvider.handleMessageKeyPress(event)">
                        <button class="chat-send-btn" onclick="serviceProvider.sendMessage()">Send</button>
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
            <div class="message ${message.sender === 'provider' ? 'sent' : 'received'}">
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
        document.querySelector('.chat-client-name').textContent = chat.clientName;
        document.querySelector('.chat-job-title').textContent = chat.jobTitle;
        document.getElementById('providerChatMessages').innerHTML = this.renderChatMessages(chatId);
    }

    sendMessage() {
        const input = document.getElementById('providerMessageInput');
        const text = input.value.trim();
        if (!text) return;

        const chat = this.messages.find(c => c.id === this.selectedChatId);
        if (!chat) return;

        const newMessage = {
            id: Date.now(),
            sender: 'provider',
            text: text,
            timestamp: new Date().toISOString()
        };

        chat.messages.push(newMessage);
        chat.lastMessage = text;
        chat.lastMessageTime = newMessage.timestamp;
        
        this.saveMessages(this.messages);
        
        // Update UI
        document.getElementById('providerChatMessages').innerHTML = this.renderChatMessages(this.selectedChatId);
        input.value = '';
        
        // Scroll to bottom
        const messagesContainer = document.getElementById('providerChatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    handleMessageKeyPress(event) {
        if (event.key === 'Enter') {
            this.sendMessage();
        }
    }

    // Utility functions
    formatTime(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    showMessage(message, type = 'info') {
        if (window.authManager) {
            window.authManager.showMessage(message, type);
        }
    }
}

// Initialize service provider manager
document.addEventListener('DOMContentLoaded', () => {
    window.serviceProvider = new ServiceProviderManager();
    
    // Handle form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'profileForm') {
            e.preventDefault();
            window.serviceProvider.handleProfileSubmit(e.target);
        }
        if (e.target.id === 'documentsForm') {
            e.preventDefault();
            window.serviceProvider.showMessage('Documents saved successfully!', 'success');
        }
        if (e.target.id === 'bankingForm') {
            e.preventDefault();
            window.serviceProvider.handleBankingSubmit(e.target);
        }
    });
    
    // Handle file uploads
    document.addEventListener('change', (e) => {
        if (e.target.id === 'profilePhotos') {
            window.serviceProvider.handlePhotoUpload(e.target.files);
        }
        if (e.target.id === 'medicalCert') {
            window.serviceProvider.handleDocumentUpload(e.target.files, true);
        }
        if (e.target.id === 'additionalDocs') {
            window.serviceProvider.handleDocumentUpload(e.target.files, false);
        }
    });
    
    // Handle skill input enter key
    document.addEventListener('keypress', (e) => {
        if (e.target.id === 'skillInput' && e.key === 'Enter') {
            e.preventDefault();
            window.serviceProvider.addSkill();
        }
    });
    
    // Render content when pages load
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const accountContent = document.getElementById('accountContent');
                const messagesContent = document.getElementById('messagesContent');
                
                if (accountContent && !accountContent.hasChildNodes()) {
                    window.serviceProvider.renderAccount();
                }
                if (messagesContent && !messagesContent.hasChildNodes()) {
                    window.serviceProvider.renderMessages();
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});