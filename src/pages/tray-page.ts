import { ExperienceComponent } from '@spryker-oryx/experience';

const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjdlYzM0NmZiZDZmOTQyMGNkMTI3MGVmZGVmZmZmNzY4YjQwNTA5ZmRiNWExZWQwZjgyNGVkNDQxZTU4MTA5NWEwNDJlNzE1NGNiYjE2YjBlIiwiaWF0IjoxNjk0NjEzNDg3Ljg4MTU1MDEsIm5iZiI6MTY5NDYxMzQ4Ny44ODE1NTIsImV4cCI6MTY5NDYyMDQ0OCwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6XCJlYmY0YjU1YS1jYWIwLTVlZDAtOGZiNy01MjVhM2VlZWRlYWNcIixcImlkX2FnZW50XCI6bnVsbCxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiREUtLTIxXCIsXCJpZF9jdXN0b21lclwiOjIxLFwicGVybWlzc2lvbnNcIjp7XCJwZXJtaXNzaW9uc1wiOlt7XCJpZF9wZXJtaXNzaW9uXCI6MSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzQ5LDUwLDUxLDUyLDUzLDE0MDIwMiwxNDAyMDMsMTQwMjA0XX0sXCJrZXlcIjpcIlJlYWRTaGFyZWRDYXJ0UGVybWlzc2lvblBsdWdpblwiLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOjIsXCJjb25maWd1cmF0aW9uX3NpZ25hdHVyZVwiOlwiW11cIixcImlkX2NvbXBhbnlfcm9sZVwiOm51bGwsXCJjb25maWd1cmF0aW9uXCI6e1wiaWRfcXVvdGVfY29sbGVjdGlvblwiOls0OSw1MCw1MSw1Miw1MywxNDAyMDIsMTQwMjAzLDE0MDIwNF19LFwia2V5XCI6XCJXcml0ZVNoYXJlZENhcnRQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOlsyLDMsMTldfSxcImtleVwiOlwiUmVhZFNob3BwaW5nTGlzdFBlcm1pc3Npb25QbHVnaW5cIixcImlzX2luZnJhc3RydWN0dXJhbFwiOm51bGx9LHtcImlkX3Blcm1pc3Npb25cIjpudWxsLFwiY29uZmlndXJhdGlvbl9zaWduYXR1cmVcIjpbXSxcImlkX2NvbXBhbnlfcm9sZVwiOm51bGwsXCJjb25maWd1cmF0aW9uXCI6e1wiaWRfc2hvcHBpbmdfbGlzdF9jb2xsZWN0aW9uXCI6WzIsMywxOV19LFwia2V5XCI6XCJXcml0ZVNob3BwaW5nTGlzdFBlcm1pc3Npb25QbHVnaW5cIixcImlzX2luZnJhc3RydWN0dXJhbFwiOm51bGx9XX19Iiwic2NvcGVzIjpbImN1c3RvbWVyIl19.iphcXaaJXE6R91YdHKvOifV-HcqJe_zEUaYvNukHJR8C-hBciond5P5VfM4hnkL3G9h2ezrKOr0tLLpQf9S8yel9YgDZaf309NSyGZksqWxV-gJ3DYw3Zf4Yp6_UEyjxxRUt1LNqV9mhYpFNdQMyvbD4Q3qQj8bb_TQygCD6g-U0k2LV_yVRZoTKdgxHkFWibxgAaavw19QkDDIwHxWJK7U36K8snJPb-4IZRgEZBvBrQ7bJ1IkX3j4PCSA0QYfwnylYcsKgdAPzY5M3SJbeDeL5TFkBikI_YkpjeRA7h6MuOKzfC9bzbVKTkHWEsJQnAFEZ-0HBcKFYV0Gp-pJyJA';

const trayPagePleaseLogin = {
    type: 'oryx-content-text',
    id: 'tray-page-please-login',
    content: {
        data: {
            text: `<h1>Please login in the main window</h1>`
        },
    },
    options: {
        rules: [{ hideByRule: "USER.AUTHENTICATED" }]
    }
};

const trayPageButton = {
    type: 'oryx-content-text',
    content: {
        data: {
            text: `
          <oryx-icon type="shopping_cart" style="--oryx-icon-size: 40px;"></oryx-icon>
          <p>Go and buy something!</p><oryx-button>
          <a href="/search" target="_blank">Shop now</a></oryx-button>`,
        },
    },
    options: {
        rules: [
            { hideByRule: 'USER.!AUTHENTICATED' },
            {
                colSpan: 2,
                background: 'var(--oryx-color-neutral-3)',
                width: '66%',
                margin: 'auto',
                padding: '20px',
                radius: '4px',
                style: `display: grid;gap:14px;justify-items:center;`,
            },
        ],
    },
}

// let url = 'https://glue.de.faas-suite-prod.cloud.spryker.toys/orders/DE--8160'
// let json = await fetch(url, {
//     headers: {Authorization: token}
// }).then((response) => {
//     return response.json();
// })
// let date = text.data.attributes.createdAt;

const trayLastOrder = {
    type: 'oryx-content-text',
    content: {
        data: {
            text: `
          <oryx-icon type="order" style="--oryx-icon-size: 40px;"></oryx-icon>
          <p>Your last order was made today</p>`,
        },
    },
    options: {
        rules: [
            { hideByRule: 'USER.!AUTHENTICATED' },
            {
                colSpan: 2,
                background: 'var(--oryx-color-neutral-3)',
                width: '66%',
                margin: 'auto',
                padding: '20px',
                radius: '4px',
                style: `display: grid;gap:14px;justify-items:center;`,
            },
        ],
    },
}

export const trayPage: ExperienceComponent = {
    id: "tray-page",
    type: "Page",
    meta: {
        route: "/tray",
        title: "Tray"
    },
    components: [
        trayPagePleaseLogin,
        trayPageButton,
        trayLastOrder
    ]
};