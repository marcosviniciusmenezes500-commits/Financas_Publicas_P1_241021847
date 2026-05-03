# Metodologia de Deflação de Dados Fiscais

Este documento detalha a metodologia utilizada para a conversão de valores nominais em valores reais (deflacionados) na base de dados deste projeto, cumprindo os requisitos de análise de finanças públicas em termos reais.

---

## 1. A Lógica Econômica

Devido ao fenômeno da inflação, a moeda perde poder de compra ao longo do tempo. Analisar o crescimento das receitas ou despesas públicas utilizando apenas valores nominais (o valor exato arrecadado no ano em questão) gera uma distorção analítica, pois não reflete o aumento real da capacidade de financiamento do Estado.

Para garantir uma análise crítica e precisa da série histórica de 10 anos, foi necessário "trazer a valor presente" todos os montantes do passado, convertendo-os para o seu equivalente no ano-base mais recente (2023). O nome técnico desse processo é **deflação**.

---

## 2. A Fórmula Matemática

A conversão utiliza a proporção de crescimento de um índice de preços (como o CPI para a Indonésia ou o IPCA para o Brasil). A fórmula matemática aplicada aos dados é a seguinte:
Valor Real = Valor Nominal * (Índice do Ano-Base/Índice do Ano da Coleta)
ou
$$\text{Valor Real} = \text{Valor Nominal} \times \left( \frac{\text{Índice do Ano-Base}}{\text{Índice do Ano da Coleta}} \right)$$

O termo entre parênteses representa o **Fator de Deflação** (ou Fator de Atualização).

---

## 3. Implementação e Cálculo no Excel

Para automatizar a conversão na base de dados (arquivo `.xlsx` anexo a este repositório), a seguinte estrutura lógica foi aplicada:

### Passo A: Encontrando o Fator de Deflação
Foi criada uma coluna específica para calcular o multiplicador de cada ano. Se o nosso **Ano-Base é 2023** (localizado, por exemplo, na linha 11 da planilha) e estamos calculando o fator para o ano de **2014** (linha 2):

*   **Fórmula no Excel:** `=$C$11 / C2`
*   **Explicação:** A célula `$C$11` (Índice de 2023) é "travada" com os cifrões como referência absoluta. Assim, ao arrastar a fórmula para os demais anos, o Excel sempre dividirá a inflação atual pela inflação do ano correspondente na linha.

### Passo B: Calculando o Valor Real
Com o Fator de Deflação calculado, basta multiplicá-lo pelo valor nominal original daquele ano.

*   **Fórmula no Excel:** `=D2 * F2`
*   **Explicação:** A célula `D2` (Receita Nominal em 2014) é multiplicada pela célula `F2` (Fator de Deflação de 2014). O resultado é a receita exata que o ente federativo teria em 2014 se o dinheiro daquela época tivesse o mesmo poder de compra de 2023.

> **Nota Metodológica:** Este mesmo processo de deflação foi aplicado de maneira uniforme para o cálculo do Produto Interno Bruto (PIB) e das Despesas Totais, garantindo a comparabilidade e a consistência exigidas para a modelagem econométrica (Curva de Laffer e Regressão Linear) nas etapas posteriores deste trabalho.