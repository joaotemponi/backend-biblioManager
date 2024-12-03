import { DatabaseModel } from "./DatabaseModel";

const database = new DatabaseModel().pool;


/**
 * Classe que representa um empréstimo.
 */
export class Emprestimo {

    /* Atributos */
    /* Identificador do empréstimo */
    private idEmprestimo: number = 0;
    /* Identificador do aluno */
    private idAluno: number;
    /* Nome do aluno */
    /* Identificador do livro */
    private idLivro: number;
    /* Nome do livro */
    /* Data do empréstimo */
    private dataEmprestimo: Date;
    /* Data de devolução */
    private dataDevolucao: Date;
    /* Status do empréstimo */
    private statusEmprestimo: string;

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
        statusEmprestimo: string
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
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;
    }

    /**
     * Define o status do empréstimo.
     * 
     * @param statusEmprestimo O novo status do empréstimo.
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;
    }


    static async listarEmprestimos(): Promise<any> {
        const respostaJson: { idEmprestimo: any; idAluno: any; nomeAluno: any; idLivro: any; tituloLivro: any; dataEmprestimo: any; dataDevolucao: any; statusEmprestimo: any; }[] = [];

        try {
            const querySelectEmprestimos = `SELECT e.*, 
                                                a.nome AS nome_aluno, 
                                                l.titulo AS titulo_livro
                                            FROM 
                                                Emprestimo e
                                            JOIN 
                                                Aluno a ON e.id_aluno = a.id_aluno
                                            JOIN 
                                                Livro l ON e.id_livro = l.id_livro;`;
            const respostaBD = await database.query(querySelectEmprestimos);

            respostaBD.rows.forEach((linha) => {
                // instancia (cria) objeto emprestimo
                respostaJson.push({
                    idEmprestimo: linha.id_emprestimo,
                    idAluno: linha.id_aluno,
                    nomeAluno: linha.nome_aluno,
                    idLivro: linha.id_livro,
                    tituloLivro: linha.titulo_livro,
                    dataEmprestimo: linha.data_emprestimo,
                    dataDevolucao: linha.data_devolucao,
                    statusEmprestimo: linha.status_emprestimo
                });
        
            });

            return respostaJson;

        } catch (error) {
            console.log('Erro ao buscar lista de empréstimos');
            return null;
        }
    }

    static async cadastrarEmprestimo(idAluno: number, idLivro: number, dataEmprestimo: Date, dataDevolucao: Date, statusEmprestimo: string): Promise<boolean> {
        try {
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                                           VALUES (${idAluno}, 
                                           ${idLivro},
                                           '${dataEmprestimo}', 
                                           '${dataDevolucao}', 
                                           '${statusEmprestimo}')
                                           RETURNING id_emprestimo;`;

            const respostaBD = await database.query(queryInsertEmprestimo);
            if (respostaBD.rowCount != 0) {
                console.log(`Empréstimo cadastrado com sucesso. ID empréstimo: ${respostaBD.rows[0].id_emprestimo}`);
                return true;
            }

            return false;
        } catch (error) {
            console.log('Erro ao cadastrar o empréstimo. Consulte os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

    static async atualizarEmprestimo(emprestimo: Emprestimo): Promise<any> {
        try {
            const queryUpdateEmprestimo = `UPDATE emprestimo SET
            id_aluno = ${emprestimo.getIdAluno()},
            id_livro = ${emprestimo.getIdLivro()},
            data_emprestimo = '${emprestimo.getDataEmprestimo()}',
            data_devolucao = '${emprestimo.getDataDevolucao()}',
            status_emprestimo = '${emprestimo.getStatusEmprestimo()}'
            WHERE id_emprestimo = ${emprestimo.getIdEmprestimo()};`;
    
            const respostaBD = await database.query(queryUpdateEmprestimo);
            if (respostaBD.rowCount != 0) {
                console.log(`Empréstimo atualizado com sucesso. Id empréstimo: ${emprestimo.getIdEmprestimo()}`);
            }
            return true;
        } catch (error) {
            console.log('Erro ao atualizar o empréstimo. Consulte os logs para mais detalhes.');
            console.log(error);
            return false;
        }
    }

}