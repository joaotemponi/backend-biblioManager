import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;

/**
 * Classe que representa um livro.
 */
export class Livro {

    /* Atributos */

    /**
     * Identificador do livro.
     */
    private idLivro: number = 0;

    /**
     * Título do livro.
     */
    private titulo: string;

    /**
     * Autor do livro.
     */
    private autor: string;

    /**
     * Editora do livro.
     */
    private editora: string;

    /**
     * Ano de publicação do livro.
     */
    private anoPublicacao: Date;

    /**
     * ISBN do livro.
     */
    private isbn: string;

    /**
     * Quantidade total de exemplares do livro.
     */
    private quantTotal: number;

    /**
     * Quantidade disponível de exemplares do livro.
     */
    private quantDisponivel: number;

    /**
     * Valor de aquisição do livro.
     */
    private valorAquisicao: number;

    /**
     * Status de empréstimo do livro.
     */
    private statusLivroEmprestado: string;

    /**
     * Construtor da classe Livro.
     * 
     * @param titulo Título do livro.
     * @param autor Autor do livro.
     * @param editora Editora do livro.
     * @param anoPublicacao Ano de publicação do livro.
     * @param isbn ISBN do livro.
     * @param quantTotal Quantidade total de exemplares.
     * @param quantDisponivel Quantidade disponível de exemplares.
     * @param valorAquisicao Valor de aquisição do livro.
     * @param statusLivroEmprestado Status de empréstimo do livro.
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: Date,
        isbn: string,
        quantTotal: number,
        quantDisponivel: number,
        valorAquisicao: number,
        statusLivroEmprestado: string
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.anoPublicacao = anoPublicacao;
        this.isbn = isbn;
        this.quantTotal = quantTotal;
        this.quantDisponivel = quantDisponivel;
        this.valorAquisicao = valorAquisicao;
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /* Métodos get e set */

    /**
     * Recupera o identificador do livro.
     * @returns O identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro.
     * @param idLivro O identificador do livro.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Recupera o título do livro.
     * @returns O título do livro.
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Define o título do livro.
     * @param titulo O título do livro.
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Recupera o autor do livro.
     * @returns O autor do livro.
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define o autor do livro.
     * @param autor O autor do livro.
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Recupera a editora do livro.
     * @returns A editora do livro.
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * Define a editora do livro.
     * @param editora A editora do livro.
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Recupera o ano de publicação do livro.
     * @returns O ano de publicação do livro.
     */
    public getAnoPublicacao(): Date {
        return this.anoPublicacao;
    }

    /**
     * Define o ano de publicação do livro.
     * @param anoPublicacao O ano de publicação do livro.
     */
    public setAnoPublicacao(anoPublicacao: Date): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * Recupera o ISBN do livro.
     * @returns O ISBN do livro.
     */
    public getIsbn(): string {
        return this.isbn;
    }

    /**
     * Define o ISBN do livro.
     * @param isbn O ISBN do livro.
     */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
     * Recupera a quantidade total de exemplares.
     * @returns A quantidade total de exemplares.
     */
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * Define a quantidade total de exemplares.
     * @param quantTotal A quantidade total de exemplares.
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
     * Recupera a quantidade disponível de exemplares.
     * @returns A quantidade disponível de exemplares.
     */
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * Define a quantidade disponível de exemplares.
     * @param quantDisponivel A quantidade disponível de exemplares.
     */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
     * Recupera o valor de aquisição do livro.
     * @returns O valor de aquisição do livro.
     */
    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * Define o valor de aquisição do livro.
     * @param valorAquisicao O valor de aquisição do livro.
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
     * Recupera o status de empréstimo do livro.
     * @returns O status de empréstimo do livro.
     */
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * Define o status de empréstimo do livro.
     * @param statusLivroEmprestado O status de empréstimo do livro.
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }

    /**
     * Realiza a listagem de livros no banco de dados.
     * 
     * Esta função consulta a tabela `livro` e retorna uma lista de objetos do tipo `Livro`. 
     * Se houver um erro durante a consulta, a função retorna `null`.
     * 
     * @returns {Promise<Array<Livro> | null>} - Um array de objetos do tipo `Livro` em caso de sucesso ou `null` se ocorrer um erro durante a consulta.
     */
    static async listarLivro(): Promise<Array<Livro> | null> {
        const listaDeLivros: Array<Livro> = [];

        try {
            // Query de consulta ao banco de dados
            const querySelectLivro = `SELECT * FROM livro;`;

            // Fazendo a consulta e guardando a resposta
            const respostaBD = await database.query(querySelectLivro);

            // Usando a resposta para instanciar objetos do tipo Livro
            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto carro
                const novoLivro = new Livro(
                    linha.titulo,
                    linha.autor,
                    linha.editora,
                    linha.ano_publicacao,
                    linha.isbn,
                    linha.quant_total,
                    linha.quant_disponivel,
                    linha.valor_aquisicao,
                    linha.status_livro_emprestado
                );
                // Atribui o ID ao objeto
                novoLivro.setIdLivro(linha.id_livro)

                // Adiciona o objeto na lista
                listaDeLivros.push(novoLivro);
            });

            // Retorna a lista de livros
            return listaDeLivros;
        } catch (error) {
            console.log('Erro ao buscar lista de livros. Verifique os logs para mais detalhes.');
            console.log(error);
            return null;
        }
    }

    /**
     * Cadastra um novo livro no banco de dados.
     * 
     * Esta função recebe um objeto `Livro`, extrai as informações relevantes e realiza uma operação de inserção (INSERT) na tabela `livro`.
     * Se o cadastro for bem-sucedido, a função retorna `true`, caso contrário, retorna `false`.
     * 
     * @param {Livro} livro - Objeto contendo os dados do livro a ser cadastrado.
     * 
     * @returns {Promise<boolean>} - Retorna `true` se o cadastro foi realizado com sucesso, ou `false` se ocorreu um erro.
     */
    static async cadastrarLivro(livro: Livro): Promise<boolean> {
        try {
            // Query para fazer insert de um livro no banco de dados
            const queryInsertLivro = `INSERT INTO livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado)
                          VALUES
                          ('${livro.getTitulo()}', 
                           '${livro.getAutor()}', 
                           '${livro.getEditora()}', 
                           '${livro.getAnoPublicacao()}', 
                           '${livro.getIsbn()}', 
                           ${livro.getQuantTotal()}, 
                           ${livro.getQuantDisponivel()}, 
                           ${livro.getValorAquisicao()}, 
                           '${livro.getStatusLivroEmprestado()}')
                          RETURNING id_livro;`;

            // Executa a query no banco e armazena a resposta
            const respostaBD = await database.query(queryInsertLivro);

            // Verifica se a quantidade de linhas modificadas é diferente de 0
            if (respostaBD.rowCount != 0) {
                console.log(`Livro cadastrado com sucesso! ID do livro: ${respostaBD.rows[0].id_livro}`);
                // true significa que o cadastro foi feito
                return true;
            }
            // false significa que o cadastro NÃO foi feito.
            return false;

        } catch (error) {
            // Imprime outra mensagem junto com o erro
            console.log('Erro ao cadastrar o livro. Verifique os logs para mais detalhes.');
            // Imprime o erro no console
            console.log(error);
            // Retorno um valor falso
            return false;
        }
    }
}
