let data=undefined;
let container=document.getElementsByClassName('container2')
container=container[0]

function renderData(){
    data.forEach(e=>{
        let price_change_24h = parseFloat(e.price_change_24h).toFixed(2);
        let symbolUpperCase = e.symbol.toUpperCase();

        // Create a new row element
        
        
        // Add content to the row
        container.innerHTML += `
                <div class='item'>
                <div class="coin-img">
                    <img src="${e.image}" alt="" style="width: 45px; height: 45px" />
                    <div class="coin-name">${e.name}</div>
                </div>
            
            <h5>${symbolUpperCase}</h5>
            <h5>${e.current_price}</h5>
            <h5>${e.total_volume}</h5>
            <h5>${price_change_24h}%</h5>
            <h5>Mkr Cap: ${e.market_cap}</h5>
        </div>`;
    })
}
async function fetching(){
    let promise=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    data=await promise.json()
    console.log(data)
    container.innerHTML=''
    renderData()
}

fetching()

async function sortByCap(){
    let promise=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    data=await promise.json()
    data.sort((a,b)=>{
        if(a.market_cap<b.market_cap) return 1
        else return -1
    })
    container.innerHTML=''
    renderData()
}

async function sortByPercentage(){
    let promise=await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
    data=await promise.json()
    data.sort((a,b)=>{
        let aPer = a.price_change_24h
        let bPer = b.price_change_24h
        if(aPer<bPer) return 1
        else return -1
    })
    container.innerHTML=''
    renderData()
}