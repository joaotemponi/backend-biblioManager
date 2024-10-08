/**
 * Classe que representa um livro.
 */
export class Livro {

    /* Atributos */
    /* Identificador do livro */
    private idLivro: number = 0;
    /* Título do livro */
    private titulo: string;
    /* Autor do livro */
    private autor: string;
    /* Editora do livro */
    private editora: string;
    /* Ano de publicação do livro */
    private anoPublicacao: string;
    /* ISBN do livro */
    private isbn: string;
    /* Quantidade total de exemplares */
    private quantTotal: number;
    /* Quantidade disponível de exemplares */
    private quantDisponivel: number;
    /* Valor de aquisição do livro */
    private valorAquisicao: number;
    /* Status de empréstimo do livro */
    private statusLivroEmprestado: string;

    /**
     * Construtor da classe Livro
     * 
     * @param titulo Título do livro
     * @param autor Autor do livro
     * @param editora Editora do livro
     * @param anoPublicacao Ano de publicação do livro
     * @param isbn ISBN do livro
     * @param quantTotal Quantidade total de exemplares
     * @param quantDisponivel Quantidade disponível de exemplares
     * @param valorAquisicao Valor de aquisição do livro
     * @param statusLivroEmprestado Status de empréstimo do livro
     */
    constructor(
        titulo: string,
        autor: string,
        editora: string,
        anoPublicacao: string,
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
     * Recupera o identificador do livro
     * @returns o identificador do livro
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro
     * @param idLivro O identificador do livro
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Recupera o título do livro
     * @returns o título do livro
     */
    public getTitulo(): string {
        return this.titulo;
    }

    /**
     * Define o título do livro
     * @param titulo O título do livro
     */
    public setTitulo(titulo: string): void {
        this.titulo = titulo;
    }

    /**
     * Recupera o autor do livro
     * @returns o autor do livro
     */
    public getAutor(): string {
        return this.autor;
    }

    /**
     * Define o autor do livro
     * @param autor O autor do livro
     */
    public setAutor(autor: string): void {
        this.autor = autor;
    }

    /**
     * Recupera a editora do livro
     * @returns a editora do livro
     */
    public getEditora(): string {
        return this.editora;
    }

    /**
     * Define a editora do livro
     * @param editora A editora do livro
     */
    public setEditora(editora: string): void {
        this.editora = editora;
    }

    /**
     * Recupera o ano de publicação do livro
     * @returns o ano de publicação do livro
     */
    public getAnoPublicacao(): string {
        return this.anoPublicacao;
    }

    /**
     * Define o ano de publicação do livro
     * @param anoPublicacao O ano de publicação do livro
     */
    public setAnoPublicacao(anoPublicacao: string): void {
        this.anoPublicacao = anoPublicacao;
    }

    /**
     * Recupera o ISBN do livro
     * @returns o ISBN do livro
     */
    public getIsbn(): string {
        return this.isbn;
    }

    /**
     * Define o ISBN do livro
     * @param isbn O ISBN do livro
     */
    public setIsbn(isbn: string): void {
        this.isbn = isbn;
    }

    /**
     * Recupera a quantidade total de exemplares
     * @returns a quantidade total de exemplares
     */
    public getQuantTotal(): number {
        return this.quantTotal;
    }

    /**
     * Define a quantidade total de exemplares
     * @param quantTotal A quantidade total de exemplares
     */
    public setQuantTotal(quantTotal: number): void {
        this.quantTotal = quantTotal;
    }

    /**
     * Recupera a quantidade disponível de exemplares
     * @returns a quantidade disponível de exemplares
     */
    public getQuantDisponivel(): number {
        return this.quantDisponivel;
    }

    /**
     * Define a quantidade disponível de exemplares
     * @param quantDisponivel A quantidade disponível de exemplares
     */
    public setQuantDisponivel(quantDisponivel: number): void {
        this.quantDisponivel = quantDisponivel;
    }

    /**
     * Recupera o valor de aquisição do livro
     * @returns o valor de aquisição do livro
     */
    public getValorAquisicao(): number {
        return this.valorAquisicao;
    }

    /**
     * Define o valor de aquisição do livro
     * @param valorAquisicao O valor de aquisição do livro
     */
    public setValorAquisicao(valorAquisicao: number): void {
        this.valorAquisicao = valorAquisicao;
    }

    /**
     * Recupera o status de empréstimo do livro
     * @returns o status de empréstimo do livro
     */
    public getStatusLivroEmprestado(): string {
        return this.statusLivroEmprestado;
    }

    /**
     * Define o status de empréstimo do livro
     * @param statusLivroEmprestado O status de empréstimo do livro
     */
    public setStatusLivroEmprestado(statusLivroEmprestado: string): void {
        this.statusLivroEmprestado = statusLivroEmprestado;
    }
}

