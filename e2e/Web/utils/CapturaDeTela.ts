import { Page } from '@playwright/test';

export class CapturaDeTela {

    static async tirar(page: Page, nome: string) {
        await page.screenshot({ path: `./evidencias/${nome}.png`, fullPage: true });
    }
}
