import { DatabaseModel } from "./DatabaseModel";  // Importa a classe DatabaseModel, que gerencia a conexão com o banco de dados.

const database = new DatabaseModel().pool;  // Cria uma instância do pool de conexões com o banco de dados através da classe DatabaseModel.

/**
 * Classe que representa um empréstimo.
 * Esta classe modela um empréstimo de livro, contendo atributos e métodos para gerenciar as informações de empréstimos.
 */
export class Emprestimo {

    /* Atributos */
    /* Identificador do empréstimo */
    private idEmprestimo: number = 0;  // Atributo para armazenar o identificador único do empréstimo, inicialmente configurado como 0.
    /* Identificador do aluno */
    private idAluno: number;  // Atributo para armazenar o identificador do aluno que fez o empréstimo.
    /* Nome do aluno */
    /* Identificador do livro */
    private idLivro: number;  // Atributo para armazenar o identificador do livro emprestado.
    /* Nome do livro */
    /* Data do empréstimo */
    private dataEmprestimo: Date;  // Atributo para armazenar a data do empréstimo.
    /* Data de devolução */
    private dataDevolucao: Date;  // Atributo para armazenar a data de devolução do livro.
    /* Status do empréstimo */
    private statusEmprestimo: string;  // Atributo para armazenar o status do empréstimo (ex: "pendente", "devolvido").

    /**
     * Construtor da classe Emprestimo.
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
        this.idAluno = idAluno;  // Atribui o identificador do aluno ao atributo idAluno.
        this.idLivro = idLivro;  // Atribui o identificador do livro ao atributo idLivro.
        this.dataEmprestimo = dataEmprestimo;  // Atribui a data do empréstimo ao atributo dataEmprestimo.
        this.dataDevolucao = dataDevolucao;  // Atribui a data de devolução ao atributo dataDevolucao.
        this.statusEmprestimo = statusEmprestimo;  // Atribui o status do empréstimo ao atributo statusEmprestimo.
    }

    /* Métodos get e set */

    /**
     * Recupera o identificador do empréstimo.
     * @returns o identificador do empréstimo.
     */
    public getIdEmprestimo(): number {
        return this.idEmprestimo;  // Retorna o identificador do empréstimo.
    }

    /**
     * Atribui um valor ao identificador do empréstimo.
     * @param idEmprestimo Novo identificador do empréstimo.
     */
    public setIdEmprestimo(idEmprestimo: number): void {
        this.idEmprestimo = idEmprestimo;  // Define um novo valor para o identificador do empréstimo.
    }

    /**
     * Retorna o identificador do aluno.
     *
     * @returns O identificador do aluno.
     */
    public getIdAluno(): number {
        return this.idAluno;  // Retorna o identificador do aluno.
    }

    /**
     * Retorna o identificador do livro.
     *
     * @returns O identificador do livro.
     */
    public getIdLivro(): number {
        return this.idLivro;  // Retorna o identificador do livro.
    }

    /**
     * Define o identificador do livro.
     * 
     * @param idLivro O identificador do livro a ser definido.
     */
    public setIdLivro(idLivro: number): void {
        this.idLivro = idLivro;  // Define um novo valor para o identificador do livro.
    }

    /**
     * Retorna a data do empréstimo.
     *
     * @returns A data do empréstimo.
     */
    public getDataEmprestimo(): Date {
        return this.dataEmprestimo;  // Retorna a data do empréstimo.
    }

    /**
     * Define a data do empréstimo.
     * 
     * @param dataEmprestimo A nova data do empréstimo.
     */
    public setDataEmprestimo(dataEmprestimo: Date): void {
        this.dataEmprestimo = dataEmprestimo;  // Define uma nova data de empréstimo.
    }

    /**
     * Retorna a data de devolução.
     *
     * @returns A data de devolução.
     */
    public getDataDevolucao(): Date {
        return this.dataDevolucao;  // Retorna a data de devolução.
    }

    /**
     * Define a data de devolução.
     * 
     * @param dataDevolucao A nova data de devolução.
     */
    public setDataDevolucao(dataDevolucao: Date): void {
        this.dataDevolucao = dataDevolucao;  // Define uma nova data de devolução.
    }

    /**
     * Retorna o status do empréstimo.
     *
     * @returns O status do empréstimo.
     */
    public getStatusEmprestimo(): string {
        return this.statusEmprestimo;  // Retorna o status do empréstimo.
    }

