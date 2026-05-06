import pandas as pd
import numpy as np
import geopandas as gpd
import matplotlib.pyplot as plt
import zipfile
import os

# Configurações
zip_dir = '/home/ubuntu/Financas_Publicas_P1_241021847/dados_zipados'
geojson_path = '/home/ubuntu/minas_gerais_municipios.json'
output_map = 'q8_mapa_tematico_mg_final.png'

def extract_and_sum_revenue(year):
    zip_path = os.path.join(zip_dir, f'{year}_Receitas_Municipios_MG.zip')
    if not os.path.exists(zip_path):
        print(f"Arquivo não encontrado: {zip_path}")
        return None
    
    with zipfile.ZipFile(zip_path, 'r') as z:
        with z.open('finbra.csv') as f:
            df = pd.read_csv(f, sep=';', encoding='latin1', skiprows=4)
            df_total = df[df['Identificador da Conta'] == 'siconfi-cor_ReceitasExcetoIntraOrcamentarias'].copy()
            df_total['Valor'] = df_total['Valor'].astype(str).str.replace(',', '.').astype(float)
            df_resumo = df_total[['Cod.IBGE', 'População', 'Valor']].copy()
            df_resumo['Receita_per_Capita'] = df_resumo['Valor'] / df_resumo['População']
            return df_resumo

# Processar dados de 2023
print("Processando dados de 2023...")
df_2023 = extract_and_sum_revenue(2023)

if df_2023 is not None:
    print("Carregando GeoJSON...")
    gdf_mg = gpd.read_file(geojson_path)
    df_2023['Cod.IBGE'] = df_2023['Cod.IBGE'].astype(str)
    gdf_mg['id'] = gdf_mg['id'].astype(str)
    
    print("Realizando merge dos dados...")
    gdf_merged = gdf_mg.merge(df_2023, left_on='id', right_on='Cod.IBGE', how='left')
    
    print("Gerando o mapa...")
    fig, ax = plt.subplots(1, 1, figsize=(15, 12))
    
    # Plotar municípios sem dados em cinza
    gdf_merged.plot(ax=ax, color='lightgrey', edgecolor='white', linewidth=0.1)
    
    # Plotar dados de receita per capita
    gdf_merged.dropna(subset=['Receita_per_Capita']).plot(
        column='Receita_per_Capita',
        ax=ax,
        legend=True,
        cmap='YlOrRd',
        scheme='quantiles',
        k=5,
        legend_kwds={'title': "Receita per Capita (R$)", 'loc': 'lower right', 'fmt': "{:.0f}"},
        edgecolor='black',
        linewidth=0.1
    )
    
    # Marcar Betim e Governador Valadares
    # Betim: 3106705, Gov. Valadares: 3127701
    betim = gdf_merged[gdf_merged['id'] == '3106705']
    gv = gdf_merged[gdf_merged['id'] == '3127701']
    
    if not betim.empty:
        centroid = betim.geometry.centroid.iloc[0]
        ax.annotate('Betim', xy=(centroid.x, centroid.y), xytext=(3, 3), 
                    textcoords="offset points", fontsize=12, fontweight='bold', color='blue')
        betim.plot(ax=ax, color='none', edgecolor='blue', linewidth=2)
        
    if not gv.empty:
        centroid = gv.geometry.centroid.iloc[0]
        ax.annotate('Gov. Valadares', xy=(centroid.x, centroid.y), xytext=(3, 3), 
                    textcoords="offset points", fontsize=12, fontweight='bold', color='green')
        gv.plot(ax=ax, color='none', edgecolor='green', linewidth=2)

    plt.title('Mapa Temático: Receita per Capita nos Municípios de Minas Gerais (2023)\nLocalização de Betim e Governador Valadares', fontsize=16)
    ax.set_axis_off()
    
    plt.tight_layout()
    plt.savefig(output_map, dpi=300)
    print(f"Mapa salvo em: {output_map}")
else:
    print("Falha ao processar dados.")
