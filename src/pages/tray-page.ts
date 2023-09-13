import { ExperienceComponent } from '@spryker-oryx/experience';

const trayPageContent = {
    type: 'oryx-content-text',
    id: 'tray-page-content',
    content: {
        data: {
            text: `<h1>My beautiful tray page</h1>`
        },
    },
};

export const trayPage: ExperienceComponent = {
    id: "tray-page",
    type: "Page",
    meta: {
        route: "/tray",
        title: "Tray"
    },
    components: [trayPageContent]
};