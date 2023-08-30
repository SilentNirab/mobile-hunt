const loadPhone = async (searchText = '13' , isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}



const displayPhones = (phones , isShowAll) => {

  const phoneContainer = document.getElementById('phone-container');

  phoneContainer.textContent = '';


 
  // show all phone button 
  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden')
  }else{
    showAllContainer.classList.add('hidden');
  }
 // display only 12 phones
  if (!isShowAll) {
    phones = phones.slice(0 , 12);
  }

    phones.forEach(phone => {
      
        const phoneCard = document.createElement("div");
        phoneCard.classList = 'card w-96 bg-base-100 shadow-xl';
        phoneCard.innerHTML = `
        <figure><img class=" p-5" src="${phone.image}" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}'); show_modal.showModal()" class="btn btn-primary" onclick="">Show Details</button>
          </div>
        </div>         
        `;
        phoneContainer.appendChild(phoneCard);
     })

     toggleSpinner(false);
     
}
const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    
    phoneDetailShow(phone);
}

const phoneDetailShow = (phone) =>{
  console.log(phone);
  const phoneDetailContainer = document.getElementById('show-phone-details');
  phoneDetailContainer.classList = `flex flex-col justify-center items-center`
  phoneDetailContainer.innerHTML = `
      <figure><img class=" p-5" src="${phone.image}" /></figure> 
      <h2 class="card-title">${phone.name}</h2>
      <h3">Storage : ${phone.mainFeatures.storage}</h3> <br />
      <h3">Sensors : ${phone.mainFeatures.sensors}</h3> <br />
      <h3">ReleaseDate : ${phone?.releaseDate}</h3> 
 `;
  
}

const handleSearch = (isShowAll) =>{
 toggleSpinner(true);
 const searchField = document.getElementById('search-field');
 const searchText = searchField.value;
 loadPhone(searchText , isShowAll);
}

const toggleSpinner = (isLoding) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if (isLoding) {
    loadingSpinner.classList.remove('hidden')
  }
  else{
    loadingSpinner.classList.add('hidden')
  }
}
const handleShowAll = () => {
  handleSearch(true);
}

loadPhone();