import { DatabaseModel } from "./DatabaseModel";  // Importa a classe DatabaseModel, que provavelmente fornece a conexão com o banco de dados

const database = new DatabaseModel().pool;  // Cria uma instância do modelo de banco de dados e acessa o pool de conexões para realizar operações no banco

/** 
 * Classe que representa um aluno
 */
export class Aluno {
    /* Atributos */
    private idAluno: number = 0;  // Atributo privado que armazena o identificador único do aluno, inicializado com 0
    private ra: string = "";  // Atributo privado que armazena o RA do aluno, inicializado com uma string vazia
    private nome: string;  // Atributo privado que armazena o nome do aluno
    private sobrenome: string;  // Atributo privado que armazena o sobrenome do aluno
    private dataNascimento: Date;  // Atributo privado que armazena a data de nascimento do aluno
    private endereco: string;  // Atributo privado que armazena o endereço do aluno
    private email: string;  // Atributo privado que armazena o email do aluno
    private celular: string;  // Atributo privado que armazena o celular do aluno

    /**
     * Construtor da classe Aluno
     * 
     * O construtor é responsável por inicializar os atributos da classe com os dados fornecidos.
     * Ele recebe os seguintes parâmetros: nome, sobrenome, data de nascimento, endereço, email e celular.
     * 
     * @param nome Nome do aluno
     * @param sobrenome Sobrenome do aluno
     * @param dataNascimento Data de nascimento do aluno
     * @param endereco Endereço do aluno
     * @param email Email do aluno
     * @param celular Celular do aluno
     */
    constructor(
        nome: string,
        sobrenome: string,
        dataNascimento: Date,
        endereco: string,
        email: string,
        celular: string
    ) {
        this.nome = nome;  // Atribui o nome do aluno ao atributo nome
        this.sobrenome = sobrenome;  // Atribui o sobrenome do aluno ao atributo sobrenome
        this.dataNascimento = dataNascimento;  // Atribui a data de nascimento do aluno ao atributo dataNascimento
        this.endereco = endereco;  // Atribui o endereço do aluno ao atributo endereco
        this.email = email;  // Atribui o email do aluno ao atributo email
        this.celular = celular;  // Atribui o celular do aluno ao atributo celular
    }

    /* Métodos de acesso aos atributos (getters e setters) */
    /**
     * Recupera o identificador único do aluno.
     * @returns O identificador único do aluno
     */
    public getIdAluno(): number {
        return this.idAluno;  // Retorna o identificador do aluno
    }

    /**
     * Define um novo valor para o identificador do aluno.
     * @param idAluno Novo identificador do aluno
     */
    public setIdAluno(idAluno: number): void {
        this.idAluno = idAluno;  // Define o identificador do aluno com o valor recebido como parâmetro
    }

    /**
     * Retorna o RA (Registro Acadêmico) do aluno.
     * @returns O RA do aluno
     */
    public getRa(): string {
        return this.ra;  // Retorna o RA do aluno
    }

    /**
     * Define o RA do aluno.
     * @param ra O RA a ser atribuído ao aluno
     */
    public setRa(ra: string): void {
        this.ra = ra;  // Define o RA do aluno com o valor recebido
    }

    /**
     * Retorna o nome do aluno.
     * @returns O nome do aluno
     */
    public getNome(): string {
        return this.nome;  // Retorna o nome do aluno
    }

    /**
     * Define o nome do aluno.
     * @param nome O nome a ser atribuído ao aluno
     */
    public setNome(nome: string): void {
        this.nome = nome;  // Define o nome do aluno com o valor recebido
    }

    /**
     * Retorna o sobrenome do aluno.
     * @returns O sobrenome do aluno
     */
    public getSobrenome(): string {
        return this.sobrenome;  // Retorna o sobrenome do aluno
    }

    /**
     * Define o sobrenome do aluno.
     * @param sobrenome O sobrenome a ser atribuído ao aluno
     */
    public setSobrenome(sobrenome: string): void {
        this.sobrenome = sobrenome;  // Define o sobrenome do aluno com o valor recebido
    }

