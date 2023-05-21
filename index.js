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

        return extraiLinks(retorno);
        }catch(error){
            console.log(tratamento(null,error)); 
        }finally{
           // console.log("Dando erro ou não, sempre cai aqui")
        }
}


function extraiLinks(texto){
    const regex = /\[([^\[]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; //global e multi linha
    const capturas = [...texto.matchAll(regex)]; //expande o conteúdo iterável OUTRA FORMA while(arr = regex.exec(texto) !== null)
    const resultados = capturas.map(captura => 
        ({
            [captura[1]] : captura[2]
        })
    );
    return resultados!=null && resultados.length > 0?resultados:"Não há links no arquivo";
}

export default pegaArquivo;
