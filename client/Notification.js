document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.querySelector('.notification-list');
    const clearAllBtn = document.querySelector('.clear-all-btn');
    const closeBtn = document.querySelector('.close-btn');
    const taskInput = document.getElementById('taskInput');
    const taskSubmit = document.getElementById('taskSubmit');

    // Mock notification data
    const mockNotifications = [
        {
            text: "Jay has edited document 'Project.docx'",
            timestamp: "3:30 PM, 3/27/25"
        },
        {
            text: "Scarlett is working on code in 'Code Editor'",
            timestamp: "3:32 PM, 3/27/25"
        },
        {
            text: "Romy completed task 'Plan'",
            timestamp: "3:35 PM, 3/27/25"
        },
        {
            text: "Team meeting scheduled for tomorrow",
            timestamp: "3:40 PM, 3/27/25"
        },
        {
            text: "New comment on Project Timeline",
            timestamp: "3:45 PM, 3/27/25"
        }
    ];

    // Function to format current time and date
    function formatDateTime() {
        const now = new Date('2025-03-28T12:53:44+11:00'); // Using provided time
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const year = now.getFullYear().toString().slice(-2);
        
        return `${formattedHours}:${formattedMinutes} ${ampm}, ${month}/${day}/${year}`;
    }

    // Function to create notification HTML
    function createNotificationElement(notification) {
        return `
            <div class="notification-item">
                <div class="notification-content">${notification.text}</div>
                <div class="notification-time">${notification.timestamp}</div>
            </div>
        `;
    }

    // Function to add new notification
    function addNotification(text) {
        const notification = {
            text: text,
            timestamp: formatDateTime()
        };
        
        const notificationElement = createNotificationElement(notification);
        notificationList.insertAdjacentHTML('afterbegin', notificationElement);
    }

    // Handle task submission
    taskSubmit.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            const notificationText = `You are working on "${task}"`;
            addNotification(notificationText);
            taskInput.value = '';
            
            // Show notification count on bell icon
            const bellIcon = document.querySelector('[data-modal="notifications"] .fa-bell');
            if (bellIcon) {
                bellIcon.classList.add('has-notifications');
            }
        }
    });

    // Handle Enter key in task input
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            taskSubmit.click();
        }
    });

    // Populate initial notifications
    function populateNotifications() {
        notificationList.innerHTML = mockNotifications
            .map(notification => createNotificationElement(notification))
            .join('');
    }

    // Initialize notifications
    populateNotifications();

    // Clear all notifications
    clearAllBtn.addEventListener('click', () => {
        notificationList.innerHTML = '';
        console.log('Notifications cleared');
        
        // Remove notification indicator from bell icon
        const bellIcon = document.querySelector('[data-modal="notifications"] .fa-bell');
        if (bellIcon) {
            bellIcon.classList.remove('has-notifications');
        }
    });

    // Close notification popup
    closeBtn.addEventListener('click', () => {
        document.querySelector('.notification-overlay').style.display = 'none';
    });
});
