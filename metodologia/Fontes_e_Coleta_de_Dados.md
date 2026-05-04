# Dicionário de Dados e Metodologia de Coleta

Este documento detalha as fontes oficiais e os parâmetros metodológicos utilizados para a extração dos dados reais que compõem a base deste projeto de Finanças Públicas. Todos os dados coletados respeitam a janela temporal de análise exigida, focando no período de 10 anos mais recente disponível (2014 a 2023).

---

## 1. Escopo e Parâmetros da Coleta

*   **Período de Análise:** 10 anos (2014 a 2023).
*   **País Atribuído:** Indonésia.
*   **Municípios Analisados:** Betim (MG) e Governador Valadares (MG).
    *   *Nota Metodológica:* Houve um ajuste na definição original da prova. O município de Volta Redonda (RJ) foi substituído por Governador Valadares (MG) para cumprir estritamente a regra que exige que ambos os municípios avaliados pertençam ao mesmo ente federativo (estado).

---

## 2. Dados Macroeconômicos (Indonésia)

A coleta dos dados em nível de Governo Central buscou variáveis que refletissem o desempenho econômico e o balanço fiscal do país.

*   **Produto Interno Bruto (PIB Nominal):**
    *   **Fonte:** Banco Mundial (World Bank Open Data).
    *   **Indicador:** GDP (current LCU) - Valores nominais em Rúpias Indonésias (IDR).
*   **Receita e Despesa do Governo Geral:**
    *   **Fonte:** Fundo Monetário Internacional (FMI) - World Economic Outlook (WEO) Database.
    *   **Indicadores:** General government revenue (National currency) e General government total expenditure (National currency).
*   **Índice de Inflação (CPI):**
    *   **Fonte:** Banco Mundial (World Bank Open Data).
    *   **Indicador:** Consumer price index (2010 = 100). Utilizado para calcular o Fator de Deflação da economia indonésia.

---

## 3. Dados Microeconômicos (Municípios Brasileiros)

A coleta em nível municipal exigiu a consolidação de relatórios fiscais padronizados e métricas demográficas oficiais.

*   **Receitas e Despesas Orçamentárias:**
    *   **Fonte:** Secretaria do Tesouro Nacional (STN) - Portal Siconfi (Sistema de Informações Contábeis e Fiscais do Setor Público Brasileiro) / FINBRA.
    *   **Metodologia de Extração:** Foram utilizados os relatórios anuais de execução. Para a Receita, filtrou-se pela conta "Total Receitas" na coluna de "Receitas Brutas Realizadas". Sempre foi priorizada a versão Retificada/Homologada mais recente enviada pelos municípios para garantir a precisão legal do dado.
*   **População (Série Histórica):**
    *   **Fonte primária:** Instituto Brasileiro de Geografia e Estatística (IBGE) - Estimativas de População.
    *   **Metodologia:** Os dados populacionais foram extraídos diretamente dos metadados consolidados no arquivo `.csv` do próprio Siconfi para os respectivos exercícios, garantindo o alinhamento com a base fiscal.
*   **Índice de Inflação Brasileiro (IPCA):**
    *   **Fonte:** Instituto de Pesquisa Econômica Aplicada (Ipeadata) com base primária do IBGE.
    *   **Indicador:** Preços - IPCA - Geral - Índice (dez. 1993 = 100).
    *   **Metodologia de Extração:** Foi capturado o Número-Índice estritamente do mês de **Dezembro** de cada ano da série (2014-2023). A escolha pelo mês 12 justifica-se por este refletir a inflação acumulada de todo o exercício fiscal do ano correspondente, sendo a base matematicamente correta para a deflação das contas públicas anuais.
