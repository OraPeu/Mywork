// PieceJob App - Main Application Logic
class PieceJobApp {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.checkAuthState();
        this.setupEventListeners();
        this.renderCurrentPage();
    }

    checkAuthState() {
        const savedUser = localStorage.getItem('piecejob_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    setupEventListeners() {
        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('mobile-menu-toggle')) {
                this.toggleMobileMenu();
            }
            if (e.target.classList.contains('mobile-menu-close')) {
                this.closeMobileMenu();
            }
        });

        // Navigation handling
        document.addEventListener('click', (e) => {
            if (e.target.hasAttribute('data-page')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateTo(page);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.currentPage = e.state.page;
                this.renderCurrentPage();
            }
        });
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }

    navigateTo(page) {
        this.currentPage = page;
        this.closeMobileMenu();
        
        // Update URL without page reload
        history.pushState({ page }, '', `#${page}`);
        
        this.renderCurrentPage();
    }

    renderCurrentPage() {
        const app = document.getElementById('app');
        
        switch (this.currentPage) {
            case 'login':
                app.innerHTML = this.renderLoginPage();
                break;
            case 'register':
                app.innerHTML = this.renderRegisterPage();
                break;
            case 'dashboard':
                if (this.currentUser) {
                    app.innerHTML = this.renderDashboard();
                } else {
                    this.navigateTo('login');
                }
                break;
            case 'jobs':
                app.innerHTML = this.renderJobsPage();
                break;
            case 'post-job':
                if (this.currentUser) {
                    app.innerHTML = this.renderPostJobPage();
                } else {
                    this.navigateTo('login');
                }
                break;
            case 'browse-providers':
                if (this.currentUser) {
                    app.innerHTML = this.renderBrowseProvidersPage();
                } else {
                    this.navigateTo('login');
                }
                break;
            case 'view-bids':
                if (this.currentUser) {
                    app.innerHTML = this.renderViewBidsPage();
                } else {
                    this.navigateTo('login');
                }
                break;
            case 'chat':
                if (this.currentUser) {
                    app.innerHTML = this.renderChatPage();
                } else {
                    this.navigateTo('login');
                }
                break;
            case 'job-history':
                if (this.currentUser) {
                    app.innerHTML = this.renderJobHistoryPage();
                } else {
                    this.navigateTo('login');
                }
                break;
            default:
                app.innerHTML = this.renderHomePage();
        }
    }

    renderHeader() {
        const isLoggedIn = !!this.currentUser;
        
        return `
            <header class="header">
                <div class="container">
                    <nav class="nav">
                        <a href="#" class="logo" data-page="home">
                            <img src="Logo.jpg" alt="PieceJob Logo">
                            PieceJob
                        </a>
                        
                        <ul class="nav-menu">
                            <li><a href="#" data-page="jobs">Find Services</a></li>
                            <li><a href="#" data-page="post-job">Post Job</a></li>
                            <li><a href="#" data-page="about">About</a></li>
                        </ul>
                        
                        <div class="nav-actions">
                            ${isLoggedIn ? `
                                <a href="#" data-page="dashboard" class="btn btn-ghost">Dashboard</a>
                                <button onclick="app.logout()" class="btn btn-secondary">Logout</button>
                            ` : `
                                <a href="#" data-page="login" class="btn btn-ghost">Sign In</a>
                                <a href="#" data-page="register" class="btn btn-primary">Get Started</a>
                            `}
                            <button class="mobile-menu-toggle">☰</button>
                        </div>
                    </nav>
                </div>
                
                <!-- Mobile Menu -->
                <div class="mobile-menu">
                    <button class="mobile-menu-close">×</button>
                    <ul class="mobile-menu-items">
                        <li><a href="#" data-page="jobs">Find Services</a></li>
                        ${isLoggedIn ? `
                            <li><a href="#" data-page="post-job">Post Job</a></li>
                            <li><a href="#" data-page="chat">Messages</a></li>
                            <li><a href="#" data-page="job-history">My Jobs</a></li>
                        ` : `
                            <li><a href="#" data-page="about">About</a></li>
                        `}
                        ${isLoggedIn ? `
                            <li><a href="#" data-page="dashboard">Dashboard</a></li>
                            <li><a href="#" onclick="app.logout()">Logout</a></li>
                        ` : `
                            <li><a href="#" data-page="login">Sign In</a></li>
                            <li><a href="#" data-page="register">Get Started</a></li>
                        `}
                    </ul>
                </div>
            </header>
        `;
    }

    renderHomePage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <div class="hero-badge">🏠 Local Services Made Easy</div>
                        <h1 class="hero-title">
                            Get Your <span class="gradient-text">Piece Job</span> Done
                        </h1>
                        <p class="hero-subtitle">
                            Connect with trusted local service providers for cleaning, gardening, handyman tasks, and more. Safe, reliable, and affordable services in your area.
                        </p>
                        <div class="hero-actions">
                            <a href="#" data-page="register" class="btn btn-primary">Get Started →</a>
                            <a href="#" data-page="jobs" class="btn btn-secondary">▶ Browse Services</a>
                        </div>
                    </section>
                    
                    <section class="features">
                        <div class="feature-card">
                            <div class="feature-icon">🏠</div>
                            <h3 class="feature-title">Local Service Providers</h3>
                            <p class="feature-description">Connect with vetted local professionals for cleaning, gardening, repairs, and more in your area.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">🛡️</div>
                            <h3 class="feature-title">Safe & Secure</h3>
                            <p class="feature-description">All service providers are verified with background checks and insurance coverage for your peace of mind.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💰</div>
                            <h3 class="feature-title">Fair Pricing</h3>
                            <p class="feature-description">Transparent pricing with no hidden fees. Pay securely through the app after job completion.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📍</div>
                            <h3 class="feature-title">Location Tracking</h3>
                            <p class="feature-description">Real-time location tracking and emergency response features for safety and accountability.</p>
                        </div>
                    </section>
                </div>
            </main>
        `;
    }

    renderLoginPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <div class="form-container">
                        <h2 class="form-title">Welcome Back</h2>
                        <form id="loginForm">
                            <div class="form-group">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-input" placeholder="Enter your password" required>
                            </div>
                            <button type="submit" class="btn btn-primary form-submit">Sign In</button>
                        </form>
                        <div class="form-link">
                            <p>Don't have an account? <a href="#" data-page="register">Sign up here</a></p>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }

    renderRegisterPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <div class="form-container">
                        <h2 class="form-title">Join PieceJob</h2>
                        <form id="registerForm">
                            <div class="form-group">
                                <label class="form-label" for="fullName">Full Name</label>
                                <input type="text" id="fullName" class="form-input" placeholder="Enter your full name" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="email">Email</label>
                                <input type="email" id="email" class="form-input" placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="password">Password</label>
                                <input type="password" id="password" class="form-input" placeholder="Create a password" required>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="userType">I want to</label>
                                <select id="userType" class="form-input" required>
                                    <option value="">Select an option</option>
                                    <option value="service-provider">Provide services</option>
                                    <option value="customer">Hire service providers</option>
                                    <option value="both">Both</option>
                                </select>
                            </div>
                            <button type="submit" class="btn btn-primary form-submit">Create Account</button>
                        </form>
                        <div class="form-link">
                            <p>Already have an account? <a href="#" data-page="login">Sign in here</a></p>
                        </div>
                    </div>
                </div>
            </main>
        `;
    }

    renderDashboard() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Welcome back, ${this.currentUser.name}!</h1>
                        <p class="hero-subtitle">Here's what's happening with your local services today.</p>
                    </section>
                    
                    <div class="features">
                        <div class="feature-card">
                            <div class="feature-icon">📊</div>
                            <h3 class="feature-title">Active Projects</h3>
                            <p class="feature-description">3 projects in progress</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">💰</div>
                            <h3 class="feature-title">Earnings This Month</h3>
                            <p class="feature-description">R2,450</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">⭐</div>
                            <h3 class="feature-title">Rating</h3>
                            <p class="feature-description">4.9/5 (23 reviews)</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon">📈</div>
                            <h3 class="feature-title">Profile Views</h3>
                            <p class="feature-description">127 this week</p>
                        </div>
                    </div>
                    
                    <div class="mt-4">
                        <h2 style="margin-bottom: 24px;">Recent Service Opportunities</h2>
                        <div id="jobsList"></div>
                    </div>
                </div>
            </main>
        `;
    }

    renderJobsPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Find Local <span class="gradient-text">Services</span></h1>
                        <p class="hero-subtitle">Browse trusted service providers in your area for all your home and business needs.</p>
                    </section>
                    
                    <div id="jobsList"></div>
                </div>
            </main>
        `;
    }

    renderPostJobPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Post a <span class="gradient-text">Job</span></h1>
                        <p class="hero-subtitle">Tell us what you need done and get quotes from trusted local service providers.</p>
                    </section>
                    
                    <div class="form-container" style="max-width: 600px;">
                        <form id="postJobForm">
                            <div class="form-group">
                                <label class="form-label" for="jobTitle">Job Title</label>
                                <input type="text" id="jobTitle" class="form-input" placeholder="e.g. House cleaning service" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="jobCategory">Category</label>
                                <select id="jobCategory" class="form-input" required>
                                    <option value="">Select a category</option>
                                    <option value="cleaning">Cleaning</option>
                                    <option value="gardening">Gardening</option>
                                    <option value="handyman">Handyman</option>
                                    <option value="plumbing">Plumbing</option>
                                    <option value="electrical">Electrical</option>
                                    <option value="painting">Painting</option>
                                    <option value="moving">Moving</option>
                                    <option value="pet-care">Pet Care</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="jobDescription">Description</label>
                                <textarea id="jobDescription" class="form-input" rows="4" placeholder="Describe what you need done, including any specific requirements..." required></textarea>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="jobLocation">Location</label>
                                <input type="text" id="jobLocation" class="form-input" placeholder="e.g. Sandton, Johannesburg" required>
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label" for="jobBudget">Budget (Optional)</label>
                                <input type="text" id="jobBudget" class="form-input" placeholder="e.g. R500 or R50/hour">
                            </div>
                            
                            <div class="form-group">
                                <label class="form-label">Photos (Up to 10)</label>
                                <div class="photo-upload-area" id="photoUploadArea">
                                    <div class="upload-placeholder">
                                        <div class="upload-icon">📷</div>
                                        <p>Click to upload photos or drag and drop</p>
                                        <p class="upload-hint">JPG, PNG up to 5MB each (max 10 photos)</p>
                                    </div>
                                    <input type="file" id="jobPhotos" multiple accept="image/*" style="display: none;">
                                </div>
                                <div id="photoPreview" class="photo-preview-grid"></div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary form-submit">Post Job</button>
                        </form>
                    </div>
                </div>
            </main>
        `;
    }

    renderBrowseProvidersPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Browse <span class="gradient-text">Providers</span></h1>
                        <p class="hero-subtitle">View bids from qualified service providers in your area.</p>
                    </section>
                    
                    <div id="providersList"></div>
                </div>
            </main>
        `;
    }

    renderViewBidsPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">View <span class="gradient-text">Bids</span></h1>
                        <p class="hero-subtitle">Review and confirm bookings for your job.</p>
                    </section>
                    
                    <div id="bidsContent"></div>
                </div>
            </main>
        `;
    }

    renderChatPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Your <span class="gradient-text">Messages</span></h1>
                        <p class="hero-subtitle">Chat with service providers about your jobs.</p>
                    </section>
                    
                    <div id="chatContent"></div>
                </div>
            </main>
        `;
    }

    renderJobHistoryPage() {
        return `
            ${this.renderHeader()}
            <main class="main">
                <div class="container">
                    <section class="hero">
                        <h1 class="hero-title">Job <span class="gradient-text">History</span></h1>
                        <p class="hero-subtitle">Track your past jobs and loyalty rewards.</p>
                    </section>
                    
                    <div id="jobHistoryContent"></div>
                </div>
            </main>
        `;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('piecejob_user');
        this.navigateTo('home');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PieceJobApp();
    
    // Handle form submissions
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'loginForm') {
            e.preventDefault();
            window.authManager.handleLogin(e.target);
        }
        if (e.target.id === 'registerForm') {
            e.preventDefault();
            window.authManager.handleRegister(e.target);
        }
    });
});