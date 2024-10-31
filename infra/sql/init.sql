-- CREATE ALUNO - TRIGGER - FUNCTION
CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno SERIAL PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


-- CRIANDO A TABELA LIVRO
CREATE TABLE Livro (
    id_livro SERIAL PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);

-- CRIANDO A TABELA EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo SERIAL PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);

-- FAZENDO INSERT NA TABELA Aluno
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020');

INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Lucas', 'Silva', '2004-02-15', 'Rua das Flores, 123', 'lucas.silva@gmail.com', '16998765432'),
('Maria', 'Oliveira', '2005-03-10', 'Avenida Brasil, 456', 'maria.oliveira@gmail.com', '16997654321'),
('João', 'Santos', '2003-06-20', 'Rua da Paz, 789', 'joao.santos@gmail.com', '16996543210'),
('Fernanda', 'Lima', '2002-01-30', 'Rua do Sol, 101', 'fernanda.lima@gmail.com', '16995432109'),
('Pedro', 'Costa', '2001-11-25', 'Rua da Lua, 202', 'pedro.costa@gmail.com', '16994321098'),
('Juliana', 'Pereira', '2004-08-15', 'Praça das Árvores, 303', 'juliana.pereira@gmail.com', '16993210987'),
('Gabriel', 'Mendes', '2000-12-05', 'Rua do Mar, 404', 'gabriel.mendes@gmail.com', '16992109876'),
('Tatiane', 'Ferreira', '2003-05-12', 'Avenida das Flores, 505', 'tatiane.ferreira@gmail.com', '16991098765'),
('Rafael', 'Barbosa', '2002-09-30', 'Rua do Céu, 606', 'rafael.barbosa@gmail.com', '16989987654'),
('Carla', 'Nunes', '2001-04-20', 'Rua das Estrelas, 707', 'carla.nunes@gmail.com', '16988876543');

-- FAZENDO INSERT NA TABELA Livro
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível');

INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('Cem Anos de Solidão', 'Gabriel García Márquez', 'Editora Record', '1967', '978-8501081230', 10, 10, 120.00, 'Disponível'),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 'Penguin Classics', '1847', '978-0141439556', 8, 8, 75.00, 'Disponível'),
('O Grande Gatsby', 'F. Scott Fitzgerald', 'Companhia das Letras', '1925', '978-8535923524', 6, 6, 85.00, 'Disponível'),
('A Metamorfose', 'Franz Kafka', 'Companhia das Letras', '1915', '978-8535931550', 12, 12, 45.00, 'Disponível'),
('Crime e Castigo', 'Fiódor Dostoiévski', 'Editora 34', '1866', '978-8577260519', 7, 7, 100.00, 'Disponível'),
('A Guerra dos Tronos', 'George R.R. Martin', 'Editora Leya', '1996', '978-8580572345', 9, 9, 110.00, 'Disponível'),
('A Menina que Roubava Livros', 'Markus Zusak', 'Editora Intrínseca', '2005', '978-8580571492', 5, 5, 70.00, 'Disponível'),
('O Alquimista', 'Paulo Coelho', 'Editora Rocco', '1988', '978-8573022477', 7, 7, 55.00, 'Disponível'),
('O Nome da Rosa', 'Umberto Eco', 'Editora Record', '1980', '978-8501061942', 4, 4, 90.00, 'Disponível'),
('Admirável Mundo Novo', 'Aldous Huxley', 'Companhia das Letras', '1932', '978-8535924118', 3, 3, 80.00, 'Disponível');

-- FAZENDO INSERT NA TABELA Emprestimo
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento');


INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 3, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 4, '2024-09-03', '2024-09-17', 'Em andamento'),
(4, 5, '2024-09-04', '2024-09-18', 'Em andamento'),
(5, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 7, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 9, '2024-09-08', '2024-09-22', 'Em andamento'),
(9, 10, '2024-09-09', '2024-09-23', 'Em andamento'),
(10, 1, '2024-09-10', '2024-09-24', 'Em andamento');

