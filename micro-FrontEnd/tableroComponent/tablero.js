'use strict'

class Tablero extends HTMLElement{
    #urlSorteos = 'http://localhost:3312/api/v1/sorteos/lista';
    #configFetch = {
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    constructor(){
        super();
    }

    connectedCallback() {
        const sorteoId = parseInt(this.getAttribute("sorteoId"));
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        //this.#agregarInfo(sorteoId)
        this.#agregarEstilos(shadow);
    }

    #render(shadow){
        shadow.innerHTML += `<header>
        <nav class="navbar navbar-expand bg-gradient-faded-info">
            <div class="container justify-content-start">
                <button id="btnReturn"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg></button>
                <div class="text-white ps-5">
                    <p>Fecha Inicio:</p>
                    <p id="FechaInicio">DD/MM/YYYY</p>
                </div>
            </div>
            <div class="container d-flex justify-content-center">
                <h1 id="nombreSorteo" class="text-white">SORTEO {Nombre}</h1>
            </div>
            <div class="container justify-content-end">
                <div class="text-white">
                    <p>Fecha Final:</p>
                    <p id="FechaFinal">DD/MM/YYYY</p>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div id="tablero" class="container p-4"> 
            <div id="porcentaje" class="progress h-auto">
                <!-- Textos inicio -->
                <div class="position-absolute d-inline-flex w-100 align-self-center" >
                    <div class="text-center w-40">
                        <h1 id="dineroActual" >$500.00</h1>
                        <p class="text-dark" >Recaudancion Actual</p>
                    </div>
                    <div  class="w-40 text-center">
                        <h1 id="dineroMeta">$1000.00</h1>
                        <p class="text-dark">Recaudacion Deseado</p>
                    </div>
                </div>
                <!-- Textos final -->
                <div id="barraTotal" class="progress-bar progress-bar-striped bg-success rounded-3 min-height-150 " role="progressbar" style="width: 50%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" >
                </div>  
            </div>
            <div>

            <div id="registroBoletos" class="container text-center   d-inline-flex pt-7">
                <div id="boletosTotales" class="w-25 rounded-3   bg-success height-300">
                    <div class="pt-7">
                        <h2 class="pb-4 ">Totales<h2>
                        <h3 id="pTotales">0</h3>
                    </div>
                </div>
                <div id="boletosDisponibles" class="w-25 rounded-3  bg-info height-300">
                    <div class="pt-7">
                        <h2 class="pb-4">Disponibles<h2>
                        <h3 id="pDisponibles">0</h3>
                    </div>
                </div>
                <div id="boletosApartados" class="w-25 rounded-3  bg-warning height-300">
                    <div class="pt-7">
                        <h2 class="pb-4">Apartados<h2>
                        <h3 id="pApartados">0</h3>
                    </div>
                </div>
                <div id="boletosComprados" class="w-25 rounded-3  bg-secondary height-300">
                    <div class="pt-7" >
                        <h2 class="pb-4">Comprados<h2>
                        <h3 id="pComprados" >0</h3>
                    </div>
                </div>
            </div>
        </div>
    </main>`;
    }

    #agregarInfo(shadow,sorteoId){
        const fInicio = shadow.querySelector('#FechaInicio');
        const nombre = shadow.querySelector('#nombreSorteo');
        const fFinal = shadow.querySelector('#FechaFinal');
        const dActual = shadow.querySelector('#dineroActual');
        const dMeta = shadow.querySelector('#dineroMeta');
        const pTotal = shadow.querySelector('#pTotales');
        const pDisp = shadow.querySelector("#pDisponibles");
        const pApar = shadow.querySelector('#pApartados');
        const pComp = shadow.querySelector('#pComprados');

        const sorteo = this.#getSorteos(sorteoId);

        fInicio.innerHTML = sorteo.fechaDeCreacion;
        nombre.innerHTML = sorteo.sorteo;
        fFinal.innerHTML = sorteo.fechaDeSorteo;
        dActual.innerHTML = "$"+sorteo.precio*sorteo.comprados+".00";
        dMeta.innerHTML = "$"+sorteo.precio*sorteo.totales+".00";
        pTotal.innerHTML = sorteo.totales;
        pDisp.innerHTML = sorteo.disponibles;
        pApar.innerHTML = sorteo.apartados;
        pComp.innerHTML = sorteo.comprados;

        const Meta = sorteo.totales;
        const Actual = sorteo.comprados;

        this.#setBarraActual(shadow,Meta,Actual);

    }

    #setBarraActual(shadow,Meta,Actual){
        const porcen = Meta-(Meta*Actual/Meta); 
        const barraTotal = shadow.getElementById('barraActual');
        barraTotal.style.width= `${porcen}%`;
    }

    #getSorteos(sorteoId){
        const dataSorteos = 
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

        const dataBoletos = [{
            id:1,
            sorteo:dataSorteos[0].nombre,
            precio:dataSorteos[0].precioDeNumeros,
            fechaDeCreacion:dataSorteos[0].fechaDeCreacion,
            fechaDeSorteo:dataSorteos[0].fechaDeSorteo,
            totales:(dataSorteos[0].rangoDeNumero.hasta - dataSorteos[0].rangoDeNumero.desde)+1,
            disponibles:50,
            apartados:5,
            comprados:50
        },{
            id:2,
            sorteo:dataSorteos[1].nombre,
            precio:dataSorteos[1].precioDeNumeros,
            fechaDeCreacion:dataSorteos[1].fechaDeCreacion,
            fechaDeSorteo:dataSorteos[1].fechaDeSorteo,
            totales:(dataSorteos[1].rangoDeNumero.hasta - dataSorteos[1].rangoDeNumero.desde)+1,
            disponibles:40,
            apartados:5,
            comprados:10
        },{
            id:3,
            sorteo:dataSorteos[2].nombre,
            precio:dataSorteos[2].precioDeNumeros,
            fechaDeCreacion:dataSorteos[2].fechaDeCreacion,
            fechaDeSorteo:dataSorteos[2].fechaDeSorteo,
            totales:(dataSorteos[2].rangoDeNumero.hasta - dataSorteos[2].rangoDeNumero.desde)+1,
            disponibles:70,
            apartados:5,
            comprados:5
        },
    ];

