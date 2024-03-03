
const spinner = document.getElementById('loading-spinner');
const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
        fetch(url)
            .then((res) => res.json())
            .then((data) => displayCard(data.posts))
}

const displayCard = (data) => {
    console.log(data)
    const letsDiscus = document.getElementById('lets-discus')
    let active;
   letsDiscus.innerHTML = '';
    data.forEach((card) =>{
       
        if(card.isActive === true){
            active = `<div id="active" class="bg-[#10B981] w-[18px] h-[18px] rounded-full -top-1 -right-1 absolute"></div>`
         }else{
           active=  `<div id="active" class="bg-red-500 w-[18px] h-[18px] rounded-full -top-1 -right-1 absolute"></div>`
         }

        
        let cardQuote = card.title.replace("'", '');
        
        const div = document.createElement('div');
        
       
        div.innerHTML = `
        <div class="flex bg-[#F3F3F5] font-[font-inter] rounded-3xl p-5 lg:p-10 w-[370px] mx-auto lg:w-[772px] gap-6">
            <div class=" w-[72px] relative  h-[72px]">
            <img class="rounded-2xl" src="${card.image}">
            ${active}
            </div>
            <div class="lg:w-[669px]">
                <div class="flex gap-5 text-[#12132DCC] font-medium">
                <p># ${card.category}</p>
                <p>Author: ${card.author.name}</p>
                </div>
                <h3 class="text-[20px] font-[font-mulish] font-bold text-[#12132D] mt-3">${card.title}</h3>
                <p class="text=[#12132D99] mt-4">${card.description}</p>
                <hr class="border-dashed my-5 border-[#12132D3F]">
                <div class="flex justify-between ">
                    <div class="flex gap-2 lg:gap-6 w-full">
                    <p class="flex  lg:gap-3"><img  src="images/sms.png" alt=""> ${card.comment_count}</p>
                    <p class="flex  lg:gap-3"><img src="images/eye.png" alt=""> ${card.view_count}</p>
                    <p class="flex  lg:gap-3"><img src="images/time.png" alt=""> ${card.posted_time} min</p>
                    </div>
                   <div class="bg-[#10B981] rounded-full px-2">
                   <button onclick="handleCartCount('${cardQuote}','${card.view_count}')" class="  text-white  "><i class="fa-solid fa-envelope-open"></i></button>
                   </div>
                </div>
            </div>
        </div>
        `
        
        letsDiscus.appendChild(div);
        showLoadingSpinner(false);
    
    })
    
}
    
const handleCartCount = (cardTitle,viewCount) =>{
    const cartCount = document.getElementById('cart-count');
    let countText = cartCount.innerText
    let count = parseInt(countText) + 1;
    cartCount.innerText =count;
 

    const rightCard = document.getElementById('right-card');
    const div2 = document.createElement('div');
    div2.classList.add('bg-white')
    div2.classList.add('flex')
    div2.classList.add('justify-between')
    div2.classList.add('items-center')
    div2.classList.add('p-4')
    div2.classList.add('rounded-2xl')
    div2.innerHTML = `
        <h4 class="font-semibold text-[#12132D] font-[font-mulish]">${cardTitle}</h4>
        <p class="grid grid-cols-2 font-[font-inter] gap-2"><img src="images/eye.png" alt=""> ${viewCount}</p>
    `;
    rightCard.appendChild(div2);
   
}

const handlePostsData = () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
    fetch(url)
        .then((res) => res.json())
        .then((data) => showPostsCard(data))
}

const showPostsCard = (data) =>{
  
    let publishDate;
    let designation;
    data.forEach((card) =>{
       
        if(card.author.posted_date){
            publishDate = `<p class="text-[#12132D99]">  ${card.author.posted_date}</p>`
        }else{
            publishDate = "No publish date"
        }

        if(card.author.designation){
            designation = `<p class="text-[#12132D99]">${card.author.designation}</p>`
        }else{
            designation = "Unknown"
        }

   
        const latestPostsCards = document.getElementById('latest-post-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-full bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${card.cover_image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body ">
            <div class="flex items-center gap-2">
            <i class="fa-regular fa-calendar"></i> ${publishDate}
            </div>
          <h2 class="card-title font-extrabold text-[#12132D] text-[18px]">${card.title}</h2>
          <p class="text-[#12132D99]">${card.description}</p>
          <div class="card-actions flex">
            <img class="w-[44px] rounded-full" src="${card.profile_image}">
            <div>
                <p class="font-bold text-[#12132D]">${card.author.name}</p>
                ${designation}
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
        `;
        latestPostsCards.appendChild(div);
    })
}


const handleSearchBar =  async(loading) =>{
    showLoadingSpinner(loading);
    const searchInput = document.getElementById('input-field');
    const value = searchInput.value;
    searchInput.value = '';
    console.log(value)
    
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${value}`
        const fet =await fetch(url)
            const res = await fet.json()
            const data =res.posts
            console.log(data)
            setTimeout(() => {
                spinner.classList.add('hidden')
                displayCard(data)
            }, 2000);
          
  
}

const showLoadingSpinner = (value) =>{
    
   if(value === true){
        spinner.classList.remove('hidden')
       
   }
}


handlePostsData()
loadData();