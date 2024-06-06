console.log("El archivo javascript ya está importado");
const urlApi="https://biblioisp20-875e.restdb.io/rest/libros?apikey=64f8c70e688854d7900bfe83";
const applibros = {
    listarlibros: ()=>{
        //tomamos la referencia del contenedor donde se mostrarán los libros
        const contenedor=document.getElementById("contenedorlibros");
        let contenidoHTML="";
        fetch(urlApi).then(respuesta=>respuesta.json()).then(libros=>{
            console.log(libros);
            for(const libro of libros){
                contenidoHTML +=`
                <div>
                    <img src="${libro.portada_url}" class="img-thumbnail"/>
                    <h4>${libro.nombre}</h4>
                    <h5>Autor: ${libro.autor}</h5>
                    <h5> Genero: ${libro.genero}</h5>
                    <details>
                        <summary>Mas Info</summary>
                        Sinopsis: ${libro.sinopsis}<br/>
                        Paginas: ${libro.pagina}<br/>
                        Editorial: ${libro.editorial}
                        </details>
                        <a href="#" onclick="applibros.editarLibro('${libro._id}')">Editar</a>
                        <a href="#" onclick="applibros.eliminarLibro('${libro._id}','${libro.nombre}')">Eliminar</a>
                </div>
                    `;
            };
            console.log(contenidoHTML)
            contenedor.innerHTML=contenidoHTML;
        })
    },
    
    eliminarLibro: (idAEliminar,nombreABorrar)=>{
        Swal.fire({
          title: `¿Está seguro que desea borrar al libro ${nombreABorrar}`,
          text: "No podrás revertir esta operación",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, quiero borrarlo!'
        }).then((result) => {
          if (result.isConfirmed) {
            const urlApi=`https://biblioisp20-875e.restdb.io/rest/libros/${idAEliminar}?apikey=64f8c70e688854d7900bfe83`;
        fetch(urlApi, {
          method: 'DELETE'
          })
          .then(response => {
            console.log(response);
            return applibros.listarlibros();
          }).then(response =>{
            Swal.fire(
              'Eliminado!',
              `El libro ${nombreABorrar} fue borrado .`,
              'satisfactoriamente'
            )
          });
          }
        })
      },

    guardarLibro: ()=>{
        const txtId=document.getElementById("txtId")
        const txtNombre=document.getElementById("txtNombre")
        const txtPaginas=document.getElementById("txtPaginas")
        const txtAutor=document.getElementById("txtAutor")
        const txtEditorial=document.getElementById("txtEditorial")
        const txtPortadaUrl=document.getElementById("txtPortadaUrl")
        const txtSinopsis=document.getElementById("txtSinopsis")
        const txtGenero=document.getElementById("txtGenero")
        let urlApi='';
        let methodHttp='';

        if(txtId.value==='') {
            urlApi="https://biblioisp20-875e.restdb.io/rest/libros?apikey=64f8c70e688854d7900bfe83";
            methodHttp="POST";
        }
        else{
            urlApi=`https://biblioisp20-875e.restdb.io/rest/libros/${txtId.value}?apikey=64f8c70e688854d7900bfe83`;
            methodHttp="PUT";
        }
        const LibroAGuardar={
        "pagina": txtPaginas.value,
        "editorial": txtEditorial.value,
        "autor": txtAutor.value,
        "nombre": txtNombre.value,
        "portada_url": txtPortadaUrl.value,
        "sinopsis": txtSinopsis.value,
        "genero": txtGenero.value
    };
    console.log(LibroAGuardar)
    fetch(urlApi, {
        method:methodHttp,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(LibroAGuardar)
    })
    .then(response=> {
        console.log(response);
        window.location.href="index.html";
    });
    console.log(LibroAGuardar)
},



editarLibro:(idLibroAEditar)=>{
    const urlApi=`https://biblioisp20-875e.restdb.io/rest/libros/${idLibroAEditar}?apikey=64f8c70e688854d7900bfe83`;

    fetch(urlApi
        ).then(res => res.json())
          .then(libro => {
            document.getElementById("txtId").value=libro._id;
            document.getElementById("txtNombre").value=libro.nombre;
            document.getElementById("txtPaginas").value=libro.pagina;
            document.getElementById("txtAutor").value=libro.autor;
            document.getElementById("txtEditorial").value=libro.editorial;
            document.getElementById("txtPortadaUrl").value=libro.portada_url;
            document.getElementById("txtSinopsis").value=libro.sinopsis;
            document.getElementById("txtGenero").value=libro.genero;
        
            const ventanaEditar=document.getElementById(`agregarEditarModal`);
            let ventana=new bootstrap.Modal(ventanaEditar);
            ventana.show(); 
        });
        }
}
    applibros.listarlibros();