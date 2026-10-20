# Goulart — landing page

Página responsiva em HTML, CSS e JavaScript, sem dependências ou build.

## Visualizar

Abra `index.html` no navegador ou sirva esta pasta com um servidor local.

## Estrutura e direção visual

A hero usa uma paisagem rural panorâmica, a mensagem “Defesa jurídica para quem vive do campo.” e uma explicação direta sobre dívidas, contratos e defesa em juízo. O contato com a equipe é a ação principal; conhecer a atuação é a ação secundária. A entrada combina revelação do título, revelação suave da fotografia e aparição dos textos, sem animações em repetição.

O navbar fica disponível durante a navegação, adota um fundo claro ao rolar e indica a seção atual. O menu de áreas oferece quatro atalhos que selecionam o serviço correspondente. No celular e no tablet, torna-se um menu expansível.

O botão do navbar usa o ícone enviado da **Justina**, o texto “Acessar Justina” e a identificação “Área de parceiros”. Não exibe aviso de lançamento. O acesso abre `justina.html`, refatorada com a logo completa sobre fundo claro e um painel verde que informa o desenvolvimento e a indisponibilidade do login. O futuro acesso por login e senha é exclusivo para parceiros comerciais. A página oferece retorno ao site e contato com a equipe; funciona sem JavaScript e não possui campos nem coleta de credenciais. Quando a plataforma for lançada, atualizar os destinos dos acessos desktop, móvel e alternativo sem JavaScript para a URL real.

As quatro seções seguintes organizam o conteúdo:

1. **Atuação:** cabeçalho amplo, seletor integrado de quatro áreas e um painel que combina fotografia rural e conteúdo detalhado. Cada área explica o trabalho, apresenta situações concretas e oferece contato pelo assunto escolhido.
2. **Escritório e método:** apresentação institucional em duas colunas e uma sequência de atendimento sobre um painel claro. No desktop, as etapas seguem uma linha horizontal; no celular, tornam-se uma sequência vertical.
3. **Presença nacional:** mapa vetorial do Brasil inspirado no mapa físico enviado pelo cliente, com limites estaduais em bronze e sede em Chapecó identificada. A entrada desenha os contornos e revela os pontos uma única vez. Um seletor destaca as cinco regiões, informa as UFs e permite restaurar a visão do país. A redação valoriza a confiança de produtores de diferentes regiões, conforme informado pelo cliente, sem exibir contagens.
4. **Contato:** ação principal pelo WhatsApp e um painel com endereço e documentos para a análise inicial. A orientação sobre documentos começa aberta e pode ser recolhida.

