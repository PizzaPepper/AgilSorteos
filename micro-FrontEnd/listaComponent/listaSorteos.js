'use strict'

class ListaSorteos extends HTMLElement {
    
    #urlBootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
    #urlIntegrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3";
    #urlService = '#'
    #urlSorteos = '#'
    //integrity
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({mode:'open'});
        this.#render();
        const tagLista = this.shadowRoot.getElementById('lista');
        this.#listarSorteos(tagLista);
        this.#agregarEstilos();
        

    }

    #render() {
        this.shadowRoot.innerHTML += `
        <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="container position-absolute d-flex justify-content-start">
                <button id="btnReturn"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                  </svg></button>
            </div>
            <div class="container d-flex justify-content-center">
                <h1 class="text-white">SORTEOS</h1>
            </div>
            <div class="container position-absolute d-flex justify-content-end">
                <button id="btnHistorico" type="button" class="btn btn-secondary btn-sm">Generar reporte <br> historico</button>
            </div>
        </nav>
    </header>
    <main>
        <div  class="container p-4" >
            <ul id="lista" class="sorteo list-group ">

            </ul>
        </div>
    </main>
        `;
    }

    #listarSorteos(ulID){
        const data =this.#getDataSorteos();
        
        for (const x of data){
            ulID.innerHTML+=this.#setTemplate(x);
        };

    }

    
    #setTemplate(data){
        return `<li class="compSorteo list-group-item bg-info d-flex justify-content-between">
        <div>
            <figure>
                <img class="imgSorteo rounded float-left" id="imgSorteo" src="/micro-FrontEnd/listaComponent/img/Imagen.png" alt="">
            </figure>
        </div>
        <div class="tituloElemento">
            <h2>${data.nombre}</h2> <h3>${data.estado}</h3>
        </div>
        <div class="justify-content-center" class="text-xs-right" class="botoneraElemento align-items-center">
            <button type="button" value="${data.id}" class="btn btn-secondary btn-sm p-3">Tablero</button>
            <button type="button" value="${data.id}" class="btn btn-secondary btn-sm">Generar<br> reporte Números</button>
            <button type="button" value="${data.id}" class="btn btn-secondary btn-sm">Generar <br> reporte deudores</button>
        </div>
    </li>`;
    }


    #agregarEstilos() {
        
        const link_1 = document.createElement('link');
        link_1.setAttribute('rel', 'stylesheet');
        link_1.setAttribute("href", '/micro-FrontEnd/listaComponent/style/lista.css');
        
        const link_2 = document.createElement('link');
        link_2.setAttribute('rel', 'stylesheet');
        link_2.setAttribute("href", this.#urlBootstrap);
        link_2.setAttribute('integrity', this.#urlIntegrity);
        link_2.setAttribute('crossorigin', 'anonymous');
        
        this.shadowRoot.appendChild(link_2);
        this.shadowRoot.appendChild(link_1);
        
    }

    #getDataSorteos() {
        const data = 
            [{
                id: 1,
                rangoDeNumero:{desde:1,hasta:100},
                precioDeNumeros: 25.00,
                fechaInicioDeVenta: new Date(2021,11,11),
                fechaFinDeVenta: new Date(2021,11,29),
                fechaDeCreacion: new Date(2021,11,9),
                fechaDeSorteo: new Date(2021,12,1),
                diasLimiteApartado: 5,
                imagen: "/foo",
                nombre: "Cuatrimoto",
                descripcion: "foo descripcion",
                estado: "VIGENTE" 
            },
            {
                id: 2,
                rangoDeNumero:{desde:1,hasta:50},
                precioDeNumeros: 15.00,
                fechaInicioDeVenta: new Date(2021,11,12),
                fechaFinDeVenta: new Date(2021,12,5),
                fechaDeCreacion: new Date(2021,11,10),
                fechaDeSorteo: new Date(2021,12,7),
                diasLimiteApartado: 4,
                imagen: "/foo2",
                nombre: "Narco Lancha",
                descripcion: "foo descripcion",
                estado: "VIGENTE" 
            },
            {
                id: 3,
                rangoDeNumero:{desde:1,hasta:75},
                precioDeNumeros: 50.00,
                fechaInicioDeVenta: new Date(2021,11,13),
                fechaFinDeVenta: new Date(2021,12,8),
                fechaDeCreacion: new Date(2021,11,7),
                fechaDeSorteo: new Date(2021,12,10),
                diasLimiteApartado: 3,
                imagen: "/foo2",
                nombre: "Caja de Yakul 1lt",
                descripcion: "foo descripcion",
                estado: "VIGENTE" 
            }
        ];

        return data;
    }

}

window.customElements.define('sorteos-info',ListaSorteos);


