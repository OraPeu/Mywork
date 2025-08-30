// Authentication Manager
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        // Load users from localStorage or return mock users
        const savedUsers = localStorage.getItem('piecejob_users');
        if (savedUsers) {
            return JSON.parse(savedUsers);
        }
        
        // Mock users for demo
        const mockUsers = [
            {
                id: 1,
                name: 'Thabo Mthembu',
                email: 'thabo@example.com',
                password: 'password123',
                userType: 'service-provider',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                rating: 4.9,
                completedJobs: 23,
                skills: ['Plumbing', 'Electrical', 'Handyman'],
                location: 'Johannesburg'
            },
            {
                id: 2,
                name: 'Sarah van der Merwe',
                email: 'sarah@example.com',
                password: 'password123',
                userType: 'customer',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                location: 'Cape Town'
            }
        ];
        
        this.saveUsers(mockUsers);
        return mockUsers;
    }

    saveUsers(users) {
        localStorage.setItem('piecejob_users', JSON.stringify(users));
    }

    handleLogin(form) {
        const formData = new FormData(form);
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login successful
            const userSession = {
                id: user.id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                avatar: user.avatar,
                rating: user.rating,
                completedJobs: user.completedJobs,
                skills: user.skills,
                company: user.company
            };
            
            localStorage.setItem('piecejob_user', JSON.stringify(userSession));
            window.app.currentUser = userSession;
            window.app.navigateTo('dashboard');
            
            this.showMessage('Login successful! Welcome back.', 'success');
        } else {
            this.showMessage('Invalid email or password. Please try again.', 'error');
        }
    }

    handleRegister(form) {
        const fullName = form.querySelector('#fullName').value;
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;
        const userType = form.querySelector('#userType').value;

        // Check if user already exists
        const existingUser = this.users.find(u => u.email === email);
        if (existingUser) {
            this.showMessage('An account with this email already exists.', 'error');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: fullName,
            email: email,
            password: password,
            userType: userType,
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face`,
            rating: 0,
            completedJobs: 0,
            skills: [],
            joinDate: new Date().toISOString()
        };

        // Add to users array and save
        this.users.push(newUser);
        this.saveUsers(this.users);

        // Create session
        const userSession = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            userType: newUser.userType,
            avatar: newUser.avatar,
            rating: newUser.rating,
            completedJobs: newUser.completedJobs,
            skills: newUser.skills
        };

        localStorage.setItem('piecejob_user', JSON.stringify(userSession));
        window.app.currentUser = userSession;
        window.app.navigateTo('dashboard');
        
        this.showMessage('Account created successfully! Welcome to PieceJob.', 'success');
    }

    showMessage(message, type = 'info') {
        // Remove existing messages
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `auth-message auth-message-${type}`;
        messageEl.textContent = message;
        
        // Add styles
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            animation: slideIn 0.3s ease-out;
        `;

        if (type === 'success') {
            messageEl.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        } else if (type === 'error') {
            messageEl.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
        } else {
            messageEl.style.background = 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)';
        }

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(messageEl);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.animation = 'slideIn 0.3s ease-out reverse';
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    logout() {
        localStorage.removeItem('piecejob_user');
        window.app.currentUser = null;
        window.app.navigateTo('home');
        this.showMessage('You have been logged out successfully.', 'info');
    }
}

// Initialize auth manager
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});