import { Request, Response, Router } from "express";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { AlunoController } from "./controller/AlunoController";

//Cria um roteador
const router = Router();

//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!" });
});

/* 
* ROTAS PARA LIVROS
*/

// Rota para listar os livros
router.get("/listar/livro", LivroController.listar);
// Rota para cadastrar um novo livro
router.post("/novo/livro", LivroController.cadastro);
// Rota para remover um novo livro
router.delete("/remover/livro/:idLivro", LivroController.remover);
// Rota para atualizar um livro
router.put("/atualizar/livro/:idLivro", LivroController.atualizar);
/* 
* ROTAS PARA ALUNOS
*/

// Rota para listar os alunos
router.get("/listar/aluno", AlunoController.listar);
// Rota para cadastrar um novo aluno
router.post("/novo/aluno", AlunoController.cadastro);
// Rota para remover um aluno
router.delete("/remover/aluno/:idAluno", AlunoController.remover);
// Rota para atualizar um aluno
router.put("/atualizar/aluno/:idAluno", AlunoController.atualizar);

/* 
* ROTAS PARA EMPRESTIMOS
*/
// Rota para listar os emprestimo
router.get("/listar/emprestimo", EmprestimoController.listar);
// Rota para cadastrar um novo emprestimo
router.post("/novo/emprestimo", EmprestimoController.cadastro);
// Rota para atualizar o emprestimo
router.put("/atualizar/emprestimo/:idEmprestimo", EmprestimoController.atualizar);


//Exportando as rotas
export { router };


