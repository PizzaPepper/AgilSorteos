'use strict'
/**
 * numeros.js
 * Archivo js con el objetivo de encapsular un micro-frontend para 
 * pintar en el html un reporte de números de un sorteo especifico.
 * @author: "La comunidad del anillo"
 * Fecha: 14 - 11 - 2021
 */

/**
 * Clase inicial para empezar con el micro-frondend
 * se configuran diversos elementos como el Fetch para los permisos.
 */
class ReporteNumeros extends HTMLElement{
    #urlNumeros = 'http://localhost:3312/api/v1/reporte/numeros/';
    #urlTodos = this.#urlNumeros+"/todos/";
    #urlPagados = this.#urlNumeros+"/pagados/";
    #urlApartados = this.#urlNumeros+"/apartados/";
    #urlDisponibles = this.#urlNumeros+"/disponibles/";
    #urlTitulo = this.#urlNumeros+"/nombreSorteo/";
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
        this.#agregarEstilos(shadow);
        this.#agregarNumeros(shadow,sorteoId,"TODOS");
        this.#agregarTitulo(shadow,sorteoId); 
        this.#agregarEventosBotones(shadow,sorteoId);
    }
    /**
     * Método privado para pintar el html necesario para
     * visualizar el reporte de números
     */
    #render(shadow){    
        shadow.innerHTML = `
        <header>
        <!--Nav que funciona como la cabecera de la página.-->
        <nav class="navbar navbar-expand-lg bg-info">
            <!--Div encargado de contener el botón de return/volver de la página-->
            <div class="container position-absolute d-flex justify-content-start">
                <button id="btnReturn" class="btn btn-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"></path>
                  </svg></button>
            </div>
            <div class="container d-flex justify-content-center">
                <h1 id="nombreSorteo" class="text-white">SORTEO {Nombre}</h1>
            </div>
        </nav>
    </header>
    <main >
        <div class="container pt-3">
            <div id="tabla" class="d-inline-block w-80 overflow-y-scroll height-500">
                <div class="table-responsive ">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Numero</th>
                                <th scope="col">Estado</th>
                            </tr>
                        </thead>
                        <tbody id="filas">
                            <tr>
                                <td scope="row">1</td>
                                <td>Vendido</td>
                            </tr>
                            <tr>
                                <td scope="row">2</td>
                                <td>No Vendido</td>
                            </tr>
                            <tr>
                                <td scope="row">3</td>
                                <td>Apartado</td>
                            </tr>
                            <tr>
                                <td scope="row">4</td>
                                <td>Vendido</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div id="opciones" class="d-inline-block float-end" >
                <div class="botoneraElemento" >
                    <ul id="listaBotones"  class="list-inline ">
                        <li >
                            <button id="btnVisualizarTodos" type="button" 
                            class="btn btn-secondary btn-sm w-100">Visualizar
                                todos</button>
                        </li>
                        <li>
                            <button id="btnVisualizarApartados" type="button"
                                class="btn btn-secondary  btn-sm w-100">Visualizar apartados</button>
                        </li>
                        <li>
                            <button id="btnVisualizarVendidos" type="button" 
                            class="btn btn-secondary  btn-sm w-100">Visualizar
                                vendidos</button>
                        </li>
                        <li>
                            <button id="btnVisualizarNoVendidos" type="button"
                                class="btn btn-secondary  btn-sm w-100">Visualizar no vendidos</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
        `
    }
    
    /**
     * Método encargado de obtener una lista de números y una vez los obtiene
     * los agrega a la fila mediante el método agregarFila con un forEach
     */
    async #agregarNumeros(shadow,sorteoId,tipo){
        const filas = shadow.getElementById("filas");
        let dataNumeros = [];
        filas.innerHTML = "";
        switch(tipo){
            case "TODOS":
            dataNumeros = await this.#obtenerTodos(sorteoId);
            break;
            case "PAGADOS":
            dataNumeros = await this.#obtenerPagados(sorteoId);
            break;
            case "APARTADOS":
            dataNumeros = await this.#obtenerApartados(sorteoId);
            break;
            case "LIBRES":
            dataNumeros = await this.#obtenerDisponibles(sorteoId);
            break;
            default:
                alert("Tipo de ordenamiento desconocido");
                return;
        }

            dataNumeros.forEach(e=>{
                this.#agregarFila(filas,e);
            });
    }
    /**
     * Método encargado de pintar en el html una fila dentro de la tabla
     * con los datos que se le esten entregando ademas de dar un estilo a 
     * cada uno de las filas.
     */
    #agregarFila(div, dataNumero){        
        let tag =""; 
        if(dataNumero.estado === "LIBRE"){
            tag= `<td class="text-white" style="background-color: #cff099;">${dataNumero.estado}</td>`
        }
        else if(dataNumero.estado === "APARTADO"){
            tag= `<td class="text-white" style="background-color: gray;">${dataNumero.estado}</td>`
        }
        else if(dataNumero.estado === "PAGADO"){
            tag= `<td class="text-white" style="background-color: #f099C1;">${dataNumero.estado}</td>`
        }

        div.innerHTML += `
        <tr>
        <td scope="row">${dataNumero.numero}</td>
        ${tag}
        </tr>
        `;
    
    }
    /**
    * Este método se encarga de pintar en el html en la etiqueta con el id:nombreSorteo
    * el titulo del sorteo en cuestión.
    */
    async #agregarTitulo(shadow,sorteoId){
        const titulo = shadow.querySelector("#nombreSorteo");
        const datoTitulo = await this.#obtenerTitulo(sorteoId);
        titulo.innerHTML= `SORTEO ${datoTitulo.titulo}`
    }

    /**
     * Método encargado de dar estilo css en el #render
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
     * Método asincrono encargado de obtener un JSON de con todos los números
     * del sorteo en cuestión.
     */
    async #obtenerTodos(sorteoId){
        return await fetch(this.#urlTodos+sorteoId, this.#configFetch)
        .then(response => response.json());   
    }
    
    /**
     * Método asincrono encargado de obtener un JSON de con todos los números ya pagados
     * del sorteo en cuestión.
     */
    async #obtenerPagados(sorteoId){
        return await fetch(this.#urlPagados+sorteoId,this.#configFetch)
        .then(response => response.json());
    }
    /**
     * Método asincrono encargado de obtener un JSON de con todos los números apartados
     * del sorteo en cuestión.
     */
    async #obtenerApartados(sorteoId){
        return await fetch(this.#urlApartados+sorteoId,this.#configFetch)
        .then(response => response.json());
    }    
    /**
     * Método asincrono encargado de obtener un JSON de con todos los números disponibles
     * del sorteo en cuestión.
     */
    async #obtenerDisponibles(sorteoId){
        return await fetch(this.#urlDisponibles+sorteoId,this.#configFetch)
        .then(response => response.json());
    }
    /**
     * Método asincrono encargado de obtener un JSON con el titulo 
     * del sorteo en cuestión.
     */
    async #obtenerTitulo(sorteoId){
        return await fetch(this.#urlTitulo+sorteoId,this.#configFetch)
        .then(response => response.json());
    }
    /**
     * Método encargado de añadir el método oyende a los botones
     * de la pantalla
     */
    #agregarEventosBotones(shadow,sorteoId){
        const btnTodos = shadow.getElementById("btnVisualizarTodos");
        const btnApartados = shadow.getElementById("btnVisualizarApartados");
        const btnVendidos = shadow.getElementById("btnVisualizarVendidos");
        const btnNoVendidos = shadow.getElementById("btnVisualizarNoVendidos");
        
        btnTodos.addEventListener("click",()=>{this.#agregarNumeros(shadow,sorteoId,"TODOS")});
        btnApartados.addEventListener("click",()=>{this.#agregarNumeros(shadow,sorteoId,"APARTADOS")});
        btnVendidos.addEventListener("click",()=>{this.#agregarNumeros(shadow,sorteoId,"PAGADOS")});
        btnNoVendidos.addEventListener("click",()=>{this.#agregarNumeros(shadow,sorteoId,"LIBRES")});

        this.#agregarEventoRegresar(shadow);


    }
    /**
     * Método encargado de agregar el método oyente al botón de regreso
     */
    #agregarEventoRegresar(shadow){
        const btnRegresar = shadow.getElementById("btnReturn");
        btnRegresar.addEventListener("click",()=>this.#cambiarPantallaLista());
    }
    /**
     * Método encargado de regresar a la pantalla de listaSorteos.
     */
    #cambiarPantallaLista(){
        const lista = this.shadowRoot.host;
        //Limpia el contenido
        lista.shadowRoot.innerHTML = "";
        lista.outerHTML = `<sorteos-lista></sorteos-lista>`;
    }
}

window.customElements.define('reporte-numeros',ReporteNumeros);