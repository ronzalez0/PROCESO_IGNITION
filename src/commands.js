
const {program} =require('commander')
global.XMLHttpRequest = require('xhr2');

//const { prompt } = require('inquirer')
//const prompt=require("prompt-sync")({sigint:true}); 

const {addCliente} = require('./controllers/tacks.controller')

program.version("0.0.1").description("PROCESO QUE CARGA LOS DATOS MONGODB")

var xhr = new XMLHttpRequest();

var xhr1 = new XMLHttpRequest();

program.command("save").action(() => {
    
  /* const answers =  prompt([
        {
            type:'input',
            message:'Task title',
            name:'title'
        }
    ]);*/

    const can =  [
        {
            unit_id: 'A',
            speed: 'B',
            mileage:  'C',
            last_update:  'D',
            ignition_total_time:  'F'
        }
    ];

    //let ignitions= 

 let fechaHoy=new Date;
 console.log('FECHA DE HOY',fechaHoy)  
 
 
 let listaApiCan =   ['https://www.telematicsadvance.com/api/v1/unit/list.json?key=783e78e479c1f371c84a4055d54963d93a575e1e'];
 let listaIgnitions =   ['https://www.telematicsadvance.com/api/v1/unit_data/ignitions.json?key=783e78e479c1f371c84a4055d54963d93a575e1e&till=2024-10-01T23:59:59Z&from=2024-09-01T00:00:59Z&limit=150'];
 let listaUnidades=[];
 let result=[];

// QUALITY POST
xhr1.onload = function () {
    // Procesamos y validamos la respuesta del servidor: 200 OK o 300 redirect lo cual es una respuesta desde el servidor a nuestra consulta 
    if (xhr1.status >= 200 && xhr1.status < 300) {

      /*  k=0;
        while(k<listaUnidades.length){
            console.log(listaUnidades[k]);
            k=k+1;
        } */

        
       // if(Object.keys((JSON.parse(xhr.response)["data"]["units"])).length>0){   

            i=0;      
            k=0;
            while (i<Object.keys((JSON.parse(xhr.response)["data"]["units"])).length){
            //   console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"][i].unit_id , "  ", i);
                if(JSON.parse(xhr.response)["data"]["units"][i].ignitions.length>0){
                    if (JSON.parse(xhr.response)["data"]["units"][i].ignitions[JSON.parse(xhr.response)["data"]["units"][i].ignitions.length-1].off==null){
                        console.log('UNIDAD!', JSON.parse(xhr.response)["data"]["units"][i].unit_id , "  ", i);
                        console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"][i].ignitions[JSON.parse(xhr.response)["data"]["units"][i].ignitions.length-1].off, "  ",i);
                       
                        result[k]=JSON.parse(xhr1.response)["data"]["units"].filter((word) => word.unit_id == JSON.parse(xhr.response)["data"]["units"][i].unit_id )[0];
                        //addCliente(result);          
                    
                        console.log ("ESTE ES EL OBJETO A GUARDAR: ",result[k]);                       
                           k=k+1;
                    } //colocar un else si se rerquere medir la distancia en metros.  
                } else {
                    console.log("la unidad del cliente no reporta datos:" , JSON.parse(xhr.response)["data"]["units"][i].unit_id );
                }   
                // listaUnidades[i]=JSON.parse(xhr.response)["data"]["units"][i].unit_id;
            
                // GUARDAR SÓLO LOS NULLOS de xhr1, UNIDADES CON MOTOR ENCENDIUDO



            i=i+1;
            }

        console.log("OBJETO COMPLETO:",result);

            addCliente(result)
            
       // }else{
        //    console.log("Las unidades del cliente no reportan datos.")    
        //}

       // console.log ("LO QUE SE VA  A GUARDAR", JSON.parse(xhr1.response)["data"]["units"]);

        // que hacer con la respuesta del servidor 
     // addCliente(JSON.parse(xhr1.response)["data"]["units"])
      
      //console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"]);
    } else {
        // Que hace cuando la respeusta falle 
        console.log('Ooops. ha ocurrido un error!');
    }
};




// QUALITY POST
xhr.onload = function () {
    // Procesamos y validamos la respuesta del servidor: 200 OK o 300 redirect lo cual es una respuesta desde el servidor a nuestra consulta 
    if (xhr.status >= 200 && xhr.status < 300) {      
       //console.log("PARAMETRO",a);


      /*  let i =1;
        while(i<=1){
            xhr1.open('GET',listaApiCan[0]);
            xhr1.send();
             i++;
        }*/

        //i=0;      
        //while (i<Object.keys((JSON.parse(xhr.response)["data"]["units"])).length){
           // console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"][i].unit_id , "  ", i);
          //  listaUnidades[i]=JSON.parse(xhr.response)["data"]["units"][i].unit_id;
           // i=i+1;
       // }

        xhr1.open('GET',listaApiCan[0]);
        xhr1.send();
        
      


        // que hacer con la respuesta del servidor 
       //..... addCliente(JSON.parse(xhr.response)["data"]["units"])
      //  console.log('Completado!', JSON.parse(xhr.response)["data"]["units"][0]);
      // console.log('Completado!', xhr.response);
      //console.log('TAMAÑO!', Object.keys((JSON.parse(xhr.response)["data"]["units"])).length);
      //console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"][0].vin);
      //console.log('TAMAÑO!', JSON.parse(xhr.response)["data"]["units"]);
    } else {
        // Que hace cuando la respeusta falle 
        console.log('Ooops. ha ocurrido un error!');
    }
};

xhr.open('GET',listaIgnitions[0]);
xhr.send();



    //console.log(clientes)
   
})

program.parse(process.argv)