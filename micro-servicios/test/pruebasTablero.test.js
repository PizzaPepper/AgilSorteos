const fetch = require('cross-fetch');



// fetch("http://localhost:3312/api/v1/sorteos/lista/618c71b24fffe30e88c60c6f").then(res=>res.json()).then(data=>{
// console.log(data);
// });
describe("Plan de tablero de un sorteo",()=>{
    test("Que solo muestre la informacion de tablero de un sorteo", (done) => {
        fetch("http://localhost:3312/api/v1/sorteos/lista/618c71b24fffe30e88c60c6f").then(res => res.json())
            .then(data => {
                expect(data.sorteo).toBe("Cuatrimoto");
                done();
            });
    });

});



// fetch("http://localhost:3312/api/v1/reporte/numeros/todos/618c71b24fffe30e88c60c6f").then(res=>res.json()).then(data=>{
//     console.log(data);
// });

// fetch("http://localhost:3312/api/v1/reporte/numeros/apartados/618c71b24fffe30e88c60c6f").then(res=>res.json()).then(data=>{
//    console.log(data);
// });

// fetch("http://localhost:3312/api/v1/reporte/numeros/pagados/618c71b24fffe30e88c60c6f").then(res=>res.json()).then(data=>{
//   console.log(data);
// });

// fetch("http://localhost:3312/api/v1/reporte/numeros/disponibles/618c71b24fffe30e88c60c6f").then(res=>res.json()).then(data=>{
//    console.log(data);
// });