    /**
     * Retorna a data de nascimento do aluno.
     * @returns A data de nascimento do aluno
     */
    public getDataNascimento(): Date {
        return this.dataNascimento;  // Retorna a data de nascimento do aluno
    }

    /**
     * Define a data de nascimento do aluno.
     * @param dataNascimento A data de nascimento a ser atribuída ao aluno
     */
    public setDataNascimento(dataNascimento: Date): void {
        this.dataNascimento = dataNascimento;  // Define a data de nascimento do aluno com o valor recebido
    }

    /**
     * Retorna o endereço do aluno.
     * @returns O endereço do aluno
     */
    public getEndereco(): string {
        return this.endereco;  // Retorna o endereço do aluno
    }

    /**
     * Define o endereço do aluno.
     * @param endereco O endereço a ser atribuído ao aluno
     */
    public setEndereco(endereco: string): void {
        this.endereco = endereco;  // Define o endereço do aluno com o valor recebido
    }

    /**
     * Retorna o email do aluno.
     * @returns O email do aluno
     */
    public getEmail(): string {
        return this.email;  // Retorna o email do aluno
    }

    /**
     * Define o email do aluno.
     * @param email O email a ser atribuído ao aluno
     */
    public setEmail(email: string): void {
        this.email = email;  // Define o email do aluno com o valor recebido
    }

    /**
     * Retorna o celular do aluno.
     * @returns O celular do aluno
     */
    public getCelular(): string {
        return this.celular;  // Retorna o celular do aluno
    }

    /**
     * Define o celular do aluno.
     * @param celular O celular a ser atribuído ao aluno
     */
    public setCelular(celular: string): void {
        this.celular = celular;  // Define o celular do aluno com o valor recebido
    }

    /**
     * Lista todos os alunos do banco de dados.
     * 
     * Este método executa uma consulta SQL na tabela `aluno` para retornar todos os alunos registrados no banco.
     * Cada aluno é transformado em um objeto da classe `Aluno` e adicionado a um array.
     * Caso a consulta seja bem-sucedida, a função retorna esse array de objetos `Aluno`. Caso contrário, retorna `null`.
     * 
     * @returns Um array de objetos `Aluno` ou `null` caso ocorra um erro.
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        const listaDeAlunos: Array<Aluno> = [];  // Cria um array vazio para armazenar os alunos

        try {
            const querySelectAluno = `SELECT * FROM aluno`;  // Consulta SQL para selecionar todos os alunos
            const respostaBD = await database.query(querySelectAluno);  // Executa a consulta no banco de dados

            respostaBD.rows.forEach((linha) => {  // Para cada linha retornada pela consulta
                // Cria um novo objeto `Aluno` a partir dos dados da linha
                const novoAluno = new Aluno(
                    linha.nome,  // Nome do aluno
                    linha.sobrenome,  // Sobrenome do aluno
                    new Date(linha.data_nascimento),  // Data de nascimento convertida para tipo `Date`
                    linha.endereco,  // Endereço do aluno
                    linha.email,  // Email do aluno
                    linha.celular  // Celular do aluno
                );

                novoAluno.setIdAluno(linha.id_aluno);  // Define o ID do aluno
                novoAluno.setRa(linha.ra);  // Define o RA do aluno

                listaDeAlunos.push(novoAluno);  // Adiciona o novo aluno ao array
            });

            return listaDeAlunos;  // Retorna o array de alunos
        } catch (error) {
            console.log('Erro ao buscar lista de alunos. Consulte os logs para mais detalhes.');  // Exibe mensagem de erro
            console.log(error);  // Exibe o erro detalhado
            return null;  // Retorna null se ocorrer um erro
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados.
     * 
     * Este método executa uma consulta SQL de inserção (INSERT) na tabela `aluno`, usando os dados de um objeto `Aluno` fornecido.
     * Se o cadastro for bem-sucedido, a função retorna `true`. Caso contrário, retorna `false`.
     * 
     * @param aluno O objeto `Aluno` que será cadastrado no banco de dados
     * @returns Um valor booleano indicando o sucesso ou falha da operação
     */
    static async cadastrarAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryInsertAluno = `INSERT INTO aluno 
                                      (nome, sobrenome, data_nascimento, endereco, email, celular)
                                      VALUES 
                                      ('${aluno.getNome()}',
                                       '${aluno.getSobrenome()}',
                                       '${aluno.getDataNascimento()}',
                                       '${aluno.getEndereco()}',
                                       '${aluno.getEmail()}',
                                       '${aluno.getCelular()}')
                                      RETURNING id_aluno;`;  // Comando SQL para inserir um novo aluno na tabela

