document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const recordBtn = document.querySelector('.record-btn');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const timer = document.querySelector('.timer');
    const transcriptionContent = document.querySelector('.transcription-content');
    const controlBtns = document.querySelectorAll('.control-btn');
    const copyBtns = document.querySelectorAll('.copy-btn');

    let isRecording = false;
    let timerInterval;
    let startTime;

    // Mock transcription entries
    const mockTranscriptions = [
        "We should focus on implementing the core features first.",
        "I agree, let's prioritize the user authentication system.",
        "What's our timeline for the initial prototype?",
        "We need to consider scalability from the start.",
        "The database design looks good, but we might need to optimize the queries.",
        "Let's schedule a follow-up meeting next week to review progress."
    ];

    // Initialize functionality
    function initialize() {
        setupEventListeners();
        setupControls();
        setupTabs();
        setupCopyButtons();
    }

    // Setup tabs
    function setupTabs() {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tab = btn.dataset.tab;
                
                // Update active states
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.querySelector(`.${tab}-tab`).classList.add('active');
            });
        });
    }

    // Setup event listeners
    function setupEventListeners() {
        if (recordBtn) {
            recordBtn.addEventListener('click', toggleRecording);
        }

        // Meeting controls
        document.querySelectorAll('.meeting-controls .control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.title.toLowerCase();
                handleMeetingControl(action);
            });
        });

        // Participant controls
        document.querySelectorAll('.participants-header .control-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.title.toLowerCase();
                handleParticipantControl(action);
            });
        });
    }

    // Setup copy buttons
    function setupCopyButtons() {
        copyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = btn.parentElement.querySelector('input');
                if (input) {
                    navigator.clipboard.writeText(input.value)
                        .then(() => {
                            const originalTitle = btn.title;
                            btn.title = 'Copied!';
                            btn.style.color = '#2ecc71';
                            setTimeout(() => {
                                btn.title = originalTitle;
                                btn.style.color = '';
                            }, 2000);
                        })
                        .catch(err => console.error('Failed to copy:', err));
                }
            });
        });
    }

    // Setup control buttons
    function setupControls() {
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.title.toLowerCase();
                handleControl(action);
            });
        });
    }

    // Handle meeting controls
    function handleMeetingControl(action) {
        switch(action) {
            case 'microphone':
                toggleMicrophone();
                break;
            case 'camera':
                toggleCamera();
                break;
            case 'share screen':
                toggleScreenShare();
                break;
            case 'chat':
                toggleChat();
                break;
            case 'end meeting':
                endMeeting();
                break;
        }
    }

    // Handle participant controls
    function handleParticipantControl(action) {
        switch(action) {
            case 'mute all':
                muteAllParticipants();
                break;
            case 'hide all videos':
                hideAllVideos();
                break;
        }
    }

    // Toggle microphone
    function toggleMicrophone() {
        const btn = document.querySelector('.meeting-controls [title="Microphone"]');
        const icon = btn.querySelector('i');
        const isMuted = icon.classList.contains('fa-microphone-slash');
        
        icon.className = isMuted ? 'fas fa-microphone' : 'fas fa-microphone-slash';
        btn.style.background = isMuted ? '#fff' : '#dc3545';
        btn.style.color = isMuted ? '#495057' : '#fff';
    }

    // Toggle camera
    function toggleCamera() {
        const btn = document.querySelector('.meeting-controls [title="Camera"]');
        const icon = btn.querySelector('i');
        const isOff = icon.classList.contains('fa-video-slash');
        
        icon.className = isOff ? 'fas fa-video' : 'fas fa-video-slash';
        btn.style.background = isOff ? '#fff' : '#dc3545';
        btn.style.color = isOff ? '#495057' : '#fff';
    }

    // Toggle screen share
    function toggleScreenShare() {
        const btn = document.querySelector('.meeting-controls [title="Share Screen"]');
        const isSharing = btn.style.background === 'rgb(46, 204, 113)';
        
        btn.style.background = isSharing ? '#fff' : '#2ecc71';
        btn.style.color = isSharing ? '#495057' : '#fff';
        alert(isSharing ? 'Stopped sharing screen' : 'Started sharing screen');
    }

    // Toggle chat
    function toggleChat() {
        alert('Chat feature clicked');
    }

    // End meeting
    function endMeeting() {
        if (confirm('Are you sure you want to end the meeting?')) {
            alert('Meeting ended');
            // Here you would typically clean up and close the meeting
        }
    }

    // Mute all participants
    function muteAllParticipants() {
        document.querySelectorAll('.participant-card:not(.host) .mic-status')
            .forEach(status => {
                status.classList.add('muted');
                status.innerHTML = '<i class="fas fa-microphone-slash"></i>';
            });
    }

    // Hide all videos
    function hideAllVideos() {
        document.querySelectorAll('.participant-card:not(.host) .video-placeholder')
            .forEach(video => {
                video.style.background = '#1a1a1a';
            });
    }

    // Toggle recording state
    function toggleRecording() {
        isRecording = !isRecording;
        
        if (isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    }

    // Start recording
    function startRecording() {
        console.log('Recording started');
        
        // Update UI
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '<i class="fas fa-stop"></i><span>Stop Recording</span>';
        statusDot.classList.add('recording');
        statusText.textContent = 'Recording';
        
        // Start timer
        startTime = Date.now();
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        
        // Start mock transcription
        startMockTranscription();
    }

    // Stop recording
    function stopRecording() {
        console.log('Recording stopped');
        
        // Update UI
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Start Recording</span>';
        statusDot.classList.remove('recording');
        statusText.textContent = 'Ready to Record';
        
        // Stop timer
        clearInterval(timerInterval);
    }

    // Update timer display
    function updateTimer() {
        const elapsed = Date.now() - startTime;
        const seconds = Math.floor((elapsed / 1000) % 60);
        const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        
        timer.textContent = [
            hours.toString().padStart(2, '0'),
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0')
        ].join(':');
    }

    // Start mock transcription
    function startMockTranscription() {
        let index = 0;
        
        function addTranscription() {
            if (!isRecording) return;
            
            const now = new Date();
            const timestamp = now.toLocaleTimeString();
            const speakers = ['Dr. Smith', 'Prof. Johnson', 'Dr. Williams'];
            const speaker = speakers[Math.floor(Math.random() * speakers.length)];
            const text = mockTranscriptions[index % mockTranscriptions.length];
            
            const entry = document.createElement('div');
            entry.className = 'transcription-entry';
            entry.innerHTML = `
                <span class="timestamp">[${timestamp}]</span>
                <span class="speaker">${speaker}:</span>
                <span class="text">${text}</span>
            `;
            
            transcriptionContent.appendChild(entry);
            transcriptionContent.scrollTop = transcriptionContent.scrollHeight;
            
            index++;
            
            // Schedule next transcription
            const delay = 3000 + Math.random() * 4000; // Random delay between 3-7 seconds
            if (isRecording) {
                setTimeout(addTranscription, delay);
            }
        }
        
        addTranscription();
    }

    // Handle control actions
    function handleControl(action) {
        switch(action) {
            case 'copy':
                copyTranscription();
                break;
            case 'download':
                downloadTranscription();
                break;
            case 'clear':
                clearTranscription();
                break;
        }
    }

    // Copy transcription
    function copyTranscription() {
        const text = Array.from(transcriptionContent.querySelectorAll('.transcription-entry'))
            .map(entry => {
                const timestamp = entry.querySelector('.timestamp').textContent;
                const speaker = entry.querySelector('.speaker').textContent;
                const text = entry.querySelector('.text').textContent;
                return `${timestamp} ${speaker} ${text}`;
            })
            .join('\n');
        
        navigator.clipboard.writeText(text)
            .then(() => alert('Transcription copied to clipboard!'))
            .catch(err => console.error('Failed to copy:', err));
    }

    // Download transcription
    function downloadTranscription() {
        const text = Array.from(transcriptionContent.querySelectorAll('.transcription-entry'))
            .map(entry => {
                const timestamp = entry.querySelector('.timestamp').textContent;
                const speaker = entry.querySelector('.speaker').textContent;
                const text = entry.querySelector('.text').textContent;
                return `${timestamp} ${speaker} ${text}`;
            })
            .join('\n');
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `meeting-transcript-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Clear transcription
    function clearTranscription() {
        if (confirm('Are you sure you want to clear the transcription?')) {
            transcriptionContent.innerHTML = '';
        }
    }

    // Initialize
    initialize();
});
