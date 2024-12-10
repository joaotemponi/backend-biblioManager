// Importa os tipos de requisição e resposta do Express
import { Request, Response } from "express";
// Importa o modelo de Livro
import { Livro } from "../model/Livro";
// Importa um tipo de DNS (não utilizado no código)
import { AnySrvRecord } from "dns";

// Define a interface LivroDTO para garantir a estrutura dos dados de um livro
interface LivroDTO {
    titulo: string,
    autor: string,
    editora: string,
    ano_publicacao: Date,
    isbn: string,
    quant_total: number,
    quant_disponivel: number,
    valor_aquisicao: number,
    status_livro_emprestado: string
}

/**
 * A classe `LivroController` estende a classe `Livro` e é responsável por controlar as requisições relacionadas aos livros.
 * Esta classe gerencia as operações de listagem, cadastro, atualização e remoção de livros na API REST.
 */
export class LivroController extends Livro {

    /**
     * Lista todos os livros.
     * @param req Objeto de requisição HTTP.
     * @param res Objeto de resposta HTTP.
     * @returns Lista de livros em formato JSON com status 200 em caso de sucesso.
     * @throws Retorna um status 400 com uma mensagem de erro caso ocorra uma falha ao acessar a listagem de livros.
     */
    static async listar(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os livros e armazena o resultado
            const listaDeLivros = await Livro.listarLivro();

            // Retorna a lista de livros para quem fez a requisição
            return res.status(200).json(listaDeLivros);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de livros');

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de livros" });
        }
    }

    /**
     * Método controller para cadastrar um novo livro.
     * Recebe as informações de um livro no corpo da requisição e tenta registrá-las no banco de dados.
     * Retorna um status 200 em caso de sucesso, ou 400 em caso de erro.
     * @param req Objeto de requisição HTTP com os dados do livro.
     * @param res Objeto de resposta HTTP com o status e mensagem.
     * @returns Resposta com status e mensagem de sucesso ou erro.
     */
    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            // Recupera os dados do livro do corpo da requisição e os armazena em um objeto do tipo LivroDTO
            const livroRecebido: LivroDTO = req.body;

            // Cria uma instância do livro utilizando os dados recebidos
            const novoLivro = new Livro(
                livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.ano_publicacao,
                livroRecebido.isbn,
                livroRecebido.quant_total,
                livroRecebido.quant_disponivel,
                livroRecebido.valor_aquisicao,
                livroRecebido.status_livro_emprestado
            );

            // Chama a função de cadastro do modelo para inserir o novo livro no banco de dados
            const respostaClasse = await Livro.cadastrarLivro(novoLivro);

            // Verifica se o cadastro foi bem-sucedido e retorna a resposta adequada
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso em formato JSON
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro em formato JSON
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um livro. ${error}`);

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Remove um livro.
     * Recebe o ID do livro e tenta removê-lo do banco de dados.
     * Retorna um status 200 em caso de sucesso, ou 400 em caso de erro.
     * @param req Objeto de requisição HTTP com o ID do livro a ser removido.
     * @param res Objeto de resposta HTTP com o status e mensagem.
     * @returns Resposta com status e mensagem de sucesso ou erro.
     */
    static async remover(req: Request, res: Response): Promise<any> {
        try {
            // Obtém o ID do livro a ser removido a partir dos parâmetros da URL
            const idLivro = parseInt(req.params.idLivro as string);

            // Chama o método do modelo para remover o livro do banco de dados
            const respostaModelo = await Livro.removerLivro(idLivro);

            // Verifica se a remoção foi bem-sucedida e retorna a resposta adequada
            if (respostaModelo) {
                // Retorna uma mensagem de sucesso em formato JSON
                return res.status(200).json({ mensagem: "O livro foi removido com sucesso!" });
            } else {
                // Retorna uma mensagem de erro em formato JSON
                return res.status(400).json({ mensagem: "Erro ao remover o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao remover um livro. ${error}`);

            // Retorna uma mensagem de erro em formato JSON
            return res.status(400).json({ mensagem: "Não foi possível remover o livro. Entre em contato com o administrador do sistema." });
        }
    }

    /**
     * Atualiza os dados de um livro.
     * Recebe o ID e os novos dados do livro e tenta atualizar o banco de dados.
     * Retorna um status 200 em caso de sucesso, ou 400 em caso de erro.
     * @param req Objeto de requisição HTTP com o ID e os dados do livro a ser atualizado.
     * @param res Objeto de resposta HTTP com o status e mensagem.
     * @returns Resposta com status e mensagem de sucesso ou erro.
     */
    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recebe os dados do livro enviados no corpo da requisição
            const livroRecebido: LivroDTO = req.body;

            // Recupera o ID do livro a ser atualizado a partir dos parâmetros da URL
            const idLivroRecebido = parseInt(req.params.idLivro as string);

            // Cria uma instância do livro com os dados recebidos
            const livroAtualizado = new Livro(
                livroRecebido.titulo,
                livroRecebido.autor,
                livroRecebido.editora,
                livroRecebido.ano_publicacao,
                livroRecebido.isbn,
                livroRecebido.quant_total,
                livroRecebido.quant_disponivel,
                livroRecebido.valor_aquisicao,
                livroRecebido.status_livro_emprestado
            );

            // Define o ID do livro na instância para o processo de atualização
            livroAtualizado.setIdLivro(idLivroRecebido);

            // Chama o método do modelo para atualizar o livro e armazena a resposta
            const respostaModelo = await Livro.atualizarLivro(livroAtualizado);

            // Verifica se a atualização foi bem-sucedida e retorna a resposta adequada
            if (respostaModelo) {
                // Retorna uma mensagem de sucesso em formato JSON
                return res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro em formato JSON
                return res.status(400).json({ mensagem: "Erro ao atualizar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um livro. ${error}`);

            // Retorna uma mensagem de erro em formato JSON
            return res.status(400).json({ mensagem: "Não foi possível atualizar o livro. Entre em contato com o administrador do sistema." });
        }
    }
}
