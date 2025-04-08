// Main JavaScript file for SWAP app prototype

document.addEventListener('DOMContentLoaded', function() {
    console.log('SWAP App Prototype Loaded');
    
    // Update all status bar times
    updateStatusBarTime();
    
    // Setup interval to update time every minute
    setInterval(updateStatusBarTime, 60000);
});

// Function to update status bar time in all iframes
function updateStatusBarTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        // Wait for iframe to load
        if (iframe.contentDocument) {
            const timeElement = iframe.contentDocument.querySelector('.status-bar-time');
            if (timeElement) {
                timeElement.textContent = timeString;
            }
        }
    });
}

// Handle navigation in each iframe
function navigateTo(screenName) {
    // This function would be called from within the iframes
    // In a real app, this would navigate to the screen
    console.log(`Navigating to: ${screenName}`);
}

// Handle tab switching within screens
function switchTab(tabElement, tabName) {
    // Find parent tabs container
    const tabsContainer = tabElement.closest('.tabs');
    
    // Remove active class from all tabs
    const tabs = tabsContainer.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked tab
    tabElement.classList.add('active');
    
    // Show corresponding content
    const tabContents = tabElement.closest('.tab-container').querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.style.display = 'block';
    }
}

// Toggle expand/collapse for project details
function toggleProjectDetails(element) {
    const detailsSection = element.nextElementSibling;
    
    if (detailsSection.style.display === 'none' || !detailsSection.style.display) {
        detailsSection.style.display = 'block';
        element.querySelector('.toggle-icon').classList.replace('fa-chevron-down', 'fa-chevron-up');
    } else {
        detailsSection.style.display = 'none';
        element.querySelector('.toggle-icon').classList.replace('fa-chevron-up', 'fa-chevron-down');
    }
}

// Handle sharing profile card
function shareProfile() {
    // In a real app, this would open the native sharing dialog
    alert('分享成功！个人名片链接已复制到剪贴板。');
}

// Handle notification filtering
function filterNotifications(category) {
    const notifications = document.querySelectorAll('.notification-item');
    
    notifications.forEach(notification => {
        if (category === 'all' || notification.classList.contains(`category-${category}`)) {
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    });
    
    // Update active filter
    const filters = document.querySelectorAll('.filter');
    filters.forEach(filter => {
        filter.classList.remove('active');
        if (filter.getAttribute('data-filter') === category) {
            filter.classList.add('active');
        }
    });
}

// Toggle favorite status for a project
function toggleFavorite(element) {
    element.classList.toggle('fas');
    element.classList.toggle('far');
    element.classList.toggle('text-warning');
}