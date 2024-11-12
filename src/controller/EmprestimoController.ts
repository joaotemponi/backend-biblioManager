import { Request, Response } from "express";
import { Emprestimo } from "../model/Emprestimo";

interface EmprestimoDTO {
    idAluno: number,
    idLivro: number,
    dataEmprestimo: Date,
    dataDevolucao: Date,
    statusEmprestimo: string 
}

export class EmprestimoController extends Emprestimo {

    static async listar(req: Request, res: Response): Promise<any> {
        try {
            // Acessa a função de listar os empréstimos e armazena o resultado
            const listaDeEmprestimos = await Emprestimo.listarEmprestimos();

            // Retorna a lista de empréstimos para quem fez a requisição
            return res.status(200).json(listaDeEmprestimos);
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log('Erro ao acessar listagem de empréstimos');

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível acessar a listagem de empréstimos" });
        }
    }

    static async cadastro(req: Request, res: Response): Promise<any> {
        try {
            // Recuperando informações do corpo da requisição e colocando em um objeto da interface EmprestimoDTO
            const emprestimoRecebido: EmprestimoDTO = req.body;

            // Chama a função de cadastro passando os parâmetros necessários
            const respostaClasse = await Emprestimo.cadastrarEmprestimo(
                emprestimoRecebido.idAluno,
                emprestimoRecebido.idLivro,
                emprestimoRecebido.dataEmprestimo,
                emprestimoRecebido.dataDevolucao,
                emprestimoRecebido.statusEmprestimo
            );

            // Verifica a resposta da função
            if (respostaClasse) {
                // Retorna uma mensagem de sucesso
                return res.status(200).json({ mensagem: "Empréstimo cadastrado com sucesso!" });
            } else {
                // Retorna uma mensagem de erro
                return res.status(400).json({ mensagem: "Erro ao cadastrar o empréstimo. Entre em contato com o administrador do sistema." });
            }
        } catch (error) {
            // Lança uma mensagem de erro no console
            console.log(`Erro ao cadastrar um empréstimo. ${error}`);

            // Retorna uma mensagem de erro para quem fez a requisição
            return res.status(400).json({ mensagem: "Não foi possível cadastrar o empréstimo. Entre em contato com o administrador do sistema." });
        }
    }
}
