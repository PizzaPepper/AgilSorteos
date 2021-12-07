const fetch = require('cross-fetch');

describe("Plan de listas de sorteos",()=>{


// fetch("http://localhost:3312/api/v1/sorteos/lista").then(res=>res.json()).then(data=>{
//    console.log(data);
// });
test("Obtener almenos un sorteo",(done)=>{
  fetch("http://localhost:3312/api/v1/sorteos/lista").then(res=>res.json()).then(data=>{
    expect(data.length).toBeGreaterThanOrEqual(1);
    done();
  });
});

// fetch("http://localhost:3312/api/v1/sorteos/listaVigentes").then(res=>res.json()).then(data=>{
//  console.log(data);
// });
test("Que solo muestren los sorteos vigentes", (done)=>{
  fetch("http://localhost:3312/api/v1/sorteos/listaVigentes").then(res=>res.json()).then(data=>{
    let check = true;

    for(x of data){
      if(x.estadoSorteo!="VIGENTE")
      check = false;
    }

    expect(check).toBe(true);
    done();
  });
});
// fetch("http://localhost:3312/api/v1/sorteos/listaEspera").then(res=>res.json()).then(data=>{
//   console.log(data);
// });
test("Que solo muestren los sorteos en espera", (done)=>{
  fetch("http://localhost:3312/api/v1/sorteos/listaEspera").then(res=>res.json()).then(data=>{
    let check = true;

    for(x of data){
      if(x.estadoSorteo!="ESPERA")
      check = false;
    }

    expect(check).toBe(true);
    done();
  });
});

// fetch("http://localhost:3312/api/v1/sorteos/listaTerminados").then(res=>res.json()).then(data=>{
//     console.log(data);
// });

test("Que solo muestren los sorteos terminados", (done)=>{
  fetch("http://localhost:3312/api/v1/sorteos/listaTerminados").then(res=>res.json()).then(data=>{
    let check = true;

    for(x of data){
      if(x.estadoSorteo!="TERMINADO")
      check = false;
    }

    expect(check).toBe(true);
     done();
  });
});

})
