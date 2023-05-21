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
        //tratamento( retorno,null); 

        extraiLinks(retorno);
        }catch(error){
            console.log(tratamento(null,error)); 
        }finally{
           // console.log("Dando erro ou não, sempre cai aqui")
        }
}


//encontrar padrão [nomelink](link)
// \[([^\[]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)
function extraiLinks(texto){
    const regex = /\[([^\[]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; //global e multi linha
    const capturas = [...texto.matchAll(regex)]; //expande o conteúdo iterável OUTRA FORMA while(arr = regex.exec(texto) !== null)
    //console.log(chalk.yellow(capturas[0][1])); //FileList
    //console.log(chalk.yellow(capturas[0][2])); //https://developer.mozilla.org/pt-BR/docs/Web/API/FileList

    const resultados = capturas.map(captura => 
        ({
            [captura[1]] : captura[2]
        })
    );
    console.log(resultados);
}


//pegaArquivo("./arquivos/texto.md");

export default pegaArquivo;