    /**
     * Define o status do empréstimo.
     * 
     * @param statusEmprestimo O novo status do empréstimo.
     */
    public setStatusEmprestimo(statusEmprestimo: string): void {
        this.statusEmprestimo = statusEmprestimo;  // Define um novo status para o empréstimo.
    }


    static async listarEmprestimos(): Promise<any> {
        const respostaJson: { idEmprestimo: any; idAluno: any; nomeAluno: any; idLivro: any; tituloLivro: any; dataEmprestimo: any; dataDevolucao: any; statusEmprestimo: any; }[] = [];  // Cria um array para armazenar os empréstimos no formato JSON.

        try {
            // Define a consulta SQL para listar os empréstimos, incluindo o nome do aluno e o título do livro.
            const querySelectEmprestimos = `SELECT e.*, 
                                                a.nome AS nome_aluno, 
                                                l.titulo AS titulo_livro
                                            FROM 
                                                Emprestimo e
                                            JOIN 
                                                Aluno a ON e.id_aluno = a.id_aluno
                                            JOIN 
                                                Livro l ON e.id_livro = l.id_livro;`;
            // Executa a consulta no banco de dados usando o pool de conexões.
            const respostaBD = await database.query(querySelectEmprestimos);

            // Itera sobre as linhas retornadas e cria os objetos de empréstimo.
            respostaBD.rows.forEach((linha) => {
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

            return respostaJson;  // Retorna a lista de empréstimos formatada como JSON.

        } catch (error) {
            console.log('Erro ao buscar lista de empréstimos');  // Exibe uma mensagem de erro caso a consulta falhe.
            return null;  // Retorna null em caso de erro.
        }
    }

    static async cadastrarEmprestimo(idAluno: number, idLivro: number, dataEmprestimo: Date, dataDevolucao: Date, statusEmprestimo: string): Promise<boolean> {
        try {
            // Define a consulta SQL para inserir um novo empréstimo no banco de dados.
            const queryInsertEmprestimo = `INSERT INTO emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo)
                                           VALUES (${idAluno}, 
                                           ${idLivro},
                                           '${dataEmprestimo}', 
                                           '${dataDevolucao}', 
                                           '${statusEmprestimo}')
                                           RETURNING id_emprestimo;`;

            // Executa a consulta de inserção no banco de dados.
            const respostaBD = await database.query(queryInsertEmprestimo);
            if (respostaBD.rowCount != 0) {  // Verifica se a inserção foi bem-sucedida.
                console.log(`Empréstimo cadastrado com sucesso. ID empréstimo: ${respostaBD.rows[0].id_emprestimo}`);  // Exibe uma mensagem de sucesso.
                return true;  // Retorna true indicando que o empréstimo foi cadastrado com sucesso.
            }

            return false;  // Retorna false caso a inserção não tenha sido bem-sucedida.
        } catch (error) {
            console.log('Erro ao cadastrar o empréstimo. Consulte os logs para mais detalhes.');  // Exibe uma mensagem de erro em caso de falha.
            console.log(error);  // Exibe o erro detalhado no console.
            return false;  // Retorna false em caso de erro.
        }
    }

    static async atualizarEmprestimo(emprestimo: Emprestimo): Promise<any> {
        try {
            // Define a consulta SQL para atualizar os dados de um empréstimo existente.
            const queryUpdateEmprestimo = `UPDATE emprestimo SET
            id_aluno = ${emprestimo.getIdAluno()},
            id_livro = ${emprestimo.getIdLivro()},
            data_emprestimo = '${emprestimo.getDataEmprestimo()}',
            data_devolucao = '${emprestimo.getDataDevolucao()}',
            status_emprestimo = '${emprestimo.getStatusEmprestimo()}'
            WHERE id_emprestimo = ${emprestimo.getIdEmprestimo()};`;

            // Executa a consulta de atualização no banco de dados.
            const respostaBD = await database.query(queryUpdateEmprestimo);
            if (respostaBD.rowCount != 0) {  // Verifica se a atualização foi bem-sucedida.
                console.log(`Empréstimo atualizado com sucesso. Id empréstimo: ${emprestimo.getIdEmprestimo()}`);  // Exibe uma mensagem de sucesso.
            }
            return true;  // Retorna true indicando que a atualização foi bem-sucedida.
        } catch (error) {
            console.log('Erro ao atualizar o empréstimo. Consulte os logs para mais detalhes.');  // Exibe uma mensagem de erro em caso de falha.
            console.log(error);  // Exibe o erro detalhado no console.
            return false;  // Retorna false em caso de erro.
        }
    }

}