O cliente confirmou que não dispõe de uma contagem consolidada nem de uma relação de cidades/estados com clientes. Os pontos do mapa são ilustrativos, como indicado na legenda, e não correspondem a endereços, quantidades ou distribuição efetiva de clientes. O seletor destaca a abrangência do atendimento nacional, sem atribuir clientes às UFs. A geometria simplificada vem da [API de Malhas Geográficas do IBGE](https://servicodados.ibge.gov.br/api/docs/malhas?versao=3), [Brasil com divisões estaduais](https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?intrarregiao=UF&formato=application/vnd.geo%2Bjson&qualidade=minima), consultada em 17/10/2026. A geometria foi projetada e incorporada como SVG no HTML; não existe consulta externa em tempo de execução.

O rodapé reúne marca, posicionamento, navegação, Instagram, LinkedIn e WhatsApp em uma composição de três colunas no desktop. No celular, os grupos se empilham e os links de navegação se distribuem em linhas. O botão flutuante de WhatsApp permanece disponível, com área de toque de 56 px no celular, foco visível e margem para a área segura da tela.

A composição usa uma largura comum, colunas alinhadas, verde profundo, branco mineral, verde suave e bronze. Lora 500 nos títulos principais e Source Sans 3 nos títulos de conteúdo e textos. Fontes locais e licenças SIL OFL em `assets/fonts/`.

O foco é atender produtores rurais, com explicações específicas sobre contencioso cível e bancário, crédito e dívidas, contratos e relações agrárias. Não há afirmação sobre qual área representa a maior parte da atuação. Informações de serviços, endereço e documentos não foram repetidas em dobras adicionais.

## Imagens

A hero usa `assets/produtor-rural-v1.jpg`. O painel de atuação usa `assets/documentos-no-campo-v1.jpg`, em escala maior no desktop e como faixa fotográfica no celular. As duas cenas são ilustrativas, criadas anteriormente com a ferramenta integrada `image_gen`; não representam clientes reais. Originais PNG e prompts em `assets/imagens-rurais-prompts.md` foram preservados.

A identidade da Justina usa os PNGs fornecidos pelo cliente em `assets/justina/logo.png` e `assets/justina/icone.png`. Os arquivos foram copiados sem alteração; seus espaços transparentes são compensados nos elementos de apresentação em CSS. O ícone aparece no navbar e no favicon da página Justina; a logo completa aparece na apresentação. O monograma provisório foi removido.

A marca do escritório agora usa os contornos oficiais do PDF fornecido pelo cliente em 20/10/2026. As imagens JPEG recebidas foram usadas para conferir o símbolo isolado e o selo circular. O navbar usa uma composição horizontal feita com esses mesmos contornos e alterna entre texto claro e verde conforme o fundo. A seção do escritório exibe o selo circular; o rodapé usa a assinatura completa com o símbolo acima do nome e “Direito agrário e do agronegócio”. O retorno ao escritório na Justina usa a mesma identidade, e o favicon traz o símbolo. Os SVGs não têm fundo e mantêm a nitidez em qualquer resolução; há também PNGs grandes com transparência em `assets/goulart/`. Detalhes de uso e dimensões estão no README dessa pasta.

Não há imagens nem fontes remotas usadas na página.

## Interação e acessibilidade

- Hero com uma sequência de entrada e fotografia em toda a largura.
- Seletor de áreas com `aria-pressed`, foco visível, anúncio da seleção e transição de conteúdo.
- Assunto selecionado identificado na seção de contato e usado para preencher uma mensagem no WhatsApp; o envio é feito pelo visitante.
- Botões “Fale com a equipe”, contato do rodapé e botão flutuante abrem `https://wa.me/5549998126093`. Número confirmado pelo cliente: +55 49 99812-6093.
- Instagram e LinkedIn com ícones SVG locais e nomes acessíveis. Links externos abrem em nova aba.
- Indicador do processo sincronizado à leitura, horizontal no desktop e vertical no celular.
- Mapa nacional com 27 divisões estaduais, seleção de região por botões nativos, `aria-pressed`, descrição e anúncio de seleção. A animação inicia quando o mapa entra na tela e termina sem repetição contínua; com movimento reduzido ou sem JavaScript, o mapa permanece estático e legível.
- Documentos em um único expansível nativo.
- Navbar com indicação de seção, menu de serviços e abertura animada.
- Menu móvel com foco inicial, fechamento por Escape, clique fora e saída do foco; adaptação entre desktop e celular.
- Preferência por movimento reduzido nas animações CSS e JavaScript.
- Navegação por âncoras e todas as áreas disponíveis com JavaScript desabilitado.

As verificações de estrutura, medidas tipográficas e estado no DOM não substituem uma revisão visual no navegador.

## Conteúdo e publicação

Base institucional: [perfil oficial no LinkedIn](https://br.linkedin.com/company/goulartadvocacia), complementado pelas orientações do cliente. Marca oficial em curvas fornecida pelo cliente, redes sociais já informadas e contato pelo WhatsApp fornecido pelo cliente. Não há formulário nem coleta de dados. Confirmar a redação institucional, o escopo dos serviços e a identificação profissional/OAB antes da publicação. Não há depoimentos, resultados ou promessa de êxito inventados.
