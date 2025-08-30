// Jobs Manager with Mock Data
class JobsManager {
    constructor() {
        this.jobs = this.loadJobs();
        this.categories = [
            'Cleaning',
            'Gardening',
            'Handyman',
            'Plumbing',
            'Electrical',
            'Painting',
            'Moving',
            'Pet Care'
        ];
    }

    loadJobs() {
        // Load jobs from localStorage or return mock jobs
        const savedJobs = localStorage.getItem('piecejob_jobs');
        if (savedJobs) {
            return JSON.parse(savedJobs);
        }

        // Mock jobs data
        const mockJobs = [
            {
                id: 1,
                title: 'House Cleaning Service',
                company: 'Sarah M.',
                description: 'Need a reliable cleaner for my 3-bedroom house in Sandton. Deep cleaning required including bathrooms, kitchen, and all bedrooms. Must bring own supplies.',
                price: 'R450',
                priceType: 'fixed',
                location: 'Sandton, Johannesburg',
                category: 'Cleaning',
                tags: ['Deep Cleaning', 'House Cleaning', 'Bathrooms', 'Kitchen'],
                postedDate: '2024-01-15',
                deadline: '2024-01-20',
                clientRating: 4.8,
                proposals: 12,
                skills: ['House Cleaning', 'Deep Cleaning', 'Reliable', 'Own Transport'],
                duration: '1 day',
                experienceLevel: 'Intermediate'
            },
            {
                id: 2,
                title: 'Garden Maintenance & Lawn Mowing',
                company: 'John K.',
                description: 'Looking for someone to maintain my garden in Rosebank. Includes lawn mowing, hedge trimming, weeding, and general garden cleanup. Weekly service needed.',
                price: 'R300',
                priceType: 'weekly',
                location: 'Rosebank, Johannesburg',
                category: 'Gardening',
                tags: ['Lawn Mowing', 'Hedge Trimming', 'Weeding', 'Garden Cleanup'],
                postedDate: '2024-01-14',
                deadline: '2024-01-25',
                clientRating: 4.9,
                proposals: 8,
                skills: ['Gardening', 'Lawn Care', 'Hedge Trimming', 'Own Tools'],
                duration: 'Ongoing',
                experienceLevel: 'Experienced'
            },
            {
                id: 3,
                title: 'Plumbing Repair - Leaky Tap',
                company: 'Maria L.',
                description: 'Need urgent plumbing repair for a leaky kitchen tap in my flat in Cape Town CBD. Must be available this weekend and have plumbing experience.',
                price: 'R250',
                priceType: 'fixed',
                location: 'Cape Town CBD',
                category: 'Plumbing',
                tags: ['Plumbing', 'Tap Repair', 'Urgent', 'Weekend'],
                postedDate: '2024-01-13',
                deadline: '2024-01-16',
                clientRating: 4.7,
                proposals: 15,
                skills: ['Plumbing', 'Tap Repair', 'Emergency Service', 'Licensed'],
                duration: '2-3 hours',
                experienceLevel: 'Professional'
            },
            {
                id: 4,
                title: 'Interior Wall Painting',
                company: 'David P.',
                description: 'Need to paint 2 bedrooms and a living room in my house in Durban North. Paint will be provided. Looking for neat, professional work.',
                price: 'R1,200',
                priceType: 'fixed',
                location: 'Durban North',
                category: 'Painting',
                tags: ['Interior Painting', 'Bedrooms', 'Living Room', 'Professional'],
                postedDate: '2024-01-12',
                deadline: '2024-01-30',
                clientRating: 4.6,
                proposals: 6,
                skills: ['Interior Painting', 'Professional Finish', 'Own Brushes', 'Clean Work'],
                duration: '2-3 days',
                experienceLevel: 'Experienced'
            },
            {
                id: 5,
                title: 'Electrical Installation - Ceiling Fans',
                company: 'Lisa R.',
                description: 'Need qualified electrician to install 3 ceiling fans in my home in Pretoria East. Must have COC certificate and electrical license.',
                price: 'R800',
                priceType: 'fixed',
                location: 'Pretoria East',
                category: 'Electrical',
                tags: ['Electrical', 'Ceiling Fans', 'COC Certificate', 'Licensed'],
                postedDate: '2024-01-11',
                deadline: '2024-01-22',
                clientRating: 4.5,
                proposals: 4,
                skills: ['Electrical Work', 'COC Certificate', 'Licensed Electrician', 'Installation'],
                duration: '1 day',
                experienceLevel: 'Professional'
            },
            {
                id: 6,
                title: 'Moving Assistance',
                company: 'Michael T.',
                description: 'Need help moving from a 2-bedroom apartment in Bellville to a house in Stellenbosch. Heavy lifting required. Truck will be provided.',
                price: 'R600',
                priceType: 'fixed',
                location: 'Bellville to Stellenbosch',
                category: 'Moving',
                tags: ['Moving', 'Heavy Lifting', 'Apartment', 'Truck Provided'],
                postedDate: '2024-01-10',
                deadline: '2024-01-18',
                clientRating: 4.8,
                proposals: 11,
                skills: ['Moving', 'Heavy Lifting', 'Reliable', 'Careful Handling'],
                duration: '1 day',
                experienceLevel: 'Any Level'
            },
            {
                id: 7,
                title: 'Dog Walking Service',
                company: 'Emma S.',
                description: 'Looking for someone to walk my 2 dogs daily in the Camps Bay area. Dogs are friendly and well-trained. Must love animals and be reliable.',
                price: 'R150',
                priceType: 'daily',
                location: 'Camps Bay, Cape Town',
                category: 'Pet Care',
                tags: ['Dog Walking', 'Pet Care', 'Daily Service', 'Animal Lover'],
                postedDate: '2024-01-09',
                deadline: '2024-01-20',
                clientRating: 4.9,
                proposals: 18,
                skills: ['Pet Care', 'Dog Walking', 'Animal Handling', 'Reliable'],
                duration: 'Ongoing',
                experienceLevel: 'Any Level'
            },
            {
                id: 8,
                title: 'Handyman - Multiple Small Repairs',
                company: 'Robert H.',
                description: 'Need a handyman for various small repairs around my house in Bloemfontein. Includes fixing door handles, patching holes, and minor carpentry work.',
                price: 'R500',
                priceType: 'fixed',
                location: 'Bloemfontein',
                category: 'Handyman',
                tags: ['Handyman', 'Small Repairs', 'Door Handles', 'Carpentry'],
                postedDate: '2024-01-08',
                deadline: '2024-01-25',
                clientRating: 4.7,
                proposals: 9,
                skills: ['Handyman', 'Small Repairs', 'Carpentry', 'Own Tools'],
                duration: '1-2 days',
                experienceLevel: 'Intermediate'
            }
        ];

        this.saveJobs(mockJobs);
        return mockJobs;
    }

