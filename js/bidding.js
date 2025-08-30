// Bidding Manager - Handles job bidding for service providers
class BiddingManager {
    constructor() {
        this.selectedJobId = null;
    }

    // Show bid modal
    showBidModal(jobId) {
        if (!window.app.currentUser) {
            window.authManager.showMessage('Please sign in to place bids', 'error');
            return;
        }

        if (window.app.currentUser.userType === 'customer') {
            window.authManager.showMessage('Only service providers can place bids', 'error');
            return;
        }

        this.selectedJobId = jobId;
        const job = window.jobsManager.jobs.find(j => j.id === jobId);
        
        if (!job) return;

        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Place Your Bid</h3>
                    <button class="modal-close" onclick="biddingManager.closeBidModal()">×</button>
                </div>
                
                <div class="modal-body">
                    <div class="job-summary">
                        <h4>${job.title}</h4>
                        <p>${job.description}</p>
                        <div class="job-details">
                            <span>📍 ${job.location}</span>
                            <span>💰 Budget: ${job.price}</span>
                        </div>
                    </div>
                    
                    <form id="bidForm">
                        <div class="form-group">
                            <label class="form-label" for="bidAmount">Your Quote (R)</label>
                            <input type="number" id="bidAmount" class="form-input" placeholder="Enter your quote" required>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="bidMessage">Message to Client</label>
                            <textarea id="bidMessage" class="form-input" rows="4" placeholder="Explain why you're the best choice for this job..." required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label class="form-label" for="estimatedTime">Estimated Completion Time</label>
                            <select id="estimatedTime" class="form-input" required>
                                <option value="">Select timeframe</option>
                                <option value="same-day">Same day</option>
                                <option value="1-2-days">1-2 days</option>
                                <option value="3-5-days">3-5 days</option>
                                <option value="1-week">1 week</option>
                                <option value="2-weeks">2 weeks</option>
                                <option value="1-month">1 month</option>
                            </select>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary" onclick="biddingManager.closeBidModal()">Cancel</button>
                            <button type="submit" class="btn btn-primary">Submit Bid</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        
        // Handle form submission
        document.getElementById('bidForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitBid(e.target);
        });
    }

    closeBidModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
    }

    submitBid(form) {
        const amount = form.querySelector('#bidAmount').value;
        const message = form.querySelector('#bidMessage').value;
        const estimatedTime = form.querySelector('#estimatedTime').value;

        const newBid = {
            id: Date.now(),
            jobId: this.selectedJobId,
            providerId: window.app.currentUser.id,
            providerName: window.app.currentUser.name,
            amount: parseInt(amount),
            message: message,
            estimatedTime: estimatedTime,
            submittedDate: new Date().toISOString(),
            status: 'pending'
        };

        // Save bid to service provider's bids
        if (window.serviceProvider) {
            window.serviceProvider.bids.push(newBid);
            window.serviceProvider.saveBids(window.serviceProvider.bids);
        }

        // Update job proposals count
        const job = window.jobsManager.jobs.find(j => j.id === this.selectedJobId);
        if (job) {
            job.proposals += 1;
            window.jobsManager.saveJobs(window.jobsManager.jobs);
        }

        this.closeBidModal();
        window.authManager.showMessage('Bid submitted successfully! The client will review your proposal.', 'success');
        
        // Re-render jobs list if visible
        const jobsList = document.getElementById('jobsList');
        if (jobsList) {
            window.jobsManager.renderJobsList();
        }
    }
}

// Initialize bidding manager
document.addEventListener('DOMContentLoaded', () => {
    window.biddingManager = new BiddingManager();
});