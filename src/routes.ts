import { Request, Response, Router } from "express";
import { LivroController } from "./controller/LivroController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { AlunoController } from "./controller/AlunoController";

//Cria um roteador
const router = Router();

//Criando uma rota principal para a aplicação
router.get("/", (req: Request, res: Response) => {
    res.json({ mensagem: "Olá, Mundo!"});
});

/* 
* ROTAS PARA LIVROS
*/ 
// Rota para listar os livros
router.get("/listar/livro", LivroController.listar);
// Rota para cadastrar um novo livro
router.post("/novo/livro", LivroController.cadastro);

/* 
* ROTAS PARA ALUNOS
*/ 
// Rota para listar os alunos
router.get("/listar/aluno", AlunoController.listar);
// Rota para cadastrar um novo aluno
router.post("/novo/aluno", AlunoController.cadastro);

/* 
* ROTAS PARA EMPRESTIMOS
*/ 
// Rota para listar os emprestimo
router.get("/listar/emprestimo", EmprestimoController.listar);
// Rota para cadastrar um novo emprestimo

//Exportando as rotas
export { router };


