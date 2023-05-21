import chalk from "chalk";

async function checaStatus(listaUrls){

    const arrStatus = await Promise.all(
        listaUrls.map( async (url) => {
            try{
            const response = await fetch(url);
            return response.status;
            }catch(erro){
                return tratamentoErros(erro);
            }
        })
    );
    return arrStatus;
  
}


 export default async function listaValidada(listaLinks){
    const listaUrls =  extraiLinks(listaLinks);
    const status = await checaStatus(listaUrls);

    return listaUrls.map( (objeto, indice) => 
        ({
            objeto,
            status: status[indice]
        })
    );
}


function extraiLinks(listaLinks){
    return listaLinks.map( (objetoLink) => Object.values(objetoLink).join());
}


function tratamentoErros(erro){
    if(erro.cause.code === "ENOTFOUND"){
        return "Link não encontrado";
    }
    return erro.cause.code;

}