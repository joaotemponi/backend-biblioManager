import { Request, Response } from "express";
import { Aluno } from "../model/Aluno";

interface AlunoDTO {
    nome: string,
    sobrenome: string,
    dataNascimento: Date,
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
     * 
     * - Acessa a função de listar alunos definida no modelo `Aluno` e retorna os dados em formato JSON.
     * - Em caso de erro, retorna um status 400 e uma mensagem informando a falha.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de alunos em formato JSON com status 200 em caso de sucesso.
     */
    static async listar(req: Request, res: Response): Promise<any> {
        try {
            const listaDeAlunos = await Aluno.listarAlunos();
            return res.status(200).json(listaDeAlunos);
        } catch (error) {
            console.log('Erro ao acessar lista de alunos');
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de alunos" });
        }
    }

    /**
     * Cadastra um novo aluno.
     * 
     * - Recebe os dados do aluno pelo corpo da requisição e utiliza o modelo `Aluno` para registrar no banco de dados.
     * - Em caso de sucesso, retorna uma mensagem de confirmação com status 200.
     * - Em caso de erro, retorna um status 400 e uma mensagem de falha.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            const alunoRecebido: AlunoDTO = req.body;
            const novoAluno = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular,
            );

            const respostaClasse = await Aluno.cadastrarAluno(novoAluno);

            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Aluno cadastrado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Erro ao cadastrar um aluno. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o aluno. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Remove um aluno.
     * 
     * - Recebe o ID do aluno pelo parâmetro da URL e utiliza o modelo `Aluno` para removê-lo do banco de dados.
     * - Em caso de sucesso, retorna uma mensagem de confirmação com status 200.
     * - Em caso de erro, retorna um status 400 e uma mensagem de falha.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            const idAluno = parseInt(req.params.idAluno as string);
            const respostaModelo = await Aluno.removerAluno(idAluno);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "O aluno foi removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Erro ao remover o aluno. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível remover o aluno. Entre em contato com o administrador do sistema" });
        }
    }

    /**
     * Atualiza os dados de um aluno.
     * 
     * - Recebe o ID do aluno pelo parâmetro da URL e os novos dados pelo corpo da requisição.
     * - Utiliza o modelo `Aluno` para atualizar o registro no banco de dados.
     * - Em caso de sucesso, retorna uma mensagem de confirmação com status 200.
     * - Em caso de erro, retorna um status 400 e uma mensagem de falha.
     * 
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Mensagem de sucesso ou erro em formato JSON.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const alunoRecebido: AlunoDTO = req.body;
            const idAlunoRecebido = parseInt(req.params.idAluno as string);
            const alunoAtualizado = new Aluno(
                alunoRecebido.nome,
                alunoRecebido.sobrenome,
                alunoRecebido.dataNascimento,
                alunoRecebido.endereco,
                alunoRecebido.email,
                alunoRecebido.celular
            );

            alunoAtualizado.setIdAluno(idAlunoRecebido);
            const respostaModelo = await Aluno.atualizarAluno(alunoAtualizado);

            if (respostaModelo) {
                return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o aluno. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            console.log(`Erro ao atualizar o aluno. ${error}`);
            return res.status(400).json({ mensagem: "Não foi possível atualizar o aluno. Entre em contato com o administrador do sistema" });
        }
    }
}
