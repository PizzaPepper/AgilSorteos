'use strict'
/**
 * tablero.js
 * Archivo js con la finalidad de pintar en el html un tablero de control con los datos de un
 * sorteo vigente que ha sido seleccionado de manera previa.
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

/**
 * Clase inicial para empezar con el micro-frondend
 * se configuran diversos elementos como el Fetch para los permisos.
 */

class Tablero extends HTMLElement{
    #urlSorteos = 'http://localhost:3312/api/v1/sorteos/lista/';
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
/**
 * ConnectedCallback para cargar todo en el shadow DOM
 */
    async connectedCallback() {
        const sorteoId = this.getAttribute("sorteoId");
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        this.#agregarEventoRegresar(shadow);
        this.#agregarEstilos(shadow);        
        await this.#agregarInfo(shadow,sorteoId);

    }
    /**
     * Método privado para pintar el html necesario para
     * visualizar el tablero de control
     */
    #render(shadow){
        shadow.innerHTML += `<header>
        <nav class="navbar navbar-expand bg-gradient-faded-info">
            <div class="container justify-content-start">
                <button id="btnReturn" class="btn btn-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"></path>
              </svg></button>
                <div class="text-white ps-5">
                    <p>Fecha Inicio:</p>
                    <p id="FechaInicio">DD/MM/YYYY</p>
                </div>
            </div>
            <div class="d-flex justify-content-center">
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
    /**
     * Método encargado de añadir los datos que se solicitan al tablero
     * en base a los datos recopilados anteriormente en la petición HTTP
     * y le añade el valor al elemento HTML que le corresponde.
     */
    async #agregarInfo(shadow,sorteoId){
        const fInicio = shadow.querySelector('#FechaInicio');
        const nombre = shadow.querySelector('#nombreSorteo');
        const fFinal = shadow.querySelector('#FechaFinal');
        const dActual = shadow.querySelector('#dineroActual');
        const dMeta = shadow.querySelector('#dineroMeta');
        const pTotal = shadow.querySelector('#pTotales');
        const pDisp = shadow.querySelector("#pDisponibles");
        const pApar = shadow.querySelector('#pApartados');
        const pComp = shadow.querySelector('#pComprados');
        const sorteo = await this.#consultarSorteo(sorteoId);
        fInicio.innerHTML = sorteo.fechaCreacion;
        nombre.innerHTML = sorteo.sorteo;
        fFinal.innerHTML = sorteo.fechaSorteo;
        dActual.innerHTML = "$"+sorteo.dineroActual+".00";
        dMeta.innerHTML = "$"+sorteo.dineroMeta+".00";
        pTotal.innerHTML = sorteo.totales;
        pDisp.innerHTML = sorteo.disponibles;
        pApar.innerHTML = sorteo.apartados;
        pComp.innerHTML = sorteo.pagados;        

        const Meta = sorteo.totales;
        const Actual = sorteo.pagados;

        this.#setBarraActual(shadow,Meta,Actual);
        
    }
    /**
    * Método encargado de cargar la barra de porcentaje en cuestión de la recaudación
    * actual mediante la formula: "(Xa / Xf) * 100"
    */
    #setBarraActual(shadow,Meta,Actual){

        const porcen = ((Actual/Meta) * 100)
        const barraTotal = shadow.querySelector('#barraTotal');
        barraTotal.style= `width: ${porcen}%`;
    }

    /**
    * Método encargado de realizar una petición HTTP a la url para obtener
    * el sorteo en cuestón de la BD.
    */
    async #consultarSorteo(sorteoId){
        return await fetch(this.#urlSorteos+sorteoId, this.#configFetch)
        .then(response => response.json());    
    }
    /**
    * Método encargado de añadir los estilos CSS a el #render.
    */
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

    #agregarEventoRegresar(shadow){
        const btnRegresar = shadow.getElementById("btnReturn");
        btnRegresar.addEventListener("click",()=>this.#cambiarPantallaLista());
    }
    #cambiarPantallaLista(){
        const lista = this.shadowRoot.host;
        //Limpia el contenido
        lista.shadowRoot.innerHTML = "";
        lista.outerHTML = `<sorteos-lista></sorteos-lista>`;
    }
}


window.customElements.define('sorteo-tablero',Tablero);