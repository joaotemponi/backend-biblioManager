import pg from 'pg';  // Importa o módulo 'pg' para trabalhar com o banco de dados PostgreSQL, fornecendo funções para conectar, consultar e gerenciar o banco.
import dotenv from 'dotenv';  // Importa o módulo 'dotenv' para carregar variáveis de ambiente de um arquivo .env, mantendo as credenciais seguras.

dotenv.config();  // Carrega as variáveis de ambiente do arquivo .env para o processo, tornando as credenciais de banco de dados acessíveis através de `process.env`.

 /**
  * Classe que representa o modelo de banco de dados.
  * Esta classe abstrai a conexão com o banco de dados e oferece métodos para testar a conexão e acessar o pool de conexões.
  */
export class DatabaseModel {

    /**
     * Configuração para conexão com o banco de dados.
     * Este objeto contém todas as informações necessárias para configurar a conexão com o banco de dados.
     */
    private _config: object;

    /**
     * Pool de conexões com o banco de dados.
     * O pool é responsável por gerenciar múltiplas conexões com o banco de dados, reutilizando conexões em vez de abrir novas a cada requisição.
     */
    private _pool: pg.Pool;

    /**
     * Cliente de conexão com o banco de dados.
     * O cliente é uma conexão individual com o banco de dados, usada para realizar operações mais específicas.
     */
    private _client: pg.Client;

    /**
     * Construtor da classe DatabaseModel.
     * Inicializa a configuração do banco de dados, o pool de conexões e o cliente de conexão.
     */
    constructor() {
        // Configuração padrão para conexão com o banco de dados. As informações são carregadas de variáveis de ambiente.
        this._config = {
            user: process.env.DB_USER,  // Usuário do banco de dados
            host: process.env.DB_HOST,  // Endereço do servidor de banco de dados
            database: process.env.DB_NAME,  // Nome do banco de dados
            password: process.env.DB_PASSWORD,  // Senha do banco de dados
            port: process.env.DB_PORT,  // Porta do banco de dados
            max: 10,  // Número máximo de conexões no pool
            idleTimoutMillis: 10000  // Tempo limite em milissegundos para uma conexão ociosa ser descartada
        }

        // Inicializa o pool de conexões com as configurações fornecidas
        this._pool = new pg.Pool(this._config);

        // Inicializa o cliente de conexão com as configurações fornecidas
        this._client = new pg.Client(this._config);
    }

    /**
     * Método para testar a conexão com o banco de dados.
     * Este método tenta conectar ao banco de dados e retorna `true` se a conexão for bem-sucedida ou `false` em caso de falha.
     *
     * @returns **true** caso a conexão tenha sido feita, **false** caso negativo
     */
    public async testeConexao() {
        try {
            // Tenta conectar ao banco de dados usando o cliente
            await this._client.connect();
            console.log('Database connected!');  // Exibe uma mensagem no console indicando que a conexão foi bem-sucedida
            this._client.end();  // Encerra a conexão após o teste (não é necessário manter a conexão aberta)
            return true;  // Retorna true para indicar que a conexão foi bem-sucedida
        } catch (error) {
            // Em caso de erro ao tentar conectar, exibe uma mensagem de erro
            console.log('Error to connect database X( ');
            console.log(error);  // Exibe detalhes do erro no console
            this._client.end();  // Encerra a conexão, mesmo em caso de erro
            return false;  // Retorna false para indicar que houve um erro na conexão
        }
    }

    /**
     * Getter para o pool de conexões.
     * Este método permite acessar o pool de conexões para realizar consultas e outras operações no banco de dados.
     */
    public get pool() {
        return this._pool;  // Retorna o pool de conexões para que possa ser utilizado em outras partes do código
    }
}
