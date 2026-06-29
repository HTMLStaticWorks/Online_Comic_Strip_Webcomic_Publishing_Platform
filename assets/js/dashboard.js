document.addEventListener('DOMContentLoaded', () => {
    // Dashboard sidebar navigation toggling
    const sidebarLinks = document.querySelectorAll('.dashboard-sidebar .list-group-item');
    const sections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-section');
            if (!targetId) return;

            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');

            // Hide all sections
            sections.forEach(sec => sec.classList.remove('active'));
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Close mobile menu if offcanvas exists
            const offcanvasElement = document.getElementById('dashboardSidebarOffcanvas');
            if (offcanvasElement) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    });

    // Simple Interactive Chart Data Rendering (Using CSS heights for dynamic charts)
    const animateCharts = () => {
        const bars = document.querySelectorAll('.chart-bar-fill');
        bars.forEach(bar => {
            const val = bar.getAttribute('data-value');
            bar.style.height = val + '%';
        });
    };

    // Trigger chart animation
    setTimeout(animateCharts, 300);
});
