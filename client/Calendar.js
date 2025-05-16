document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    let currentDate = new Date(2025, 2, 26); // March 26, 2025

    // Calendar elements
    const prevMonthBtn = document.querySelector('.prev-month');
    const nextMonthBtn = document.querySelector('.next-month');
    const monthDisplay = document.querySelector('.calendar-nav h2');
    const daysGrid = document.querySelector('.days');
    const addEventBtn = document.querySelector('.add-event-btn');
    const eventModal = document.querySelector('.event-modal');
    const addEventForm = document.getElementById('addEventForm');
    const viewButtons = document.querySelectorAll('.view-btn');

    // Initialize calendar
    function initializeCalendar() {
        setupEventListeners();
        updateCalendar();
    }

    // Setup event listeners
    function setupEventListeners() {
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                updateCalendar();
            });
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                updateCalendar();
            });
        }

        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => {
                if (eventModal) {
                    eventModal.style.display = 'flex';
                }
            });
        }

        if (eventModal) {
            eventModal.addEventListener('click', (e) => {
                if (e.target === eventModal) {
                    eventModal.style.display = 'none';
                }
            });
        }

        if (addEventForm) {
            addEventForm.addEventListener('submit', (e) => {
                e.preventDefault();
                addNewEvent();
            });

            const cancelBtn = addEventForm.querySelector('.cancel-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    eventModal.style.display = 'none';
                });
            }
        }

        // View toggle
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                // TODO: Implement different views
            });
        });
    }

    // Update calendar display
    function updateCalendar() {
        // Update month/year display
        monthDisplay.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

        // Get first day of month and total days
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const totalDays = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();

        // Get last days of previous month
        const prevLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const prevDays = prevLastDay.getDate();

        // Generate calendar HTML
        let daysHTML = '';

        // Previous month's days
        for (let x = firstDayIndex; x > 0; x--) {
            daysHTML += `<div class="day other-month">${prevDays - x + 1}</div>`;
        }

        // Current month's days
        for (let i = 1; i <= totalDays; i++) {
            const isToday = i === 26 && currentDate.getMonth() === 2 && currentDate.getFullYear() === 2025;
            const hasEvents = [26, 27, 28].includes(i) && currentDate.getMonth() === 2;
            
            daysHTML += `
                <div class="day${isToday ? ' current' : ''}${hasEvents ? ' has-events' : ''}">${i}
                    ${getEventsForDay(i)}
                </div>
            `;
        }

        // Next month's days
        const totalCells = 42;
        const remainingCells = totalCells - (firstDayIndex + totalDays);
        for (let j = 1; j <= remainingCells; j++) {
            daysHTML += `<div class="day other-month">${j}</div>`;
        }

        daysGrid.innerHTML = daysHTML;
        setupEventHovers();
    }

    // Get events for a specific day
    function getEventsForDay(day) {
        if (currentDate.getMonth() !== 2 || currentDate.getFullYear() !== 2025) return '';

        const events = {
            26: `
                <div class="event academic">
                    <span class="event-time">10:00 AM</span>
                    <span class="event-title">Research Methods Class</span>
                </div>
                <div class="event meeting">
                    <span class="event-time">2:30 PM</span>
                    <span class="event-title">Group Meeting</span>
                </div>
            `,
            27: `
                <div class="event deadline">
                    <span class="event-time">11:59 PM</span>
                    <span class="event-title">Assignment Due</span>
                </div>
            `,
            28: `
                <div class="event academic">
                    <span class="event-time">9:00 AM</span>
                    <span class="event-title">Statistics Lecture</span>
                </div>
            `
        };

        return events[day] || '';
    }

    // Add new event
    function addNewEvent() {
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;
        const type = document.getElementById('eventType').value;

        // Create event element
        const eventDay = new Date(date).getDate();
        const targetDay = document.querySelector(`.day:not(.other-month):nth-child(n+${firstDayIndex + 1}):nth-child(-n+${firstDayIndex + totalDays})`);
        
        if (targetDay) {
            const event = document.createElement('div');
            event.className = `event ${type}`;
            event.innerHTML = `
                <span class="event-time">${formatTime(time)}</span>
                <span class="event-title">${title}</span>
            `;
            targetDay.appendChild(event);
            targetDay.classList.add('has-events');
        }

        // Close modal and reset form
        eventModal.style.display = 'none';
        addEventForm.reset();
    }

    // Format time from 24h to 12h
    function formatTime(time) {
        const [hours, minutes] = time.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}:${minutes} ${period}`;
    }

    // Setup event hover effects
    function setupEventHovers() {
        const events = document.querySelectorAll('.event');
        events.forEach(event => {
            event.addEventListener('mouseenter', () => {
                event.style.transform = 'translateY(-2px)';
            });
            event.addEventListener('mouseleave', () => {
                event.style.transform = 'translateY(0)';
            });
        });
    }

    // Initialize calendar when loaded
    initializeCalendar();
});
