function mostrarResults(results){
    const contenedor = document.querySelector(".results");
    const template = document.querySelector("#template-item");

    for (const r of results) {
        const titleEl = template.content.querySelector(".titleProd");
        titleEl.textContent = r.title;

        const estadoEl = template.content.querySelector(".estadoProd")
        estadoEl.textContent = r.condition;

        const vendidosEl = template.content.querySelector(".prodVendidos")
        vendidosEl.textContent = r.sold_quantity;

        const priceEl = template.content.querySelector(".price")
        priceEl.textContent = "$"+r.price;

        const imgEl = template.content.querySelector(".imgProd")
        imgEl.src = r.thumbnail;

        const linkEl = template.content.querySelector(".link")
        linkEl.href = r.permalink;

        const clone = document.importNode(template.content, true);
        contenedor.appendChild(clone);
        
    }
}

function borrarResults(results){
    const contenedor = document.querySelector(".results");
    const buttonEl = document.querySelector(".boton");

    buttonEl.addEventListener("click", () => contenedor.innerHTML = "");
    }


function main(){
    const formEl = document.querySelector(".form")
    formEl.addEventListener("submit",  function(e){
        e.preventDefault();
        const dat = e.target.search.value;
        fetch("https://api.mercadolibre.com/sites/MLA/search?q="+dat).then((promise) => {
            promise.json().then((data) => {
                mostrarResults(data.results);
                borrarResults(data.results)
            })
        })
    })
}

main()