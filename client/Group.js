document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const searchInput = document.querySelector('.search-bar input');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const membersList = document.querySelector('.members-list');

    // Initialize functionality
    function initialize() {
        setupEventListeners();
        setupSearch();
        setupFilters();
        setupMemberActions();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Member actions
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.action-btn');
            if (actionBtn) {
                const action = actionBtn.title.toLowerCase();
                const memberName = actionBtn.closest('.member-item')
                    .querySelector('.member-name').textContent;
                
                handleMemberAction(action, memberName);
            }
        });
    }

    // Setup search functionality
    function setupSearch() {
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const members = document.querySelectorAll('.member-item');

                members.forEach(member => {
                    const name = member.querySelector('.member-name').textContent.toLowerCase();
                    const role = member.querySelector('.member-role').textContent.toLowerCase();

                    if (name.includes(searchTerm) || role.includes(searchTerm)) {
                        member.style.display = 'flex';
                    } else {
                        member.style.display = 'none';
                    }
                });

                // Show/hide section headers based on visible members
                document.querySelectorAll('.members-section').forEach(section => {
                    const visibleMembers = section.querySelectorAll('.member-item[style="display: flex"]').length;
                    section.style.display = visibleMembers > 0 ? 'block' : 'none';
                });
            });
        }
    }

    // Setup status filters
    function setupFilters() {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter members
                const status = btn.dataset.status;
                const members = document.querySelectorAll('.member-item');

                members.forEach(member => {
                    if (status === 'all' || member.dataset.status === status) {
                        member.style.display = 'flex';
                    } else {
                        member.style.display = 'none';
                    }
                });

                // Show/hide section headers based on visible members
                document.querySelectorAll('.members-section').forEach(section => {
                    const visibleMembers = section.querySelectorAll('.member-item[style="display: flex"]').length;
                    section.style.display = visibleMembers > 0 ? 'block' : 'none';
                });
            });
        });
    }

    // Setup member actions
    function setupMemberActions() {
        // Add hover effects
        document.querySelectorAll('.member-item').forEach(member => {
            member.addEventListener('mouseenter', () => {
                member.querySelector('.member-actions').style.opacity = '1';
            });

            member.addEventListener('mouseleave', () => {
                member.querySelector('.member-actions').style.opacity = '0';
            });
        });
    }

    // Handle member actions
    function handleMemberAction(action, memberName) {
        switch(action) {
            case 'message':
                alert(`Opening chat with ${memberName}`);
                break;
            case 'video call':
                alert(`Starting video call with ${memberName}`);
                break;
        }
    }

    // Simulate status changes
    function simulateStatusChanges() {
        setInterval(() => {
            const members = document.querySelectorAll('.member-item');
            const randomMember = members[Math.floor(Math.random() * members.length)];
            const currentStatus = randomMember.dataset.status;
            const newStatus = currentStatus === 'online' ? 'offline' : 'online';
            
            randomMember.dataset.status = newStatus;
            
            // Show notification
            const name = randomMember.querySelector('.member-name').textContent;
            const status = newStatus === 'online' ? 'online' : 'offline';
            showNotification(`${name} is now ${status}`);
        }, 30000); // Every 30 seconds
    }

    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'status-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize
    initialize();
    simulateStatusChanges();
});
