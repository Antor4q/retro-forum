const loadData = () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
        fetch(url)
            .then((res) => res.json())
            .then((data) => displayCard(data.posts))
}

const displayCard = (data) => {
    // console.log(data)
    const letsDiscus = document.getElementById('lets-discus')
    let active;
   
    data.forEach((card) =>{
        if(card.isActive === true){
            active = `<div id="active" class="bg-[#10B981] w-[18px] h-[18px] rounded-full -top-1 -right-1 absolute"></div>`
         }else{
           active=  `<div id="active" class="bg-red-500 w-[18px] h-[18px] rounded-full -top-1 -right-1 absolute"></div>`
         }

        console.log(card)
        const div = document.createElement('div');
        console.log(card.isActive)
       
        div.innerHTML = `
        <div class="flex bg-[#F3F3F5] rounded-3xl lg:p-10 w-[772px] gap-6">
            <div class=" w-[72px] relative  h-[72px]">
            <img class="rounded-2xl" src="${card.image}">
            ${active}
            </div>
            <div class="w-[669px]">
                <div class="flex gap-5 text-[#12132DCC] font-medium">
                <p># ${card.category}</p>
                <p>Author: ${card.author.name}</p>
                </div>
                <h3 class="text-[20px] font-bold text-[#12132D] mt-3">${card.title}</h3>
                <p class="text=[#12132D99] mt-4">${card.description}</p>
                <hr class="border-dashed my-5 border-[#12132D3F]">
                <div class="flex justify-between">
                    <div class="flex  gap-6">
                    <p class="flex gap-3"><img  src="images/sms.png" alt=""> ${card.comment_count}</p>
                    <p class="flex gap-3"><img src="images/eye.png" alt=""> ${card.view_count}</p>
                    <p class="flex gap-3"><img src="images/time.png" alt=""> ${card.posted_time} min</p>
                    </div>
                   <div class="bg-[#10B981] rounded-full px-2">
                   <button onclick="handleCartCount('${card.title}')" class="  text-white  "><i class="fa-solid fa-envelope-open"></i></button>
                   </div>
                </div>
            </div>
        </div>
        `
        
        letsDiscus.appendChild(div);
    
    
    })
    
}
    let sum = 1;
const handleCartCount = (cardTitle,viewCount) =>{
    const cartCount = document.getElementById('cart-count');
    let count = cartCount.innerText
    sum = parseInt(count) + sum;
    cartCount.innerText =sum;
    console.log("it's card title:", cardTitle, "it's view:", viewCount)
   
}


loadData();