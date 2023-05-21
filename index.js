import fs from 'fs';
import chalk from 'chalk';

function tratamentoErro(erro){
    throw new Error(chalk.red(erro.code,'Erro ao tentar ler arquivo'));
}

function pegaArquivo(caminhoDoArquivo){
    const encode = 'UTF-8';
    
    //promises = código assíncrono
    fs.promises.readFile(caminhoDoArquivo, encode)
    .then((texto)=> console.log(chalk.green(texto)))//encadear código assíncrono
    .catch( (erro) => tratamentoErro(erro));
     

}

pegaArquivo("./arquivos/texto.md")