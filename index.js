import fs from 'fs';
import chalk from 'chalk';



function tratamento(mensagem, erro){
    if(erro){
        throw new Error(chalk.red(erro.code,'Erro ao tentar ler arquivo'));
    }
    console.log(chalk.green(mensagem));
}


async function pegaArquivo(caminhoDoArquivo){
    try{
    const encode = 'UTF-8';
    const retorno = await fs.promises.readFile(caminhoDoArquivo, encode);
    tratamento( retorno,null); 
    }catch(error){
        console.log(tratamento(null,error)); 
    }finally{
        console.log("Dando erro ou não, sempre cai aqui")
    }
}

pegaArquivo("./arquivos/texto2.md")