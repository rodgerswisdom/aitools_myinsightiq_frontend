
document.addEventListener('DOMContentLoaded', async () => {
    const categoryList = document.getElementById('category-list');
    const featuredToolsContainer = document.getElementById('filtered-tools-container');
    const cCount = document.getElementById('c_count');
    const count = document.getElementById('count');


    try {
        // Fetch categories
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

        

        // Fetch tools
        const toolResponse = await fetch('https://aitool-detail-service.vercel.app/api/tools/');
        const tools = await toolResponse.json();
        const featuredToolsContainer = document.getElementById('featured-tools-container');


        cCount.textContent = 850+tools.length;
        count.textContent = 850+tools.length;


        tools.forEach(tool => {
        const a = document.createElement('a');
        a.href = `tool.html?id=${tool.id}`;
        const div = document.createElement('div');
        div.className = 'featured-tools-list-item';
        div.textContent = tool.name;
        a.appendChild(div);
        featuredToolsContainer.appendChild(a);
        });
    } catch (error) {
        console.error('Error loading data:', error);
    }
});


