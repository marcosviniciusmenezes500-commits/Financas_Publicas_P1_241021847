import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { TrendingUp, DollarSign, BarChart3, PieChart as PieChartIcon } from 'lucide-react';

interface SeriesData {
  Ano: number;
  'Receita Total Real (R$)': number;
  'Despesa Total Real (R$)': number;
  'Receita Tributária Real': number;
  'Transferências Correntes Real': number;
}

interface MunicipalityData {
  series: SeriesData[];
}

interface IndonesiaData {
  Ano: number;
  Receita: number;
  Despesa: number;
}

interface DashboardData {
  municipios: {
    Betim: MunicipalityData;
    GovValadares: MunicipalityData;
  };
  indonesia: IndonesiaData[];
  mg_map_data: any[];
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState('Betim');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/dashboard_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar dados do dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive">{error || 'Erro ao carregar dados do dashboard'}</p>
        </div>
      </div>
    );
  }

  const municipalityData = data.municipios[selectedMunicipality as keyof typeof data.municipios];
  const series = municipalityData?.series || [];

  // Calcular KPIs
  const latestYear = series.length > 0 ? series[series.length - 1] : null;
  const previousYear = series.length > 1 ? series[series.length - 2] : null;

  const receita = latestYear?.['Receita Total Real (R$)'] || 0;
  const despesa = latestYear?.['Despesa Total Real (R$)'] || 0;
  const resultado = receita - despesa;

  const receitaVariacao = previousYear 
    ? ((receita - previousYear['Receita Total Real (R$)']) / previousYear['Receita Total Real (R$)'] * 100).toFixed(2)
    : '0';

  const despesaVariacao = previousYear
    ? ((despesa - previousYear['Despesa Total Real (R$)']) / previousYear['Despesa Total Real (R$)'] * 100).toFixed(2)
    : '0';

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const municipalityLabel = selectedMunicipality === 'Betim' ? 'Betim/MG' : 'Governador Valadares/MG';

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Fiscal</h1>
              <p className="text-muted-foreground mt-2">Análise consolidada de finanças públicas (2014-2023)</p>
            </div>
          </div>

          {/* Filtro de Município */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Selecione o município:</label>
            <Select value={selectedMunicipality} onValueChange={setSelectedMunicipality}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Betim">Betim/MG</SelectItem>
                <SelectItem value="GovValadares">Governador Valadares/MG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Receita Total Real</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(receita)}</div>
              <p className={`text-xs ${parseFloat(receitaVariacao) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {receitaVariacao}% vs ano anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Despesa Total Real</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(despesa)}</div>
              <p className={`text-xs ${parseFloat(despesaVariacao) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {despesaVariacao}% vs ano anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resultado Primário</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${resultado >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(resultado)}
              </div>
              <p className="text-xs text-muted-foreground">
                {((resultado / receita) * 100).toFixed(2)}% da receita
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Autonomia Fiscal</CardTitle>
              <PieChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {latestYear ? ((latestYear['Receita Tributária Real'] || 0) / receita * 100).toFixed(1) : 0}%
              </div>
              <p className="text-xs text-muted-foreground">Receita própria / Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="receitas">Receitas</TabsTrigger>
            <TabsTrigger value="despesas">Despesas</TabsTrigger>
            <TabsTrigger value="indonesia">Indonésia</TabsTrigger>
          </TabsList>

          {/* Tab: Visão Geral */}
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução de Receita e Despesa - {municipalityLabel}</CardTitle>
                <CardDescription>Valores reais deflacionados (Base 2023)</CardDescription>
              </CardHeader>
              <CardContent>
                {series.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Ano" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Line type="monotone" dataKey="Receita Total Real (R$)" stroke="#3b82f6" name="Receita" />
                      <Line type="monotone" dataKey="Despesa Total Real (R$)" stroke="#ef4444" name="Despesa" />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground">Sem dados disponíveis</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Receitas */}
          <TabsContent value="receitas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Composição da Receita - {municipalityLabel}</CardTitle>
                <CardDescription>Receita Tributária vs Transferências</CardDescription>
              </CardHeader>
              <CardContent>
                {series.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Ano" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Bar dataKey="Receita Tributária Real" fill="#8b5cf6" name="Receita Tributária" />
                      <Bar dataKey="Transferências Correntes Real" fill="#06b6d4" name="Transferências" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground">Sem dados disponíveis</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Despesas */}
          <TabsContent value="despesas" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Despesa Total - {municipalityLabel}</CardTitle>
                <CardDescription>Série histórica 2014-2023</CardDescription>
              </CardHeader>
              <CardContent>
                {series.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={series}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Ano" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Line type="monotone" dataKey="Despesa Total Real (R$)" stroke="#ef4444" name="Despesa Total" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground">Sem dados disponíveis</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Indonésia */}
          <TabsContent value="indonesia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Finanças Públicas da Indonésia</CardTitle>
                <CardDescription>Comparativo internacional (2014-2023)</CardDescription>
              </CardHeader>
              <CardContent>
                {data.indonesia && data.indonesia.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={data.indonesia}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Ano" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                      <Line type="monotone" dataKey="Receita" stroke="#3b82f6" name="Receita Total Real" />
                      <Line type="monotone" dataKey="Despesa" stroke="#ef4444" name="Despesa Total Real" />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-muted-foreground">Sem dados disponíveis</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
