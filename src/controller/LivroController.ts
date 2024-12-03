import { Request, Response } from "express";
import { Livro } from "../model/Livro";
import { AnySrvRecord } from "dns";



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
 * 
 * - Esta classe atua como um controlador dentro de uma API REST, gerenciando as operações relacionadas ao recurso "livro".
 * - Herdando de `Livro`, ela pode acessar métodos e propriedades da classe base.
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
    * 
    * Esta função recebe uma requisição HTTP contendo os dados de um livro no corpo da requisição
    * e tenta cadastrar este livro no banco de dados utilizando a função `cadastroLivro`. Caso o cadastro 
    * seja bem-sucedido, retorna uma resposta HTTP 200 com uma mensagem de sucesso. Caso contrário, retorna
    * uma resposta HTTP 400 com uma mensagem de erro.
    * 
    * @param {Request} req - Objeto de requisição HTTP, contendo o corpo com os dados do livro no formato `LivroDTO`.
    * @param {Response} res - Objeto de resposta HTTP usado para retornar o status e a mensagem ao cliente.
    * @returns {Promise<Response>} - Retorna uma resposta HTTP com o status 200 em caso de sucesso, ou 400 em caso de erro.
    * 
    * @throws {Error} - Se ocorrer um erro durante o processo de cadastro, uma mensagem é exibida no console e uma 
    *                   resposta HTTP 400 com uma mensagem de erro é enviada ao cliente.
    */
    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface LivroDTO
            const livroRecebido: LivroDTO = req.body;

            // Instanciando um objeto do tipo livro com as informações recebidas
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

            // Chama a função de cadastro passando o objeto como parâmetro
            const respostaClasse = await Livro.cadastrarLivro(novoLivro);

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um livro. ${error}`);

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o livro. Entre em contato com o administrador do sistema." });
        }
    }

    static async remover(req: Request, res: Response): Promise<any> {
        try {

            const idLivro = parseInt(req.params.idLivro as string);
    
            const respostaModelo = await Livro.removerLivro(idLivro);
    
            if (respostaModelo) {
                return res.status(200).json({ mensagem: "O livro foi removido com sucesso!" });
            } else {
                return res.status(400).json({ mensagem: "Erro ao remover o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao remover um livro. ${error}`);
    
            // Retorna uma mensagem de erro para o chamador
            return res.status(400).json({ mensagem: "Não foi possível remover o livro. Entre em contato com o administrador do sistema." });
        }
    }

    static async atualizar(req: Request, res: Response): Promise<any> {
        try {
            // Recebe os dados do livro enviados no corpo da requisição
            const livroRecebido: LivroDTO = req.body;
    
            // Recupera o ID do livro enviado nos parâmetros da URL
            const idLivroRecebido = parseInt(req.params.idLivro as string);
    
            // Cria uma instância de Livro com os dados recebidos
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

    
            // Define o ID do livro na instância
            livroAtualizado.setIdLivro(idLivroRecebido);
    
            // Chama a função do modelo para atualizar o livro e armazena a resposta
            const respostaModelo = await Livro.atualizarLivro(livroAtualizado);
    
            // Verifica se a resposta do modelo foi verdadeira (true)
            if (respostaModelo) {
                // Retorna um status 200 com uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Livro atualizado com sucesso!" });
            } else {
                // Retorna um status 400 com uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao atualizar o livro. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao atualizar um livro. ${error}`);
    
            // Retorna uma mensagem de erro para o chamador
            return res.status(400).json({ mensagem: "Não foi possível atualizar o livro. Entre em contato com o administrador do sistema." });
        }
    }
    
    
}
