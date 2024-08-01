let sideMenu = document.querySelectorAll(".nav-link");
sideMenu.forEach((item) => {
  let li = item.parentElement;

  item.addEventListener("click", () => {
    sideMenu.forEach((link) => {
      link.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

let menuBar = document.querySelector(".menu-btn");
let sideBar = document.querySelector(".sidebar");
menuBar.addEventListener("click", () => {
  sideBar.classList.toggle("hide");
});

let switchMode = document.getElementById("switch-mode");
switchMode.addEventListener("change", (e) => {
  if (e.target.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

let searchFrom = document.querySelector(".content nav form");
let searchBtn = document.querySelector(".search-btn");
let searchIcon = document.querySelector(".search-icon");
searchBtn.addEventListener("click", (e) => {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchFrom.classList.toggle("show");
    if (searchFrom.classList.contains("show")) {
      searchIcon.classList.replace("fa-search", "fa-times");
    } else {
      searchIcon.classList.replace("fa-times", "fa-search");
    }
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 576) {
    searchIcon.classList.replace("fa-times", "fa-search");
    searchFrom.classList.remove("show");
  }
  if (window.innerWidth < 768) {
    sideBar.classList.add("hide");
  }
});

if (window.innerWidth < 768) {
  sideBar.classList.add("hide");
}

// function redirectToPage() {
//   let url = document.getElementById("select-page").value;
//   window.location.href = url;
// }

document.addEventListener('DOMContentLoaded', function() {
  const sideMenu = document.querySelector('.side-menu');
  const contentDiv = document.getElementById('content');

  sideMenu.addEventListener('click', function(e) {
    // Prevent default link behavior
    e.preventDefault();

    // Check if the clicked element is a nav-link
    if (e.target.closest('.nav-link')) {
      // Get the data-content attribute of the clicked item
      const content = e.target.closest('li').getAttribute('data-content');

      // Update the contentDiv based on the clicked item
      
  switch(content) {
      case 'Inventory':
          contentDiv.innerHTML = `<main>
        <div class="head-title">
          <div class="left">
            <h1>Inventory</h1>
            <ul class="breadcrumb">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <i class="fas fa-chevron-right"></i>
              <li>
                <a href="#" class="active">Inventory</a>
              </li>
            </ul>
          </div>

        </div>


        <div class="table-data">
          <div class="order">
            <div class="head">
              <h3>Stock</h3>
              <i class="fas fa-search"></i>
              <i class="fas fa-filter"></i>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wireless Mouse</td>
                  <td>Electronics</td>
                  <td>10</td>
                  <td>₹2000</td>
                  <td>A sleek and ergonomic wireless mouse with long battery life.</td>
                </tr>
                <tr>
                  <td>Running Shoes</td>
                  <td>Sportswear</td>
                  <td>15</td>
                  <td>₹4000</td>
                  <td>Comfortable and durable running shoes for all terrains.</td>
                </tr>
                <tr>
                  <td>Ceramic Mug</td>
                  <td>Kitchenware</td>
                  <td>30</td>
                  <td>₹600</td>
                  <td>A stylish ceramic mug perfect for coffee or tea.</td>
                </tr>
                <tr>
                  <td>Bluetooth Speaker</td>
                  <td>Electronics</td>
                  <td>20</td>
                  <td>₹2800</td>
                  <td>Portable Bluetooth speaker with excellent sound quality.</td>
                </tr>
                <tr>
                  <td>Yoga Mat</td>
                  <td>Sportswear</td>
                  <td>25</td>
                  <td>₹1600</td>
                  <td>Eco-friendly and non-slip yoga mat for all yoga practices.</td>
                </tr>
                <tr>
                  <td>Notebook</td>
                  <td>Stationery</td>
                  <td>50</td>
                  <td>₹400</td>
                  <td>A5 size notebook with 100 lined pages for notes and ideas.</td>
                </tr>
                
                
              </tbody>
            </table>
          </div>
          </div>

      </main>`;
          break;

      case 'Chat With Us':
          contentDiv.innerHTML = `<main>
        <div class="head-title">
          <div class="left">
            <h1>Cattle Mortality Distribution Over Seasons</h1>
          </div>
        </div>

        <div class="table-data">
          <div class="order">
            <div class="head">

              <div>
                <p>
                    <img src="Figure_2.jpeg" alt="Pie Chart" style="width: 50%; height: auto;">
                </p>
            </div>
            
          </div>
          </div>
        </div>

        <br>

        <div class="head-title">
          <div class="left">
            <h1>Cattle Mortality Distribution Over Seasons</h1>
          </div>
        </div>

        <div class="table-data">
          <div class="order">
            <div class="head">

            <div>
              <p>
                  
                  <img src="Figure_1.jpeg" alt="Pie Chart" style="width: 50%; height: auto;">
              </p>
          </div>
          
        </div>
      </main>`;
          break;
      default:
          content = '<p>Welcome! Click an item from the dashboard to see the content.</p>';
  }


}
});
});