            const respostaBD = await database.query(queryInsertAluno);  // Executa a consulta no banco de dados

            if (respostaBD.rowCount != 0) {  // Se houver sucesso na inserção
                console.log(`Aluno cadastrado com sucesso. ID do aluno: ${respostaBD.rows[0].id_aluno}`);  // Exibe a mensagem de sucesso
                return true;  // Retorna true para indicar sucesso
            }

            return false;  // Retorna false em caso de falha
        } catch (error) {
            console.log('Erro ao cadastrar o aluno. Consulte os logs para mais detalhes.');  // Exibe mensagem de erro
            console.log(error);  // Exibe o erro completo
            return false;  // Retorna false em caso de erro
        }
    }

    /**
     * Remove um aluno do banco de dados.
     * 
     * Este método executa uma consulta SQL de exclusão (DELETE) na tabela `aluno`, removendo o aluno identificado pelo ID fornecido.
     * Se a remoção for bem-sucedida, retorna `true`; caso contrário, retorna `false`.
     * 
     * @param id_aluno O ID do aluno a ser removido
     * @returns Um valor booleano indicando o sucesso ou falha da operação
     */
    static async removerAluno(id_aluno: number): Promise<boolean> {
        try {
            const queryDeleteAluno = `DELETE FROM aluno WHERE id_aluno = ${id_aluno}`;  // Comando SQL para remover um aluno

            const respostaBD = await database.query(queryDeleteAluno);  // Executa a consulta no banco de dados

            if (respostaBD.rowCount != 0) {  // Se houver sucesso na remoção
                console.log('Aluno removido com sucesso!');  // Exibe mensagem de sucesso
                return true;  // Retorna true para indicar sucesso
            }

            return false;  // Retorna false em caso de falha
        } catch (error) {
            console.log(`Erro ao remover aluno. Verifique os logs para mais detalhes.`);  // Exibe mensagem de erro
            console.log(error);  // Exibe o erro completo
            return false;  // Retorna false em caso de erro
        }
    }

    /**
     * Atualiza os dados de um aluno no banco de dados.
     * 
     * Este método executa uma consulta SQL de atualização (UPDATE) na tabela `aluno`, modificando os dados do aluno conforme
     * os valores fornecidos no objeto `Aluno`.
     * Se a atualização for bem-sucedida, a função retorna `true`.
     * 
     * @param aluno O objeto `Aluno` com os novos dados para atualização
     * @returns Um valor booleano indicando o sucesso ou falha da operação
     */
    static async atualizarAluno(aluno: Aluno): Promise<boolean> {
        try {
            const queryUpdateAluno = `UPDATE aluno SET 
            nome = '${aluno.getNome()}',
            sobrenome = '${aluno.getSobrenome()}',
            data_nascimento = '${aluno.getDataNascimento()}',
            endereco = '${aluno.getEndereco()}',
            email = '${aluno.getEmail()}',
            celular = '${aluno.getCelular()}'
            WHERE id_aluno = ${aluno.getIdAluno()}`;  // Comando SQL para atualizar os dados do aluno

            const respostaBD = await database.query(queryUpdateAluno);  // Executa a consulta no banco de dados

            if (respostaBD.rowCount != 0) {  // Se houver sucesso na atualização
                console.log(`Aluno atualizado com sucesso! ID do aluno: ${aluno.getIdAluno()}`);  // Exibe mensagem de sucesso
            }
            return true;  // Retorna true para indicar sucesso
        } catch (error) {
            console.log('Erro ao atualizar o aluno. Consulte os logs para mais detalhes.');  // Exibe mensagem de erro
            console.log(error);  // Exibe o erro completo
            return false;  // Retorna false em caso de erro
        }
    }
}
