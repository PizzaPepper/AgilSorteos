'use strict'
/**
 * listaSorteos.js
 * Archivo js con la finalidad de realizar un micro-frondend donde se carguen los deudores
 * para que de esta forma el usuario pueda visualizarlos.
 * @author: "La comunidad del anillo"
 * Fecha: 03 - 12 - 2021
 */

/**
 * Clase inicial para empezar con el micro-frondend
 * se configuran diversos elementos como el Fetch para los permisos.
 */
class ReporteDeudores extends HTMLElement{
    #urlClientes = 'http://localhost:3312/api/v1/reporte/clientes/apartados/';
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
    async connectedCallback(){
        const sorteoId = this.getAttribute("sorteoId");
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        this.#agregarEstilos(shadow);
        this.#listarDeudores(shadow,sorteoId);  
        this.#agregarEventos(shadow);      
    }

    /**
     * Método privado para pintar el html necesario para
     * visualizar el reporte deudores.
     */
    #render(shadow){
        shadow.innerHTML = `
        <header>
        <nav class="navbar navbar-expand-lg bg-info">
            <div class="container position-absolute d-flex justify-content-start">
                <button id="btnReturn" class="btn btn-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"></path>
                </svg></button>
            </div>
            <div class="container d-flex justify-content-center">
                <h1 id="nombreSorteo" class="text-white">SORTEO</h1>
            </div>
        </nav>
    </header>
    <main class="d-flex flex-column" >
        
        <div class="container pt-3">
            <div id="tabla" class="overflow-auto max-height-vh-70" >
                <div class="table-responsive" >
                    <table class="table"  >
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Numero</th>
                                <th scope="col">Fecha Movimiento</th>
                                <th scope="col">Fecha Expiracion</th>
                            </tr>
                        </thead>
                        <tbody id="datosDeudores" >
                            
                        </tbody>
                    </table>
                    </div>
                </div>
                
            </div>
        </div>
    </main>
        <footer>
            <div class="text-center">
                <h4>Total deudores: <p class="d-inline text-2xl" id="numDeudores">0</p></h4>
                <h4>Total deuda: <p class="d-inline text-2xl" id="cantDeuda">$0</p></h4>
            </div>
        </footer>
        `;
    }

    /**
     * Método encargado de pintar en el shadow una lista de
     * deudores obtenidos mediante una petición HTTP.
     */
    async #listarDeudores(shadow,sorteoId){
        const data = await this.#obtenerDeudores(sorteoId);
       
        const tbody = shadow.getElementById("datosDeudores");
        const textDeudores = shadow.getElementById("numDeudores");
        const textCantDeuda = shadow.getElementById("cantDeuda");
        const textTitulo = shadow.getElementById("nombreSorteo");

        for (const x of data.clientes){
            tbody.innerHTML += this.#setTemplate(x);  
        }

        textDeudores.innerHTML = data.numDeudores;
        textCantDeuda.innerHTML = data.adeudoTotal;
        textTitulo.inneHTML = data.tituloSorteo;
    }

    /**
     * Agrega un evento a los botones en el "HTML" y le añade su función.
     */
    #agregarEventos(shadow){
        const btnRegresar = shadow.getElementById("btnReturn");
        btnRegresar.addEventListener("click",()=>this.#cambiarPantallaLista());        
    }

    /**
     * Método encargado de estilizar toda la página o "micro-frontend"
     */
    #agregarEstilos(shadow) {        
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
    
    /**
     * Método encargado de regresar una fila para la tabla del render
     * con los datos personalizados de un deudor.
     */
    #setTemplate(data){
        return `
        <tr>
            <td scope="row">${data.nombreCliente}</td>
            <td scope="row">${data.numero}</td>
            <td scope="row">${data.fechaMovimiento}</td>
            <td scope="row">${data.fechaVencimiento}</td>
        </tr>
        `
    }

    /**
     * Método asincrono encargado de realizar una petición HTTP GET al routing
     * para obtener una lista de deudores de un sorteo especifico.
     */
    async #obtenerDeudores(sorteoId){
        return await fetch(this.#urlClientes+sorteoId,this.#configFetch)
        .then(response=> response.json());
    }

    /**
     * Método encargado de cambiar la pantalla actual al micro-frontend
     */
    #cambiarPantallaLista(){
        const lista = this.shadowRoot.host;
        //Limpia el contenido
        lista.shadowRoot.innerHTML = "";
        lista.outerHTML = `<sorteos-lista></sorteos-lista>`;
    }
}

window.customElements.define('reporte-deudores',ReporteDeudores);