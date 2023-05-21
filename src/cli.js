import pegaArquivo from "../index.js";
import listaValidada from "./http-validacao.js"; 
import fs from 'fs';

const caminho = process.argv;

async function processa(argumentos){
    const caminho = argumentos[2];
    const valida = argumentos[3] === "--valida";

    try {
    
        if(verificarEhArquivo(caminho)){
            const resultado = await pegaArquivo(caminho);
            imprime(valida,resultado);
            return;
        }
    
        if(verificarEhDiretorio(caminho)){
            const listaArquivos = await fs.promises.readdir(caminho)
            ehDiretorio(valida,listaArquivos,caminho);
        }
       
    } catch (error) {
        if(error.code === "ENOENT"){
            console.log("Arquivo ou diretório não existe");
        }
    }

}

async function imprime(valida, resultado, identificador = ""){

    if(valida){
        console.log('lista validada' , identificador, await listaValidada(resultado));
        return;
    }
    console.log(identificador , resultado);
    
}

async function ehDiretorio(valida, listaArquivos,caminho){
    listaArquivos.forEach(async (nomeArquivo) => {
        const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`);
        await imprime(valida,lista,nomeArquivo);
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
