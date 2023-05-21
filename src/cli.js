import pegaArquivo from "../index.js";

const caminho = process.argv;

async function processa(caminho){
    const resultado = await pegaArquivo(caminho[2]);
    console.log(resultado);
}

processa(caminho);
