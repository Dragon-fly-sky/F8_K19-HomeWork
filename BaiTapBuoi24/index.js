const API_URL = "https://fakestoreapi.com/products";

const productList = document.querySelector("#productList");
const productCount = document.querySelector("#productCount");
const categoryList = document.querySelector("#categoryList");
const cartCountElement = document.querySelector("#cartCount");
const searchInput = document.querySelector("#searchInput");

let products = [];
let currentCategory = "all";
let cartCount = 0;

async function fetchProducts() {
    try {
        productList.innerHTML = "<p>Đang tải sản phẩm...</p>";

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Không thể tải danh sách sản phẩm");
        }

        products = await response.json();

        renderCategories(products);
        renderProducts(products);
    } catch (error) {
        productList.innerHTML = `<p>${error.message}</p>`;
    }
}

function renderProducts(productData) {
    productCount.textContent = `Hiển thị ${productData.length} sản phẩm`;

    productList.innerHTML = productData
        .map((product) => {
            return `
        <article class="product-card">
          <div class="product-image">
            <span class="category-tag">${product.category}</span>

            <img src="${product.image}" alt="${product.title}" />
          </div>

          <div class="product-content">
            <h3 class="product-title">${product.title}</h3>

            <div class="rating">
              <span class="star">★</span>
              ${product.rating.rate}
              <span>(${product.rating.count})</span>
            </div>

            <div class="product-footer">
              <div class="price">$${product.price}</div>

              <button 
                class="add-cart-btn" 
                onclick="handleAddToCart()"
              >
                🛒
              </button>
            </div>
          </div>
        </article>
      `;
        })
        .join("");
}

function renderCategories(productData) {
    const categories = productData.reduce((result, product) => {
        if (!result.includes(product.category)) {
            result.push(product.category);
        }
        return result;
    }, []);

    categoryList.innerHTML = `
    <li class="active" data-category="all">
      Tất cả sản phẩm
    </li>

    ${categories
        .map((category) => {
            const count = productData.filter(
                (product) => product.category === category
            ).length;

            return `
          <li data-category="${category}">
            ${category}
            <span>${count}</span>
          </li>
        `;
        })
        .join("")}
  `;

    const categoryItems = categoryList.querySelectorAll("li");

    categoryItems.forEach((item) => {
        item.addEventListener("click", () => {
            categoryItems.forEach((li) => li.classList.remove("active"));

            item.classList.add("active");

            currentCategory = item.dataset.category;

            filterProducts();
        });
    });
}

function filterProducts() {
    const keyword = searchInput.value.toLowerCase().trim();

    let filteredProducts = products;

    if (currentCategory !== "all") {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category === currentCategory;
        });
    }

    if (keyword) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.title.toLowerCase().includes(keyword);
        });
    }

    renderProducts(filteredProducts);
}

function handleAddToCart() {
    cartCount++;
    cartCountElement.textContent = cartCount;
}

searchInput.addEventListener("input", filterProducts);

fetchProducts();