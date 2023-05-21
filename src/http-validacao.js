
async function checaStatus(listaUrls){
    const arrStatus = await Promise.all(
        listaUrls.map( async (url) => {
            const response = await fetch(url);
            return response.status;
        })
    );
    return arrStatus;
  
}


 export default async function listaValidada(listaLinks){
    const listaUrls =  extraiLinks(listaLinks);
    const status = await checaStatus(listaUrls);
    //console.log(status);
    return status;
}


function extraiLinks(listaLinks){
    //loops
    return listaLinks.map( (objetoLink) => Object.values(objetoLink).join());
}