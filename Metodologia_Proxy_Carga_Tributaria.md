# Metodologia de Cálculo: Proxy de Carga Tributária

Este documento detalha o raciocínio metodológico e a estruturação matemática utilizados para calcular a variável indicativa de Carga Tributária Municipal. Esta variável foi fundamental para a construção empírica da Curva de Laffer exigida na avaliação de Finanças Públicas.

## 1. Conceito e Justificativa Teórica

Na teoria econômica do Setor Público, a Curva de Laffer correlaciona a "Taxa de Imposto" (alíquota) com a "Receita Arrecadada". O objetivo é encontrar o ponto ótimo de tributação onde a receita é maximizada sem gerar desincentivos econômicos.

Contudo, na prática da gestão municipal brasileira, **não existe uma alíquota única**. Um município arrecada impostos com bases de cálculo e alíquotas altamente variáveis (como o IPTU, que varia por zoneamento, e o ISS, que varia de 2% a 5% dependendo do serviço). 

Para contornar essa limitação contábil e testar o modelo empiricamente, a econometria utiliza o conceito de **Variável Proxy** — uma variável substituta que, embora não seja o fenômeno exato, possui forte correlação com ele e serve para representá-lo. Neste projeto, a *proxy* escolhida para representar a "Taxa de Imposto" foi o **Esforço Fiscal** do município, ou seja, o percentual da riqueza local que a prefeitura efetivamente extrai na forma de impostos.

## 2. A Fórmula Matemática

A proxy de carga tributária foi calculada através da razão entre a arrecadação própria gerada pelo poder de império do município e a base de riqueza disponível. 

A fórmula matemática aplicada aos dados deflacionados foi:

$$\text{Proxy de Carga Tributária (\%)} = \left( \frac{\text{Receita Tributária Real}}{\text{Base de Riqueza Local (PIB ou Receita Total)}} \right) \times 100$$

*Nota: Para fins de simplificação do modelo municipal, a "Receita Tributária Real" engloba essencialmente os impostos diretos (IPTU, ISS, ITBI e Taxas).*

## 3. Implementação e Cálculo no Excel

Para automatizar a geração desta variável no banco de dados (arquivo `.xlsx` do repositório), a seguinte estrutura lógica foi aplicada na aba dedicada à Regressão da Questão 6:

1. **Definição das Colunas Base:**
   - **Coluna A:** Ano (2014 a 2023).
   - **Coluna B:** Base de Riqueza (PIB Municipal deflacionado ou Receita Total deflacionada).
   - **Coluna C:** Receita Tributária Real (Extraída da rubrica `1.1.0.0.00.00.00 - Receita Tributária` do Siconfi, deflacionada pelo IPCA).

2. **Criação da Variável Proxy (Eixo X):**
   - Foi criada a **Coluna D (Proxy de Carga Tributária)**.
   - Fórmula aplicada no Excel (exemplo para a linha 2): `=C2 / B2`
   - A coluna foi formatada para exibição em Percentual (`%`).

## 4. Aplicação no Modelo Econométrico (Curva de Laffer)

Com a variável *proxy* devidamente calculada, os dados foram inseridos em um gráfico de dispersão (*scatter plot*). 
- O **Eixo X** (Variável Independente) foi alimentado com a **Proxy de Carga Tributária**.
- O **Eixo Y** (Variável Dependente) foi alimentado com a **Receita Tributária Real**.

Em seguida, foi traçada uma linha de tendência **Polinomial de Ordem 2 (Quadrática)**, gerando a equação $y = ax^2 + bx + c$, formato matemático indispensável para verificar a existência visual e estatística da parábola teórica proposta por Arthur Laffer.