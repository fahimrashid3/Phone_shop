const loadPhone = async (searchText = 13, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const dataList = await res.json();
  const phones = dataList.data;
  displayPhons(phones, isShowAll);
  // console.log(isShowAll);
};

const displayPhons = (phones, isShowAll) => {
  // console.log(phones);

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAllBtn = document.getElementById("show_all");
  if (phones.length > 12) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }

  // toggle loading dots control hide
  // const toggleLoadingDots=document.getElementById('loading_dots');
  // toggleLoadingDots.classList.add('hidden')

  phones.forEach((phone) => {
    // create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl mt-10`;
    phoneCard.innerHTML = `
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="text-center font-bold text-2xl">${phone.phone_name}</h2>
          <p class="text-center">${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="handelShowDetails('${phone.slug}')" class="btn btn-primary mt-5">Show details</button>
          </div>
        </div> `;
    phoneContainer.appendChild(phoneCard);
  });
  // hight loading spinner
  // toggleLoadingDots(false);
};

loadPhone();

// search handler

const searchHandler = (isShowAll) => {
  // toggleLoadingDots(true);
  const searchInputField = document.getElementById("search_input");
  const searchItem = searchInputField.value;
  // console.log(searchItem);
  loadPhone(searchItem, isShowAll);
};

// loading Spinner control
const toggleLoadingDots = (isLoading) => {
  if (isLoading) {
    const loadingSpinner = document.getElementById("loading_dots");
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

// handel show_all section
const handelShowAll = () => {
  searchHandler(true);
};

// handel show details click

const handelShowDetails = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  // load img
  const modalField = document.getElementById("modal_field");
  modalField.innerHTML = `<img src=${phone.image} alt="Phone Img" />
  <h3 class="font-bold text-lg">${phone.name};</h3>
<h2 class="font-bold text-2lg">${phone.brand}</h2>
<h3 class="font-semibold text-sm">${phone.mainFeatures.storage}</h3>
<h3 class="font-semibold text-sm">${phone.mainFeatures.displaySize}</h3>
  `;

  phoneSDisplayField.innerText = phone.mainFeatures.displaySize;
  // show the modal
  show_modal.showModal();

  console.log(phone);
};