/*    fetch(this.#urlSorteos, this.#configFetch)
    .then(response => response.json())
    .then(data => {
        const tagLista = shadow.getElementById('lista');
        this.#listarSorteos(tagLista,data);
        })
        .catch(error=>console.log(error));        
        return dataBoletos[sorteoId];*/
    }

    #agregarEstilos(shadow){
        const linkFonts = document.createElement('link');
        linkFonts.setAttribute('rel', 'stylesheet');
        linkFonts.setAttribute('type','text/css');
        linkFonts.setAttribute("href", 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900|Roboto+Slab:400,700');
        const linkIcons = document.createElement('link');
        linkIcons.setAttribute('rel', 'stylesheet');
        linkIcons.setAttribute('href','./assets/css/nucleo-icons.css');
        const linkSvg = document.createElement('link');
        linkSvg.setAttribute('rel', 'stylesheet');
        linkSvg.setAttribute('href','./assets/css/nucleo-svg.css');
        const scrAwes =  document.createElement('script');
        scrAwes.setAttribute('src','https://kit.fontawesome.com/42d5adcbca.js')
        scrAwes.setAttribute('crossorigin','anonymous');
        const linkMater =  document.createElement('link');
        linkMater.setAttribute('rel','stylesheet');
        linkMater.setAttribute('href','https://fonts.googleapis.com/icon?family=Material+Icons+Round');
        const linkCSS = document.createElement('link');
        linkCSS.setAttribute('id','pagestyle');
        linkCSS.setAttribute('href',"./assets/css/material-dashboard.css?v=3.0.0");
        linkCSS.setAttribute('rel','stylesheet');
        
        shadow.appendChild(linkFonts);
        shadow.appendChild(linkIcons);
        shadow.appendChild(linkSvg);
        shadow.appendChild(linkMater);
        shadow.appendChild(linkCSS);
        shadow.appendChild(scrAwes);
    }


    


}


window.customElements.define('sorteo-tablero',Tablero);