    saveJobs(jobs) {
        localStorage.setItem('piecejob_jobs', JSON.stringify(jobs));
    }

    renderJobCard(job) {
        const timeAgo = this.getTimeAgo(job.postedDate);
        
        return `
            <div class="job-card">
                <div class="job-header">
                    <div>
                        <h3 class="job-title">${job.title}</h3>
                        <p class="job-company">${job.company}</p>
                    </div>
                    <div class="job-price">${job.price}${job.priceType === 'hourly' ? '/hr' : ''}</div>
                </div>
                
                <p class="job-description">${job.description}</p>
                
                <div class="job-tags">
                    ${job.tags.map(tag => `<span class="job-tag">${tag}</span>`).join('')}
                </div>
                
                <div class="job-footer">
                    <span class="job-location">📍 ${job.location}</span>
                    <span class="job-proposals">${job.proposals} proposals</span>
                </div>
                
                <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: #94a3b8;">
                    <span>Posted ${timeAgo}</span>
                    <span>⭐ ${job.clientRating}/5</span>
                </div>
                
                <div style="margin-top: 12px;">
                    <button class="btn btn-primary" style="width: 100%;" onclick="jobsManager.applyToJob(${job.id})">
                        Apply Now
                    </button>
                </div>
            </div>
        `;
    }

    renderJobsList(containerId = 'jobsList', limit = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const jobsToShow = limit ? this.jobs.slice(0, limit) : this.jobs;
        
        if (jobsToShow.length === 0) {
            container.innerHTML = `
                <div class="text-center" style="padding: 40px;">
                    <h3>No jobs found</h3>
                    <p style="color: #94a3b8;">Check back later for new opportunities!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="job-grid">
                ${jobsToShow.map(job => this.renderJobCard(job)).join('')}
            </div>
        `;
    }

    applyToJob(jobId) {
        const job = this.jobs.find(j => j.id === jobId);
        if (!job) return;

        if (!window.app.currentUser) {
            window.authManager.showMessage('Please sign in to apply for jobs.', 'info');
            window.app.navigateTo('login');
            return;
        }

        // Simulate application process
        window.authManager.showMessage(`Application submitted for "${job.title}"! The client will review your proposal.`, 'success');
        
        // Update job proposals count
        job.proposals += 1;
        this.saveJobs(this.jobs);
        
        // Re-render jobs list if visible
        const jobsList = document.getElementById('jobsList');
        if (jobsList) {
            this.renderJobsList();
        }
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'today';
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return `${Math.floor(diffDays / 30)} months ago`;
    }

    filterJobs(category = null, searchTerm = null) {
        let filteredJobs = [...this.jobs];
        
        if (category && category !== 'all') {
            filteredJobs = filteredJobs.filter(job => 
                job.category.toLowerCase() === category.toLowerCase()
            );
        }
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredJobs = filteredJobs.filter(job =>
                job.title.toLowerCase().includes(term) ||
                job.description.toLowerCase().includes(term) ||
                job.tags.some(tag => tag.toLowerCase().includes(term)) ||
                job.company.toLowerCase().includes(term)
            );
        }
        
        return filteredJobs;
    }
}

// Initialize jobs manager
document.addEventListener('DOMContentLoaded', () => {
    window.jobsManager = new JobsManager();
    
    // Render jobs when the jobs page or dashboard loads
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const jobsList = document.getElementById('jobsList');
                if (jobsList && !jobsList.hasChildNodes()) {
                    // Determine if we're on dashboard (show limited) or jobs page (show all)
                    const isDashboard = window.app && window.app.currentPage === 'dashboard';
                    window.jobsManager.renderJobsList('jobsList', isDashboard ? 4 : null);
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});