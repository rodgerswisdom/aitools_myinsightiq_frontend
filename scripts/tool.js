
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const toolId = urlParams.get('id');

    if (toolId) {
        try {
            const response = await fetch(`https://aitool-detail-service-one.vercel.app/api/tools/${toolId}`);
            const toolDetails = await response.json();

            document.getElementById('tool-name').textContent = toolDetails.name;
            document.getElementById('tool-description').textContent = toolDetails.description;
            document.getElementById('tool-website').href = toolDetails.website_link;
            document.getElementById('tool-video').href = toolDetails.youtube_link;
        } catch (error) {
            console.error('Error fetching tool details:', error);
        }
    }
});