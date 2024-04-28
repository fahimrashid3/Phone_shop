const loadPhone = async (searchText)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const dataList = await res.json();
    const phones = dataList.data;
    displayPhons(phones);
    // console.log(phones);
}

const displayPhons = phones=>{
    // console.log(phones);

    const phoneContainer =document.getElementById('phone-container')
    phoneContainer.innerHTML='';

    phones.forEach(phone =>{
        // create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-xl mt-10`;
        phoneCard.innerHTML =`
        <figure><img src=${phone.image} alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="text-center font-bold text-2xl">${phone.phone_name}</h2>
          <p class="text-center">${phone.slug}</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary mt-5">Buy Now</button>
          </div>
        </div> `
        phoneContainer.appendChild(phoneCard);
    })

}

// loadPhone();

// search handler 
 
const searchHandler= () =>{

  const searchInputField=document.getElementById('search_input');
  const searchItem=searchInputField.value;
  console.log(searchItem);
  loadPhone(searchItem);

}


