const { Builder, By, Key, until } = require('selenium-webdriver');

jest.setTimeout(60000);

describe('Testes do Portal da UFRRJ', () => {

    let driver;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        await driver.get('https://portal.ufrrj.br/');
    });

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 3000))
        await driver.quit();
    });

    describe('Testes de verificação de elementos presentes na página', () => {
        it('deve verificar corretamente que os elementos do navbar estão presentes com o texto correto', async () => {
            let A_UFRRJ = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-1118"]/a/span')), 30000).getText();

            let GRADUACAO = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-2071"]/a/span')), 30000).getText();

            let POS_GRADUACAO = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-1098"]/a/span')), 30000).getText();

            let ASSUNTOS_ESTUDANTIS = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-1114"]/a')), 30000).getText();

            let EXTENSAO = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-6"]/a/span')), 30000).getText();

            let FINANCEIRO = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-8202"]/a/span')), 30000).getText();
            
            let SERVICOS = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-47070"]/a/span')), 30000).getText();

            let ACESSO_A_INFORMACAO = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-44937"]/a')), 30000).getText();

            let SIG = await driver.wait(until.elementLocated(By.xpath('//*[@id="menu-item-13015"]/a')), 30000).getText();
            
            expect(A_UFRRJ).toEqual("A UFRRJ");
            expect(GRADUACAO).toEqual("GRADUAÇÃO");
            expect(POS_GRADUACAO).toEqual("PÓS-GRADUAÇÃO");
            expect(ASSUNTOS_ESTUDANTIS).toEqual("ASSUNTOS ESTUDANTIS");
            expect(EXTENSAO).toEqual("EXTENSÃO");
            expect(FINANCEIRO).toEqual("FINANCEIRO");
            expect(SERVICOS).toEqual("SERVIÇOS");
            expect(ACESSO_A_INFORMACAO).toEqual("ACESSO À INFORMAÇÃO");
            expect(SIG).toEqual("SIG");
        });

        it('deve verificar corretamente que o título, ao clicar em A UFRRJ, está presente', async () =>{
            const A_UFRRJ = await driver.findElement(By.xpath('//*[@id="menu-item-1118"]/a')).click();
    
            const titulo_A_UFRRJ = await driver.wait(until.elementLocated(By.xpath('//*[@id="wrap"]/div[4]/h2')), 10000);

            const displayed = await titulo_A_UFRRJ.isDisplayed();

            expect(displayed).toBe(true);
        });

        it('deve verificar corretamente que a logo da UFRRJ está presente na página principal', async () => {
            const image = await driver.findElement(By.xpath('//*[@id="wrap"]/header/div[3]/div/div[1]/a/div'));
            const displayed = await image.isDisplayed();
            expect(displayed).toBe(true)
        });

        it('deve verificar corretamente que o link NOTÍCIAS | Divulgação científica, Ações acadêmicas, Arte e Cultura está visível na página principal e clicar nele', async () =>{
            await driver.get('https://portal.ufrrj.br/');
            const noticiasLink = await driver.wait(until.elementLocated(By.css('a[title="NOTÍCIAS | Divulgação científica, Ações acadêmicas, Arte e Cultura"]')), 30000);

            // Rola até o elemento
            await driver.executeScript("arguments[0].scrollIntoView(true);", noticiasLink);
            await noticiasLink.click();

            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toBe('https://portal.ufrrj.br/institucional/noticias/');
        })
    });

    describe('Testes de busca no site', () => {
        it('deve pesquisar "sistemas de informação" e clicar no elemento: Resultado da 1ª Etapa do Edital nº15/2023 – PET – Sistemas de Informação – Seleção de bolsistas e não bolsistas', async () => {
            await driver.get('https://portal.ufrrj.br/');
            const searchInput = await driver.wait(until.elementLocated(By.css('input[aria-label="Search input"]')), 30000);
            await searchInput.sendKeys('sistemas de informação');
            await searchInput.sendKeys(Key.ENTER);

            await driver.sleep(3000);

            const link = await driver.findElement(By.css('a[href="https://portal.ufrrj.br/resultado-da-1a-etapa-do-edital-no15-2023-pet-sistemas-de-informacao-selecao-de-bolsistas-e-nao-bolsistas/"]'));
            await link.click();

            const currentUrl = await driver.getCurrentUrl();
            expect(currentUrl).toBe('https://portal.ufrrj.br/resultado-da-1a-etapa-do-edital-no15-2023-pet-sistemas-de-informacao-selecao-de-bolsistas-e-nao-bolsistas/');
        });

        it('deve pesquisar "matemática" e clicar no elemento: Grupo de pesquisa em Educação Matemática da UFRRJ faz integração Universidade-Escola', async () => {
            await driver.get('https://portal.ufrrj.br/');
            const searchInput = await driver.wait(until.elementLocated(By.css('input[aria-label="Search input"]')), 30000);
            await searchInput.sendKeys('matemática');
            await searchInput.sendKeys(Key.ENTER);

            await driver.sleep(3000);

            const link = await driver.findElement(By.xpath('//*[@id="wrap"]/div[4]/li[1]/a'));
            await link.click();
        });
    });
});