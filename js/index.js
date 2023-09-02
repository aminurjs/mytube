const loadCategories = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    setCategories(data);
}
const setCategories = data =>{
    const categoryContainer = document.getElementById('category-container');
    data.data.forEach(category => {
        const div = document.createElement('div')
        div.innerHTML = `
                <button 
                    onclick="loadCard('${category.category_id}');sortBtn('${category.category_id}') "
                    class="btn btn-sm md:btn-md bg-gray-300 rounded text-color-black text-base md:text-lg normal-case">
                    ${category.category}
                </button>
        `;
        categoryContainer.appendChild(div);
    })
}
const sortBtn = id =>{
    const btnContainer = document.getElementById('sort-btn');
    btnContainer.textContent = '';
    btnContainer.innerHTML = `<button onclick="loadCard('${id}', true)" class="py-1 px-3 md:py-2 md:px-5 font-bold bg-gray-300 hover:bg-gray-200 rounded text-color-black text-base md:text-lg normal-case">Sort by view</button>`
}
const loadCard = async(id, sort = false) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    setCard(data, sort);
}

const setCard = (data, sort) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.textContent = '';
    const cards = data.data;
    const empty = document.getElementById('empty-container');
    if(!cards[0]){
        empty.classList.remove('hidden');
    }
    else{
        empty.classList.add('hidden');
    }
    if(sort == true){
        cards.sort((a,b)=>{
            return parseFloat(b.others.views) - parseFloat(a.others.views);
        })
    }
    cardContainer.classList.add('grid','grid-cols-1','md:grid-cols-2','lg:grid-cols-4','gap-6');
    cards.forEach(card => {
        const div = document.createElement('div')
        const minutesAll = card.others.posted_date / 60;
        const hours = minutesAll / 60;
        const minutes = minutesAll % 60;
        div.innerHTML = `
            <div class="card card-compact bg-base-100 shadow">
                <figure class="relative">
                    <img class="md:h-52 w-full" src="${card.thumbnail}" alt="Thumbnail" />
                    <p class="bg-[#171717] absolute right-4 bottom-3 rounded-md p-1 text-[10px] text-white ${card.others.posted_date !== '' ? '' : 'hidden'}">
                        ${Math.trunc(hours)} hrs ${Math.trunc(minutes)} min ago
                    </p>
                </figure>
                <div class="flex mt-3 gap-3 items-start p-2">
                <div class="w-1/6"><img class="w-12 h-12 rounded-full" src="${card.authors[0]?.profile_picture}" alt=""></div>
                <div class="w-5/6">
                    <h2 class="text-color-black text-base font-bold">${card.title}</h2>
                    <h3 class="text-sm text-gray-500">${card.authors[0]?.profile_name} <img class="${card.authors[0]?.verified == true ? 'inline-block' :'hidden'} w-4" src="./images/verified.png" alt=""></h3>
                    <p class="text-sm text-gray-500">${card.others.views}</p>
                </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    })
}

loadCard('1000')
loadCategories()