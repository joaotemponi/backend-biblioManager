import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome: string,
    data_nascimento: Date,
    endereco: string,
    email: string,
    celular: string
}

/**
 * A classe `AlunoController` estende a classe `Aluno` e é responsável por controlar as requisições relacionadas aos alunos.
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "aluno".
 * - Herdando de `Aluno`, ela pode acessar métodos e propriedades da classe base.
 */
export class AlunoController extends Aluno {

    /**
    * Lista todos os alunos.
    * @param req Objeto de requisição HTTP.
    * @param res Objeto de resposta HTTP.
    * @returns Lista de alunos em formato JSON com status 200 em caso de sucesso.
    * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de alunos.
    */
    static async listar(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os alunos e armazena o resultado
            const listaDeAlunos = await Aluno.listarAlunos();

            // Retorna a lista de alunos para quem fez a requisição
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar lista de alunos');

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
    * Método controller para cadastrar um novo aluno.
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um aluno no corpo da requisição
    * e tenta cadastrar este aluno no banco de dados utilizando a função `cadastroAluno`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do aluno.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e criando um novo objeto Aluno com esses dados
            const alunoRecebido: AlunoDTO = req.body;
            const novoAluno = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.data_nascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular,
            );

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Aluno.cadastrarAluno(novoAluno);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um aluno. ${error}`);

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }
}