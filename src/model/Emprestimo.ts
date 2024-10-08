/**
 * Classe que representa um empréstimo.
 */
export class Emprestimo {

    /* Atributos */
    /* Identificador do empréstimo */
    private idEmprestimo: number = 0;
    /* Identificador do aluno */
    private idAluno: number;
    /* Identificador do livro */
    private idLivro: number;
    /* Data do empréstimo */
    private dataEmprestimo: Date;
    /* Data de devolução */
    private dataDevolucao: Date;
    /* Status do empréstimo */
    private statusEmprestimo: Date;

    /**
     * Construtor da classe Emprestimo
     * 
     * @param idAluno Identificador do aluno
     * @param idLivro Identificador do livro
     * @param dataEmprestimo Data do empréstimo
     * @param dataDevolucao Data de devolução
     * @param statusEmprestimo Status do empréstimo
     */
    constructor(
        idAluno: number,
        idLivro: number,
        dataEmprestimo: Date,
        dataDevolucao: Date,
        statusEmprestimo: Date
    ) {
        this.idAluno = idAluno;
        this.idLivro = idLivro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.statusEmprestimo = statusEmprestimo;
    }

    /* Métodos get e set */
    
    /**
     * Recupera o identificador do empréstimo
     * @returns o identificador do empréstimo
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;
    }

    /**
     * Atribui um valor ao identificador do empréstimo
     * @param idEmprestimo Novo identificador do empréstimo
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;
    }

    /**
     * Retorna o identificador do aluno.
     *
     * @returns O identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Define o identificador do aluno.
     * 
     * @param idAluno O identificador do aluno a ser definido.
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o identificador do livro.
     *
     * @returns O identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;
    }

    /**
     * Define o identificador do livro.
     * 
     * @param idLivro O identificador do livro a ser definido.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;
    }

    /**
     * Retorna a data do empréstimo.
     *
     * @returns A data do empréstimo.
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;
    }

    /**
     * Define a data do empréstimo.
     * 
     * @param dataEmprestimo A nova data do empréstimo.
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;
    }

    /**
     * Retorna a data de devolução.
     *
     * @returns A data de devolução.
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;
    }

    /**
     * Define a data de devolução.
     * 
     * @param dataDevolucao A nova data de devolução.
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;
    }

    /**
     * Retorna o status do empréstimo.
     *
     * @returns O status do empréstimo.
     */
    public getStatusEmprestimo(): Date {
        return this.statusEmprestimo;
    }

    /**
     * Define o status do empréstimo.
     * 
     * @param statusEmprestimo O novo status do empréstimo.
     */
    public setStatusEmprestimo(statusEmprestimo: Date): void {
        this.statusEmprestimo = statusEmprestimo;
    }
}
