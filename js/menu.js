/**
 * menu.js - Handles Menu Data, Live Search, Tab Filtering, and Pagination
 */

document.addEventListener('DOMContentLoaded', () => {
    // Complete Menu Data
    const menuData = [
        {
            id: 1,
            name: "Royal Chicken Biryani",
            category: "Dishes",
            description: "Fragrant basmati rice cooked with tender chicken, exotic spices, and saffron. Served with raita.",
            price: "$24.00",
            icon: "fa-bowl-rice",
            ingredients: "chicken, rice, saffron, spices"
        },
        {
            id: 2,
            name: "Mutton Rezala",
            category: "Dishes",
            description: "Slow-cooked mutton in a rich, aromatic yogurt and cashew nut gravy.",
            price: "$28.00",
            icon: "fa-drumstick-bite",
            ingredients: "mutton, yogurt, cashew, spices"
        },
        {
            id: 3,
            name: "Fried Fish Fillet",
            category: "Dishes",
            description: "Crispy golden fish fillet served with our house-special tangy tartar sauce.",
            price: "$22.00",
            icon: "fa-fish",
            ingredients: "fish, batter, oil, tartar sauce"
        },
        {
            id: 4,
            name: "Paneer Special",
            category: "Dishes",
            description: "Fresh cottage cheese cubes simmered in a velvety tomato and butter gravy.",
            price: "$18.00",
            icon: "fa-cheese",
            ingredients: "paneer, tomato, butter, cream, vegetarian"
        },
        {
            id: 5,
            name: "Garlic Naan",
            category: "Dishes",
            description: "Soft Indian flatbread baked in a tandoor, brushed with garlic butter.",
            price: "$4.00",
            icon: "fa-bread-slice",
            ingredients: "flour, garlic, butter, vegetarian"
        },
        {
            id: 6,
            name: "Mango Lassi",
            category: "Food & Beverage",
            description: "A refreshing, creamy yogurt drink blended with sweet Alphonso mangoes.",
            price: "$6.00",
            icon: "fa-glass-water",
            ingredients: "yogurt, mango, sugar, vegetarian"
        },
        {
            id: 7,
            name: "Fresh Lime Soda",
            category: "Food & Beverage",
            description: "Crisp and refreshing soda with freshly squeezed lime and a hint of mint.",
            price: "$4.50",
            icon: "fa-martini-glass-citrus",
            ingredients: "lime, soda, mint, sugar, vegan"
        },
        {
            id: 8,
            name: "Masala Chai",
            category: "Food & Beverage",
            description: "Traditional Indian tea brewed with milk and aromatic spices.",
            price: "$3.50",
            icon: "fa-mug-hot",
            ingredients: "tea, milk, cardamom, ginger"
        },
        {
            id: 9,
            name: "Gulab Jamun",
            category: "Desserts",
            description: "Soft, deep-fried milk dumplings soaked in a warm, fragrant rose syrup.",
            price: "$7.00",
            icon: "fa-ice-cream",
            ingredients: "milk solids, sugar, rose water, vegetarian"
        },
        {
            id: 10,
            name: "Royal Rasmalai",
            category: "Desserts",
            description: "Delicate cottage cheese discs poached in sweetened, thickened milk flavored with cardamom.",
            price: "$8.50",
            icon: "fa-cake-candles",
            ingredients: "paneer, milk, cardamom, pistachio"
        }
    ];

    // State Variables
    let currentCategory = 'All';
    let searchQuery = '';
    let currentPage = 1;
    const itemsPerPage = 6;

    // DOM Elements
    const menuGrid = document.getElementById('menu-grid');
    const searchInput = document.getElementById('menu-search');
    const tabButtons = document.querySelectorAll('.tab-btn');
    const paginationContainer = document.getElementById('pagination');

    // Function to filter data based on search and category
    function getFilteredData() {
        return menuData.filter(item => {
            const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = item.name.toLowerCase().includes(searchLower) || 
                                  item.ingredients.toLowerCase().includes(searchLower);
            return matchesCategory && matchesSearch;
        });
    }

    // Function to render menu items
    function renderMenu() {
        const filteredData = getFilteredData();
        
        // Pagination logic
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);
        
        // Ensure current page is valid after filtering
        if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;
        if (totalPages === 0) currentPage = 1;

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedData = filteredData.slice(startIndex, endIndex);

        // Clear Grid
        menuGrid.innerHTML = '';

        if (paginatedData.length === 0) {
            menuGrid.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x" style="margin-bottom: 1rem; color: var(--border-color);"></i>
                    <h3>No items found</h3>
                    <p>Try adjusting your search or category filter.</p>
                </div>
            `;
        } else {
            paginatedData.forEach(item => {
                const card = document.createElement('div');
                card.className = 'menu-item-card';
                card.innerHTML = `
                    <div class="menu-item-img">
                        <i class="fas ${item.icon} fa-4x" style="color: var(--text-secondary);"></i>
                    </div>
                    <div class="menu-item-content">
                        <div class="menu-item-header">
                            <h3 class="menu-item-title">${item.name}</h3>
                            <span class="menu-item-price">${item.price}</span>
                        </div>
                        <p class="menu-item-desc">${item.description}</p>
                        <button class="btn btn-outline" style="width: 100%;">Add to Order</button>
                    </div>
                `;
                menuGrid.appendChild(card);
            });
        }

        renderPagination(totalPages);
    }

    // Function to render pagination controls
    function renderPagination(totalPages) {
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return; // No pagination needed for single page

        // Prev Button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderMenu();
                scrollToMenuTop();
            }
        });
        paginationContainer.appendChild(prevBtn);

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.innerText = i;
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderMenu();
                scrollToMenuTop();
            });
            paginationContainer.appendChild(pageBtn);
        }

        // Next Button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderMenu();
                scrollToMenuTop();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Utility: Scroll to top of menu grid when paginating
    function scrollToMenuTop() {
        const controlsTop = document.querySelector('.menu-controls').offsetTop;
        window.scrollTo({
            top: controlsTop - 100,
            behavior: 'smooth'
        });
    }

    // Event Listeners for Tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked
            e.target.classList.add('active');
            
            // Update state
            currentCategory = e.target.getAttribute('data-category');
            currentPage = 1; // Reset to page 1 on filter
            renderMenu();
        });
    });

    // Event Listener for Live Search
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        currentPage = 1; // Reset to page 1 on search
        renderMenu();
    });

    // Initial Render
    renderMenu();
});