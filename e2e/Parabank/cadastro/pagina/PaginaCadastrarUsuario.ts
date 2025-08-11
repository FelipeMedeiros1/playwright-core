import { Locator, Page } from '@playwright/test';
import { PaginaBase } from '../../../Web/base/PaginaBase';
import { definirSessao } from '../../utils/SessaoDeUsuario';
import { GeradorDeDados } from '../../../Web/utils/GeradorDeDados';

export default class PaginaCadastrarUsuario extends PaginaBase {
    protected readonly linkCadastrar: Locator;
    protected readonly message: Locator;
    protected readonly firstName: Locator;
    protected readonly lastName: Locator;
    protected readonly street: Locator;
    protected readonly city: Locator;
    protected readonly state: Locator;
    protected readonly zipCode: Locator;
    protected readonly phoneNumber: Locator;
    protected readonly ssn: Locator;
    protected readonly username: Locator;
    protected readonly password: Locator;
    protected readonly repeatedPassword: Locator;
    protected readonly Register: Locator;
    protected readonly messageSuccess: Locator;
    protected readonly deslogar: Locator;


    constructor(pagina: Page) {
        super(pagina);
        this.linkCadastrar = pagina.getByRole('link', { name: 'Register' });
        this.message = pagina.getByRole('heading', { name: 'Signing up is easy!' });
        this.firstName = pagina.locator('[id="customer.firstName"]');
        this.lastName = pagina.locator('[id="customer.lastName"]');
        this.street = pagina.locator('[id="customer.address.street"]');
        this.city = pagina.locator('[id="customer.address.city"]');
        this.state = pagina.locator('[id="customer.address.state"]');
        this.zipCode = pagina.locator('[id="customer.address.zipCode"]');
        this.phoneNumber = pagina.locator('[id="customer.phoneNumber"]');
        this.ssn = pagina.locator('[id="customer.ssn"]');
        this.username = pagina.locator('[id="customer.username"]');
        this.password = pagina.locator('[id="customer.password"]');
        this.repeatedPassword = pagina.locator('#repeatedPassword');
        this.Register = pagina.getByRole('button', { name: 'Register' });
        this.messageSuccess = pagina.getByText('Your account was created');
        this.deslogar = pagina.getByRole('link', { name: 'Log Out' });

    }

    async acessar() {
        await this.acessarUrl('/');
        await this.botao.duploClique(this.linkCadastrar);
        await this.assertiva.contemTexto(this.message, 'Signing up is easy!');
    }

    async preencherDados<GeradorDeDados>(dados) {
        await this.preencherDadosPerfil(dados);
        await this.preencherCredenciaiss(dados);

        return await this.preencherCredenciaiss(dados);

    }
    async preencherDadosPerfil(dados: GeradorDeDados) {
        await this.caixaTexto.preencherCampo(this.firstName, dados.nome());
        await this.caixaTexto.preencherCampo(this.lastName, dados.sobrenome());
        await this.caixaTexto.preencherCampo(this.street, dados.nomeDaRua());
        await this.caixaTexto.preencherCampo(this.city, dados.cidade());
        await this.caixaTexto.preencherCampo(this.state, dados.estado());
        await this.caixaTexto.preencherCampo(this.zipCode, dados.cep());
        await this.caixaTexto.preencherCampo(this.phoneNumber, dados.telefoneCelular());
    }

    async preencherCredenciaiss(dados: GeradorDeDados): Promise<{ usuario: string; senha: string }> {
        const nome = dados.nome();
        const usuario = `${nome}_${Math.floor(Math.random() * 1000)}`;
        const senha = `Qa${dados.senha().slice(0, 4)}${Date.now().toString().slice(-5)}`;

        await this.caixaTexto.preencherCampo(this.ssn, dados.cpf());
        await this.caixaTexto.preencherCampo(this.username, usuario);
        await this.caixaTexto.preencherCampo(this.password, senha);
        await this.caixaTexto.preencherCampo(this.repeatedPassword, senha);

        return { usuario, senha };

    }

    async executar() {
        await this.acessar();
        const dadosSessao = new GeradorDeDados();
        const credenciais = await this.preencherDados(dadosSessao);
        await this.botao.duploClique(this.Register);
        await this.assertiva.contemTexto(this.messageSuccess, 'Your account was created successfully. You are now logged in.');
        await this.botao.clicar(this.deslogar);

        definirSessao(credenciais);
    }
}
