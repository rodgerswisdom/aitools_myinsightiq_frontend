document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const featuredToolsContainer = document.getElementById('featured-tools-container');
    const loadNextBtn = document.getElementById('load-next-btn')
    const cCount = document.getElementById('c_count');
    const count = document.getElementById('count');

    let nextPageUrl = 'https://aitool-detail-service-one.vercel.app/api/tools/';
    let totalLoadedTools = 0; 
    try {
       
        const categoryResponse = await fetch('https://category-service-3t5x.onrender.com/api/categories/');
        const categories = await categoryResponse.json();

        categories.forEach(category => {
            const label = document.createElement('label');
            label.className = 'category-list-item';
            label.innerHTML = `
                <input type="radio" name="categories[]" value="${category.id}">
                ${category.name}
            `;
            categoryList.appendChild(label);
        });

        /**
         * Fetch tools and update the UI.
         * @param {string} url - The API endpoint for fetching tools.
         */
        const fetchTools = async (url) => {
            try {
                const toolResponse = await fetch(url);
                if (!toolResponse.ok) {
                    throw new Error(`HTTP error! status: ${toolResponse.status}`);
                }

                const toolsData = await toolResponse.json();

                // Increment total loaded tools
                totalLoadedTools += toolsData.results.length;

                // Update total count and current count in the DOM
                cCount.textContent = totalLoadedTools; 
                /**
                 * Total tools in the db
                 */
                count.textContent = toolsData.count; 
                // Append tools to the container
                toolsData.results.forEach(tool => {
                    const a = document.createElement('a');
                    a.href = `${tool.youtube_link}`;
                    const div = document.createElement('div');
                    div.className = 'featured-tools-list-item';
                    div.textContent = tool.name;
                    a.appendChild(div);
                    featuredToolsContainer.appendChild(a);
                });

                // Update the next page URL
                nextPageUrl = toolsData.next; // API response will provide the next page URL or null
            } catch (error) {
                console.error('Error fetching tools:', error);
            }
        };

        // Initial fetch for tools
        await fetchTools(nextPageUrl);

        // Add "Load More" button for pagination
        const loadMoreButton = document.createElement('button');
        loadMoreButton.textContent = 'Load More';
        loadMoreButton.className = 'load-more-button'; // Add a class for styling
        loadMoreButton.addEventListener('click', async () => {
            if (nextPageUrl) {
                await fetchTools(nextPageUrl);
            }

            // Disable the button if no more pages are available
            if (!nextPageUrl) {
                loadMoreButton.disabled = true;
                loadMoreButton.textContent = 'No More Tools';
            }
        });

        loadNextBtn.appendChild(loadMoreButton);
    } catch (error) {
        console.error('Error loading data:', error);
    }
});
