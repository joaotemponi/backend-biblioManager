import { Request, Response } from "express"; // Importa as interfaces Request e Response do framework Express, utilizadas para lidar com requisições e respostas HTTP.
import { Emprestimo } from "../model/Emprestimo"; // Importa o modelo Emprestimo, que contém as operações relacionadas à lógica de negócios de empréstimos.

// Interface que define a estrutura dos dados necessários para realizar operações de empréstimos.
interface EmprestimoDTO {
    idAluno: number, // Identificador único do aluno.
    idLivro: number, // Identificador único do livro.
    dataEmprestimo: Date, // Data em que o empréstimo foi realizado.
    dataDevolucao: Date, // Data prevista para a devolução do livro.
    statusEmprestimo: string // Status atual do empréstimo, como "ativo" ou "finalizado".
}

/**
 * A classe `EmprestimoController` estende a funcionalidade do modelo `Emprestimo` e é responsável pelo controle das operações de empréstimos.
 */
export class EmprestimoController extends Emprestimo {

    /**
     * Lista todos os empréstimos.
     * 
     * - Acessa o modelo para obter a lista de empréstimos armazenados no banco de dados.
     * - Retorna os empréstimos em formato JSON ou uma mensagem de erro caso ocorra alguma falha.
     * 
     * @param req Objeto de requisição HTTP enviado pelo cliente.
     * @param res Objeto de resposta HTTP enviado ao cliente.
     * @returns Resposta HTTP com status 200 e a lista de empréstimos em JSON, ou status 400 com mensagem de erro.
     */
    static async listar(req: Request, res: Response): Promise<any> {
        try {
            const listaDeEmprestimos = await Emprestimo.listarEmprestimos(); // Chama o método do modelo para listar os empréstimos.
            return res.status(200).json(listaDeEmprestimos); // Retorna a lista com status 200 (sucesso).
        } catch (error) {
            console.log('Erro ao acessar listagem de empréstimos'); // Loga o erro no console para fins de depuração.
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de empréstimos" }); // Retorna status 400 com mensagem de erro.
        }
    }

    /**
     * Cadastra um novo empréstimo.
     * 
     * - Recebe os dados do empréstimo pelo corpo da requisição.
     * - Chama o modelo para salvar o empréstimo no banco de dados.
     * - Retorna uma mensagem de sucesso ou erro, dependendo do resultado.
     * 
     * @param req Objeto de requisição HTTP enviado pelo cliente, contendo os dados do empréstimo.
     * @param res Objeto de resposta HTTP enviado ao cliente.
     * @returns Resposta HTTP com status 200 (sucesso) ou 400 (erro).
     */
    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            const emprestimoRecebido: EmprestimoDTO = req.body; // Obtém os dados do corpo da requisição.

            // Chama o método do modelo para cadastrar o empréstimo no banco de dados.
            const respostaClasse = await Emprestimo.cadastrarEmprestimo(
                emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Empréstimo cadastrado com sucesso!" }); // Retorna mensagem de sucesso com status 200.
            } else {
                return res.status(400).json({ mensagem: "Erro ao cadastrar o empréstimo. Entre em contato com o administrador do sistema." }); // Retorna mensagem de erro com status 400.
            }
        } catch (error) {
            console.log(`Erro ao cadastrar um empréstimo. ${error}`); // Loga o erro no console para fins de depuração.
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o empréstimo. Entre em contato com o administrador do sistema." }); // Retorna mensagem de erro ao cliente.
        }
    }

    /**
     * Atualiza os dados de um empréstimo existente.
     * 
     * - Recebe o ID do empréstimo pelo parâmetro da URL e os novos dados pelo corpo da requisição.
     * - Chama o modelo para atualizar as informações no banco de dados.
     * - Retorna uma mensagem de sucesso ou erro, dependendo do resultado.
     * 
     * @param req Objeto de requisição HTTP enviado pelo cliente, contendo os dados do empréstimo e o ID.
     * @param res Objeto de resposta HTTP enviado ao cliente.
     * @returns Resposta HTTP com status 200 (sucesso) ou 400 (erro).
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            const emprestimoRecebido: EmprestimoDTO = req.body; // Obtém os dados do corpo da requisição.
            const idEmprestimo = parseInt(req.params.idEmprestimo as string); // Obtém o ID do empréstimo a ser atualizado.

            // Cria um novo objeto de empréstimo com os dados recebidos.
            const emprestimoAtualizado = new Emprestimo(
                emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            emprestimoAtualizado.setIdEmprestimo(idEmprestimo); // Define o ID do empréstimo a ser atualizado.

            const respostaClasse = await Emprestimo.atualizarEmprestimo(emprestimoAtualizado); // Chama o modelo para realizar a atualização.

            if (respostaClasse) {
                return res.status(200).json({ mensagem: "Empréstimo atualizado com sucesso!" }); // Retorna mensagem de sucesso com status 200.
            } else {
                return res.status(400).json({ mensagem: "Erro ao atualizar o empréstimo. Entre em contato com o administrador do sistema." }); // Retorna mensagem de erro com status 400.
            }
        } catch (error) {
            console.log(`Erro ao atualizar o empréstimo. ${error}`); // Loga o erro no console para fins de depuração.
            return res.status(400).json({ mensagem: "Não foi possível atualizar o empréstimo. Entre em contato com o administrador do sistema." }); // Retorna mensagem de erro ao cliente.
        }
    }
}
