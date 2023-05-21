import fs from 'fs';
import chalk from 'chalk';

function tratamentoErro(erro){
    throw new Error(chalk.red(erro.code,'Erro ao tentar ler arquivo'));
}

function pegaArquivo(caminhoDoArquivo){
    const encode = 'UTF-8';
    fs.readFile(caminhoDoArquivo, encode, (erro, encontrado) => {
        if(erro){
            tratamentoErro(erro);
        }
        console.log(chalk.green(encontrado));
    });
}

console.log("Arquivo 1: ");
pegaArquivo("./arquivos/texto.md");
console.log("ok \nArquivo 2: ");
pegaArquivo("./arquivos/texto2.md");
