document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const featuredToolsContainer = document.getElementById('filtered-tools-container');
    const cCount = document.getElementById('c_count');
    const count = document.getElementById('count');
    const paginationControls = document.getElementById('pagination-controls');

    let currentPage = 1;
    const limit = 10;

    async function fetchCategories() {
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
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    async function fetchTools(page) {
        const offset = (page - 1) * limit;
        try {
            const toolResponse = await fetch(`http://0.0.0.0:8000/api/tools/?limit=${limit}&offset=${offset}`);
            const tools = await toolResponse.json();

            featuredToolsContainer.innerHTML = ''; // Clear previous tools
            cCount.textContent = tools.length;
            count.textContent = tools.length;

            tools.forEach(tool => {
                const a = document.createElement('a');
                a.href = `tool.html?id=${tool.id}`;
                const div = document.createElement('div');
                div.className = 'featured-tools-list-item';
                div.textContent = tool.name;
                a.appendChild(div);
                featuredToolsContainer.appendChild(a);
            });

            // Update pagination
            updatePaginationControls(page, tools.total);
        } catch (error) {
            console.error('Error fetching tools:', error);
        }
    }

    function updatePaginationControls(page, total) {
        const totalPages = Math.ceil(total / limit);
        paginationControls.innerHTML = ''; // Clear existing controls

        if (page > 1) {
            const prevButton = document.createElement('button');
            prevButton.textContent = 'Previous';
            prevButton.addEventListener('click', () => fetchTools(page - 1));
            paginationControls.appendChild(prevButton);
        }

        if (page < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => fetchTools(page + 1));
            paginationControls.appendChild(nextButton);
        }
    }

    // Initial Data Load
    await fetchCategories();
    await fetchTools(currentPage);
});
