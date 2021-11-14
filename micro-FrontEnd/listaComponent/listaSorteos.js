'use strict'
/**
 * listaSorteos.js
 * Archivo js con la finalidad de realizar un micro-frondend donde se carguen los sorteos vigentes
 * para que de esta forma el usuario pueda realizar las diversas acciones.
 * @author: "La comunidad del anillo"
 * Fecha: 13 - 11 - 2021
 */

/**
 * Clase inicial para empezar con el micro-frondend
 * se configuran diversos elementos como el Fetch para los permisos.
 */
class ListaSorteos extends HTMLElement {
    #urlSorteos = 'http://localhost:3312/api/v1/sorteos/lista';
    #configFetch = {
        method: 'GET', 
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    constructor() {
        super();
        
    }
/**
 * ConnectedCallback para cargar todo en el shadow DOM
 */
    connectedCallback() {
        const shadow = this.attachShadow({mode:'open'});
        this.#render(shadow);
        this.#agregarSorteos(shadow);
        this.#agregarEventos(shadow);
        this.#agregarEstilos(shadow);
    }
    /**
     * método privado para pintar el esquema HTML que se utilizará como base.
     */
    #render(shadow) {
        shadow.innerHTML += `
        <body >
    <header>
        <nav class="navbar navbar-expand-lg  bg-gradient-faded-info">
            <div class="container d-flex justify-content-center">
                <h1 class="text-white">SORTEOS</h1>
            </div>
            <div class="container position-absolute d-flex justify-content-end">
                <button id="btnHistorico" type="button" class="btn btn-secondary btn-sm">Generar reporte <br> historico</button>
            </div>
        </nav>
    </header>
    <main class="bg-gray-200">
        <div  class="container p-4" >
            <ul id="lista" class="sorteo list-group ">
                
                
            </ul>
        </div>
    </main>
    `;
    }
/**
 * Se encarga de añadir a varios templates de los sorteos vigentes
 * mediante un forEach.
 */
    #listarSorteos(ulID,data){
        for(const x of data){
            ulID.innerHTML+=this.#setTemplate(x);
        };
    }

    /**
     * Método encargado de devolver un template html con los datos de un elemento
     * (sorteo) de la base de datos.
     * @param {*} data Sorteo a pintar
     * @returns Regresa un template para ser añadido posteriormente al @render().
     */
    #setTemplate(data){
        return `
        <li class="compSorteo list-group-item rounded-3 bg-gradient-info d-flex justify-content-between mb-1">
                    <div>
                        <figure>
                            <img class="imgSorteo rounded float-start img-fluid max-height-100" id="imgSorteo" src="/micro-FrontEnd/listaComponent/img/Imagen.png" alt="">
                        </figure>
                    </div>
                    <div class="tituloElemento text-center ">
                        <h2 class="text-white">${data.titulo}</h2> <h3 class="text-light">${data.estado}</h3>
                    </div>
                    <div class="botoneraElemento pt-4">
                        <button type="button" class="btn btn-primary btn-sm p-3" value="${data._id}" >Tablero</button>
                        <button type="button" class="btn btn-primary btn-sm" value="${data._id}">Generar<br> reporte Números</button>
                        <button type="button" class="btn btn-primary btn-sm" value="${data._id}">Generar <br> reporte deudores</button>
                    </div>
                </li>`;
    }
/**
 * Método encargado de añadirle el método oyente a los botones de cada
 * elemento de la lista.
 * @param {*} shadow shadow DOM
 */
    #agregarEventos(shadow){
        const botones = shadow.querySelectorAll(".botoneraElemento");
        botones.forEach(x=>{
            x.addEventListener("click",(event)=>this.#cambiarPantalla(event.path[0].value));
        })
    }
/**
 * Método encargado de dar el estilo CSS a los elemtos dentro dle ShadowDOM o micro-frondend
 * @param {*} shadow Shadow DOM.
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
 * Método encargado de obtener la lista de la base datos con los sorteos vigentes y guardarlos
 * en una cosntante llamada "data".
 * @param {*} shadow 
 */
    #agregarSorteos(shadow) {
        /*const data = 
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

        const tagLista = shadow.getElementById('lista');
        this.#listarSorteos(tagLista,data);
    */
         fetch(this.#urlSorteos,this.#configFetch)
         .then(response=> response.json())
         .then(data => {
             const tagLista = shadow.getElementById('lista');
             this.#listarSorteos(tagLista,data);
             })
             .catch(error=>console.log(error));
    }
/**
 * Se supone que cambia de pantalla pero realmente pinta una nueva pantalla
 * en base al ide seleccionado pero nose bien como, el Eliu lo explicará despues.
 * @param {*} id 
 */
    #cambiarPantalla(id){
        const lista = this.shadowRoot.host;
        
        //Limpia el contenido
        lista.shadowRoot.innerHTML = "";
        lista.outerHTML = `<sorteo-tablero sorteoId="${id}"></sorteo-tablero>`;
    }



}

window.customElements.define('sorteos-lista',ListaSorteos);


