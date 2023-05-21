import fs from 'fs';
import chalk from 'chalk';

function pegaArquivo(caminhoDoArquivo){
    const encode = 'UTF-8';
    fs.readFile(caminhoDoArquivo, encode, (_, encontrado) => {
        console.log(chalk.green(encontrado));
    });
}

pegaArquivo("./arquivos/texto.md");
