# Financas_Publicas_P1_241021847
Arquivos e base de dados do trabalho da P1 de Finanças Públicas - Matrícula 241021847

---

## 📌 Sobre o Projeto
Este repositório cumpre o requisito de transparência de dados e contém toda a base estrutural, documentação metodológica e os arquivos finais referentes à Avaliação P1. 

O trabalho consiste em um diagnóstico fiscal, econométrico e socioeconômico abrangendo:
- **Nível Macro (Governo Central):** Indonésia
- **Nível Micro (Entes Subnacionais):** Betim (MG) e Governador Valadares (MG)

A análise empírica cobre a série histórica de 10 anos (2014-2023) e utiliza dados reais deflacionados, cruzando os resultados estatísticos com o referencial teórico de Finanças Públicas e Administração Pública Gerencial (Bresser-Pereira, Biderman & Arvate, Giambiagi & Além, entre outros).

## 📂 Estrutura do Repositório
Para garantir a integridade, auditoria e reprodutibilidade da análise, o repositório está organizado em uma estrutura de raiz limpa:

* 📄 **`Dados_Financas_P1_241021847.xlsx`**: Base de dados consolidada com os cálculos deflacionados, regressões (IDEB, Elasticidade PIB) e a modelagem da Curva de Laffer.
* 📄 **`PROVA 1 - FSP - 241021847.docx`**: Arquivo final com as análises críticas e o Dashboard de Diagnóstico Integrado.
* 📁 **`/dados_brutos`**: Contém os arquivos originais (sem tratamento) extraídos das fontes oficiais (Siconfi/STN, IBGE, Banco Mundial, FMI).
* 📁 **`/metodologia`**: Dicionários de dados e documentos metodológicos (`.md`) explicando as fórmulas matemáticas utilizadas para a deflação dos valores nominais e a construção das variáveis *proxy*.
* 📁 **`/processamento_auxiliar`**: Planilhas e tabelas de rascunho de apoio à estruturação das respostas.

## 🛠️ Metodologia e Transparência
Em conformidade com a exigência da avaliação, todos os valores financeiros apresentados nos modelos foram ajustados para a inflação (trazidos a valor presente, com ano-base em 2023) utilizando o IPCA (para o Brasil) e o CPI (para a Indonésia), evitando distorções analíticas nominais. Os detalhes dos cálculos podem ser consultados na pasta `/metodologia`.
