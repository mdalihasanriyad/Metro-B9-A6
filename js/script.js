function showTooltip(element) {
  const tooltip = element.querySelector(".tooltiptext");
  tooltip.style.visibility = "visible";
  tooltip.style.opacity = "1";
}

function hideTooltip(element) {
  const tooltip = element.querySelector(".tooltiptext");
  tooltip.style.visibility = "hidden";
  tooltip.style.opacity = "0";
}

const loadCategory = async () => {
  document.getElementById("loading-spinner").classList.remove("hidden");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await response.json();
  const categorySec = document.getElementById("categoy-sec");
  data.posts.forEach((item) => {
    setTimeout(function () {
      document.getElementById("loading-spinner").classList.add("hidden");
    }, 2000);
    const div = document.createElement("div");
    div.innerHTML = `      
        <div class=" flex m-2 lg:w-[820px] h-[300px] rounded-xl gap-4 bg-[#F3F3F5] p-8">
                    <div class=" indicator w-20 h-20 bg-slate-600 rounded-lg">
                        <span class="indicator-item w-4 h-4 rounded-full ${
                          item.isActive ? "bg-green-600" : "bg-red-600"
                        } "></span> 
                        <img class="rounded-xl" src="${item.image}" alt="">
                        
                    </div>
                    <div class="">
                        <div class="flex space-x-6">
                            <h4>#${item.category}</h4>
                            <h4>Author :${item.author.name}</h4>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 mt-3">${
                          item.title
                        }</h3>
                        <p class="m-2 lg:w-[600px] mx-auto">${
                          item.description
                        }</p>
                        <hr class="divide-dotted mt-5">
                        <div class="flex justify-between mt-6 ">
                            <div class="flex space-x-10">
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-message-2.svg" alt="">
                                    <h6>${item.comment_count}</h6>
                                </div>
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-eye.svg" alt="">
                                    <h6>${item.view_count}</h6>
                                </div>
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-clock-hour-9.svg" alt="">
                                    <h6>${item.posted_time}</h6>
                                </div>
                            </div>
                            <button onclick="check('${item.title}',${
      item.view_count
    })" ><img src="./images/email 1.svg" alt=""></button>
                        </div>
                    </div>
                </div>
        `;
    categorySec.appendChild(div);
  });
};

let added = 0;

const check = async (title, view_count) => {
  added = added + 1;
  console.log(title, view_count);
  setInnerText("added-total", added);
  const asideBar = document.getElementById("aside-bar");
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="flex bg-white rounded-xl space-x-4 my-4 p-4">
                        <div class="">
                            <h4>${title}</h4>
                        </div>
                        <div class="flex justify-center items-center space-x-2">
                            <img src="./images/tabler-icon-eye.svg" alt="">
                            <h4>${view_count}</h4>
                        </div>
    </div>
    `;
  asideBar.appendChild(div);
};

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}

const loadPost = async () => {
  document.getElementById("loading-spinnerd").classList.remove("hidden");
  const response = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await response.json();
  const allPost = document.getElementById("post-more");
  data.forEach((item) => {
    setTimeout(function () {
      document.getElementById("loading-spinnerd").classList.add("hidden");
    }, 2000);
    const div = document.createElement("div");
    div.classList.add =
      "grid p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center";
    div.innerHTML = `
        <div class="card w-96 h-[500px] bg-base-100 shadow-xl">
                        <figure class="px-10 pt-10">
                          <img src="${
                            item.cover_image
                          }" alt="Shoes" class="rounded-xl" />
                        </figure>
                        <div class="flex space-x-4 pl-8 pt-4">
                            <img src="./images/published.svg" alt="">
                            <h6>${
                              item.author.posted_date
                                ? item.author.posted_date
                                : "No Published Date"
                            }</h6>
                        </div>
                        <div class="card-body items-center ">
                          <h2 class="card-title text-xl font-semibold">${
                            item.title
                          }</h2>
                          <p class="opacity-60">${item.description} </p>
                          <div class="card-actions mt-4">
                            <div class="">
                                <img class="w-10 h-10 rounded-full" src="${
                                  item.profile_image
                                }" alt="Man">
                            </div>
                            <div class="">
                                <h5>${item.author.name}</h5>
                                <p>${
                                  item.author.designation
                                    ? item.author.designation
                                    : "Unknown"
                                }</p>
                            </div>
                          </div>
                        </div>
                      </div>
        `;
    allPost.appendChild(div);
  });
};

const categoryMore = async (categoryName) => {
  console.log(categoryName);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${categoryName}`
  );

  const data = await response.json();
  console.log(data);
  const categorySec = document.getElementById("categoy-sec");
  categorySec.textContent = "";
  data.posts.forEach((item) => {
    const dis = item.title.replace(/['":]/g, "");
    console.log(dis);
    const div = document.createElement("div");
    div.innerHTML = `      
        <div class=" flex m-2 lg:w-[820px] h-[300px] rounded-xl gap-4 bg-[#F3F3F5] p-8">
                    <div class=" indicator w-20 h-20 bg-slate-600 rounded-lg">
                        <span class="indicator-item w-4 h-4 rounded-full ${
                          item.isActive ? "bg-green-600" : "bg-red-600"
                        } "></span> 
                        <img class="rounded-xl" src="${item.image}" alt="">
                    </div>
                    <div class="">
                        <div class="flex space-x-6">
                            <h4>#${item.category}</h4>
                            <h4>Author :${item.author.name}</h4>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 mt-3">${
                          item.title
                        }</h3>
                        <p class="m-2 lg:w-[600px] mx-auto">${
                          item.description
                        }</p>
                        <hr class="divide-dotted mt-5">
                        <div class="flex justify-between mt-6 ">
                            <div class="flex space-x-10">
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-message-2.svg" alt="">
                                    <h6>${item.comment_count}</h6>
                                </div>
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-eye.svg" alt="">
                                    <h6>${item.view_count}</h6>
                                </div>
                                <div class="flex space-x-2">
                                    <img src="./images/tabler-icon-clock-hour-9.svg" alt="">
                                    <h6>${item.posted_time}</h6>
                                </div>
                            </div>
                            <button onclick="check('${dis}',${
      item.view_count
    })" ><img src="./images/email 1.svg" alt=""></button>
                        </div>
                    </div>
                </div>
        `;
    categorySec.appendChild(div);
  });
};

const handelSearch = () => {
  const element = document.getElementById("search-box");
  const value = element.value;
  categoryMore(value);
  // if (value) {
  //     categoryMore(value)
  // }
  // else {
  //     alert("Please input Category")
  // }
};

loadCategory();

loadPost();

// categoryMore();
