/** 
 * Classe que representa um aluno
 */
export class Aluno {

    /* Atributos */
    /* Identificador do aluno */
    private idAluno: number = 0;
    /* RA do aluno */
    private ra: string;
    /* Nome do aluno */
    private nome: string;
    /* Sobrenome do aluno */
    private sobrenome: string;
    /* Data de nascimento do aluno */
    private dataNascimento: Date;
    /* Endereço do aluno */
    private endereco: string;
    /* Email do aluno */
    private email: string;
    /* Celular do aluno */
    private celular: string;

    /**
 * Construtor da classe Aluno
 * 
 * @param ra RA do aluno
 * @param nome Nome do aluno
 * @param sobrenome Sobrenome do aluno
 * @param dataNascimento Data de nascimento do aluno
 * @param endereco Endereço do aluno
 * @param email Email do aluno
 * @param celular Celular do aluno
 */
    constructor(
        ra: string,
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.ra = ra;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
        this.email = email;
        this.celular = celular;
    }

    /* Métodos get e set */
    /**
     * Recupera o identificador do aluno
     * @returns o identificador do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;
    }

    /**
     * Atribui um valor ao identificador do aluno
     * @param idAluno novo identificador do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;
    }

    /**
     * Retorna o RA do aluno.
     *
     * @returns {string} O RA do aluno.
     */
    public getRa(): string {
        return this.ra;
    }

    /**
     * Define o RA do aluno.
     * 
     * @param ra - O RA do aluno a ser definido.
     */
    public setRa(ra: string): void {
        this.ra = ra;
    }

    /**
     * Retorna o nome do aluno.
     *
     * @returns {string} O nome do aluno.
     */
    public getNome(): string {
        return this.nome;
    }

    /**
     * Define o nome do aluno.
     *
     * @param nome - O nome do aluno a ser definido.
     */
    public setNome(nome: string): void {
        this.nome = nome;
    }

    /**
     * Retorna o sobrenome do aluno.
     *
     * @returns {string} O sobrenome do aluno.
     */
    public getSobrenome(): string {
        return this.sobrenome;
    }

    /**
     * Define o sobrenome do aluno.
     *
     * @param sobrenome - O sobrenome do aluno a ser definido.
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;
    }

    /**
     * Retorna a data de nascimento do aluno.
     *
     * @returns {Date} A data de nascimento do aluno.
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;
    }

    /**
     * Define a data de nascimento do aluno.
     * 
     * @param dataNascimento - A nova data de nascimento do aluno.
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;
    }

    /**
     * Retorna o endereço do aluno.
     *
     * @returns {string} O endereço do aluno.
     */
    public getEndereco(): string {
        return this.endereco;
    }

    /**
     * Define o endereço do aluno.
     * 
     * @param endereco - O novo endereço do aluno.
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;
    }

    /**
     * Retorna o email do aluno.
     *
     * @returns {string} O email do aluno.
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Define o email do aluno.
     * 
     * @param email - O novo email do aluno.
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Retorna o celular do aluno.
     *
     * @returns {string} O celular do aluno.
     */
    public getCelular(): string {
        return this.celular;
    }

    /**
     * Define o celular do aluno.
     * 
     * @param celular - O novo celular do aluno.
     */
    public setCelular(celular: string): void {
        this.celular = celular;
    }


}