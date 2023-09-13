import {appBuilder} from '@spryker-oryx/application';
import {storefrontFeatures} from '@spryker-oryx/presets/storefront';
import {storefrontTheme} from '@spryker-oryx/themes';
import {AppInitializer} from '@spryker-oryx/core';
import {RouterService} from '@spryker-oryx/router';
import {inject} from '@spryker-oryx/di';
import {provideExperienceData} from "@spryker-oryx/experience";
import {trayPage} from "./pages/tray-page.js";

class HideHeaderWorkaround implements AppInitializer {

    constructor(protected router = inject(RouterService)) {
    }

    initialize(): void {

        this.router.currentRoute().subscribe(async (route) => {
            if (route != '/tray') {
                return;
            }

            await customElements.whenDefined('oryx-app');
            setTimeout(() => {
                document.querySelector('oryx-app')?.shadowRoot.querySelectorAll<HTMLElement>('[uid=header]').forEach(
                    c => {
                        c.style.display = 'none'
                    }
                )

                document.querySelector('oryx-app')?.shadowRoot.querySelectorAll<HTMLElement>('[uid=footer]').forEach(
                    c => {
                        c.style.display = 'none'
                    }
                )
            }, 0)

        })

        return undefined;
    }

}


export const app = appBuilder()
    .withFeature(storefrontFeatures)
    .withProviders([
        provideExperienceData(trayPage),
        {
            provide: AppInitializer,
            useClass: HideHeaderWorkaround
        }
    ])
    .withTheme(storefrontTheme)
    .withEnvironment(import.meta.env)
    .create();
