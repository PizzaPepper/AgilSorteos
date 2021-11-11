'use strict'

class Tablero extends HTMLElement{
    #urlBootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
    #urlIntegrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3";
    #urlService = '#'
    #urlSorteos = '#'

    constructor(){
        super();
    }

    connectedCallback() {
        const sorteoId = parseInt(this.getAttribute("sorteoId"));

        this.attachShadow({mode:'open'});
        this.#render();
        this.#agregarInfo(sorteoId)
        this.#agregarEstilos();
    }

    #render(){
        this.shadowRoot.innerHTML += `<header>
        <nav class="navbar navbar-expand-lg navbar-light bg-primary">
            <div class="container justify-content-start">
                <button id="btnReturn"> <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                </svg></button>
                <div class="text-white">
                    <p>Fecha Inicio:</p>
                    <p id="FechaInicio">DD/MM/YYYY</p>
                </div>
            </div>
            <div class="container d-flex justify-content-center">
                <h1 id="nombreSorteo" class="text-white">SORTEO {Nombre}</h1>
            </div>
            <div class="container   justify-content-end">
                <div class="text-white">
                    <p>Fecha Final:</p>
                    <p id="FechaFinal">DD/MM/YYYY</p>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div id="tablero" class="container p-4"> 
            <div id="porcentaje" class="container">
                <div id="barraTotal" >
                    <div id="areaTexto" >
                        <div id="izq" >
                            <h1  id="dineroActual">$500.00</h1>
                            <p>Recaudancion Actual</p>
                        </div>
                        <div id="der">
                            <h1  id="dineroMeta" >$1000.00</h1>
                            <p>Recaudacion Deseado</p>
                        </div>
                    </div>
                    <div id="barraActual"></div>
                </div>  
            </div>
            <div id="registroBoletos" class="container">
                <div id="boletosTotales" class="cuadroInfo">
                    <div class="datosCuadros">
                        <h2>Totales<h2>
                        <p id="pTotales">0</p>
                    </div>
                </div>
                <div id="boletosDisponibles" class="cuadroInfo">
                    <div class="datosCuadros">
                        <h2>Disponibles<h2>
                        <p id="pDisponibles">0</p>
                    </div>
                </div>
                <div id="boletosApartados" class="cuadroInfo">
                    <div class="datosCuadros">
                        <h2>Apartados<h2>
                        <p id="pApartados">0</p>
                    </div>
                </div>
                <div id="boletosComprados" class="cuadroInfo">
                    <div class="datosCuadros">
                        <h2>Comprados<h2>
                        <p id="pComprados">0</p>
                    </div>
                </div>
            </div>
        </div>
    </main>`;
    }

    #agregarInfo(sorteoId){
        const fInicio = this.shadowRoot.querySelector('#FechaInicio');
        const nombre = this.shadowRoot.querySelector('#nombreSorteo');
        const fFinal = this.shadowRoot.querySelector('#FechaFinal');
        const dActual = this.shadowRoot.querySelector('#dineroActual');
        const dMeta = this.shadowRoot.querySelector('#dineroMeta');
        const pTotal = this.shadowRoot.querySelector('#pTotales');
        const pDisp = this.shadowRoot.querySelector("#pDisponibles");
        const pApar = this.shadowRoot.querySelector('#pApartados');
        const pComp = this.shadowRoot.querySelector('#pComprados');

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

        this.#setBarraActual(Meta,Actual);

    }

    #setBarraActual(Meta,Actual){
        const porcen = Meta-(Meta*Actual/Meta); 
        const barraTotal = this.shadowRoot.getElementById('barraActual');
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

        
        return dataBoletos[sorteoId];
    }

    #agregarEstilos(){
        const link_1 = document.createElement('link');
        link_1.setAttribute('rel','stylesheet');
        link_1.setAttribute("href",'/micro-FrontEnd/tableroComponent/style/tablero.css');

        const link_2 = document.createElement('link');
        link_2.setAttribute('rel', 'stylesheet');
        link_2.setAttribute("href", this.#urlBootstrap);
        link_2.setAttribute('integrity', this.#urlIntegrity);
        link_2.setAttribute('crossorigin', 'anonymous');

        this.shadowRoot.appendChild(link_1);
        this.shadowRoot.appendChild(link_2);
    }
    


}


window.customElements.define('sorteo-tablero',Tablero);