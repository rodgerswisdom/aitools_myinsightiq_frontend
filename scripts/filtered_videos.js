document.addEventListener('DOMContentLoaded', async () => {
    const filteredToolsContainer = document.getElementById('filtered-tools-container');
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategoryId = urlParams.get('categories[]');

    const cCount = document.getElementById('c_count');
    const count = document.getElementById('count');

    if (!selectedCategoryId) {
        filteredToolsContainer.innerHTML = '<p>No category selected. Go back and try again.</p>';
        return;
    }

    try {
        const toolResponse = await fetch('https://aitool-detail-service.vercel.app/api/tools/');
        const tools = await toolResponse.json();

        const filteredTools = tools.filter(tool => tool.category_id === parseInt(selectedCategoryId));

        if (filteredTools.length === 0) {
            filteredToolsContainer.innerHTML = '<p>No tools found for this category.</p>';
            return;
        }

        cCount.textContent = filteredTools.length;
        count.textContent = filteredTools.length;



        filteredTools.forEach(tool => {
            const a = document.createElement('a');
            a.href = `${tool.youtube_link}`;
            const div = document.createElement('div');
            div.className = 'featured-tools-list-item';
            div.textContent = tool.name;
            a.appendChild(div);
            filteredToolsContainer.appendChild(a);
        });
    } catch (error) {
        console.error('Error fetching tools:', error);
    }
});