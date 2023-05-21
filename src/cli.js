import pegaArquivo from "../index.js";
import fs from 'fs';

const caminho = process.argv;

async function processa(argumentos){
    const caminho = argumentos[2];

    try {
    
        if(verificarEhArquivo(caminho)){
            const resultado = await pegaArquivo(caminho);
            imprime(resultado);
            return;
        }
    
        if(verificarEhDiretorio(caminho)){
            const listaArquivos = await fs.promises.readdir(caminho)
            ehDiretorio(listaArquivos,caminho);
        }
       
    } catch (error) {
        if(error.code === "ENOENT"){
            console.log("Arquivo ou diretório não existe");
        }
    }

}

function imprime(resultado, identificador = ""){
    console.log(identificador , resultado);
}

function ehDiretorio(listaArquivos,caminho){
    listaArquivos.forEach(async (nomeArquivo) => {
        const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`);
        imprime(lista,nomeArquivo);
    });
}

function verificarEhArquivo(caminho){
    if(fs.lstatSync(caminho).isFile()){return true;};
    return false;
}

function verificarEhDiretorio(caminho){
    if(fs.lstatSync(caminho).isDirectory()){
        return true;
    }
    return false;
}

processa(caminho);
