import { ExperienceComponent } from '@spryker-oryx/experience';

const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6ImU5ZmVhYTZmYjc3ZWY5YThmYmQyMTFkMmM0NjlkMzJkZGNlZGYwMDRiYzA1Y2Y4OGM3NzU3Njg3MmE3ZmUxODhlNWQ1MDNhMmRlMjMwNjBhIiwiaWF0IjoxNjk0NjI1ODc4LjM0MTg4MiwibmJmIjoxNjk0NjI1ODc4LjM0MTg4NTEsImV4cCI6MTY5NDY0OTMzOSwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6XCJlYmY0YjU1YS1jYWIwLTVlZDAtOGZiNy01MjVhM2VlZWRlYWNcIixcImlkX2FnZW50XCI6bnVsbCxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiREUtLTIxXCIsXCJpZF9jdXN0b21lclwiOjIxLFwicGVybWlzc2lvbnNcIjp7XCJwZXJtaXNzaW9uc1wiOlt7XCJpZF9wZXJtaXNzaW9uXCI6MSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzQ5LDUwLDUxLDUyLDUzLDE0MDM5MCwxNDAzOTIsMTQwMzkzLDE0MDM5NSwxNDAzOTYsMTQwMzk3LDE0MDM5OCwxNDA0MDAsMTQwNDAxLDE0MDQwMiwxNDA0MDcsMTQwNDA4LDE0MDQwOSwxNDA0MjYsMTQwNDI3LDE0MDQyOCwxNDA0MjksMTQwNDMwLDE0MDQzMSwxNDA0MzQsMTQwNDM3LDE0MDQzOCwxNDA0MzksMTQwNDQ0LDE0MDQ0NSwxNDA1NDEsMTQwNTQ2LDE0MDU0NywxNDA1NzksMTQwNTgwLDE0MDU4MSwxNDA1ODIsMTQwNTg0LDE0MDU4NiwxNDA1ODcsMTQwNTg5LDE0MDU5MCwxNDA1OTIsMTQwNTkzLDE0MDU5NCwxNDA1OTUsMTQwNTk2LDE0MDU5NywxNDA1OTgsMTQwNTk5LDE0MDYwMCwxNDA2MDEsMTQwNjE2LDE0MDYxOCwxNDA3MzYsMTQwNzM4LDE0MDczOSwxNDA3NDAsMTQwNzQxLDE0MDc0MiwxNDA3NDMsMTQwNzQ0LDE0MDc0NSwxNDA3NDYsMTQwNzQ3LDE0MDc0OCwxNDA3NDksMTQwNzUwLDE0MDc1MSwxNDA3NTIsMTQwNzU0LDE0MDc1NSwxNDA3NTYsMTQwNzU3LDE0MDc1OCwxNDA3NTksMTQwNzYwLDE0MDc2MSwxNDA3NjIsMTQwNzYzLDE0MDc2NCwxNDA3ODksMTQwNzkxLDE0MDc5MiwxNDA3OTMsMTQwNzk0LDE0MDc5NSwxNDA3OTYsMTQwNzk3LDE0MDc5OCwxNDA3OTksMTQwODAwLDE0MDgwMSwxNDA4MDIsMTQwODAzLDE0MDgwNCwxNDA4MDUsMTQwODA2LDE0MDgwNywxNDA4MDksMTQwODEyLDE0MDgxMywxNDA4MTQsMTQwODE1LDE0MDgxNiwxNDA4MTcsMTQwODE5LDE0MDgyMCwxNDA4MjEsMTQwODIyLDE0MDgyMywxNDA4MjUsMTQwODI2LDE0MDgyNywxNDA4MjgsMTQwODI5LDE0MDgzMCwxNDA4MzEsMTQwODMyLDE0MDgzMywxNDA4MzQsMTQwODM2LDE0MDgzNywxNDA4MzgsMTQwODM5LDE0MDg0MCwxNDA4NDEsMTQwODQyLDE0MDg0MywxNDA4NDQsMTQwODQ1LDE0MDg0NiwxNDA4NDcsMTQwODQ4LDE0MDg0OSwxNDA4NTAsMTQwODUxLDE0MDg1MiwxNDA4NTMsMTQwODU0LDE0MDg1NSwxNDA4NjcsMTQwODY5LDE0MDg3MCwxNDA4NzEsMTQwODcyLDE0MDg3MywxNDA4NzQsMTQwODc1LDE0MDg3NiwxNDA4NzcsMTQwODc4LDE0MDkwMiwxNDA5MDMsMTQwOTA0LDE0MDkwNSwxNDA5MDYsMTQwOTA3LDE0MDkxMCwxNDA5MTEsMTQwOTEyLDE0MDkxMywxNDA5MTQsMTQxMDg0LDE0MTA4NSwxNDEwODYsMTQxMDg3LDE0MTA4OCwxNDEwODldfSxcImtleVwiOlwiUmVhZFNoYXJlZENhcnRQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6MixcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6XCJbXVwiLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzQ5LDUwLDUxLDUyLDUzLDE0MDM5MCwxNDAzOTIsMTQwMzkzLDE0MDM5NSwxNDAzOTYsMTQwMzk3LDE0MDM5OCwxNDA0MDAsMTQwNDAxLDE0MDQwMiwxNDA0MDcsMTQwNDA4LDE0MDQwOSwxNDA0MjYsMTQwNDI3LDE0MDQyOCwxNDA0MjksMTQwNDMwLDE0MDQzMSwxNDA0MzQsMTQwNDM3LDE0MDQzOCwxNDA0MzksMTQwNDQ0LDE0MDQ0NSwxNDA1NDEsMTQwNTQ2LDE0MDU0NywxNDA1NzksMTQwNTgwLDE0MDU4MSwxNDA1ODIsMTQwNTg0LDE0MDU4NiwxNDA1ODcsMTQwNTg5LDE0MDU5MCwxNDA1OTIsMTQwNTkzLDE0MDU5NCwxNDA1OTUsMTQwNTk2LDE0MDU5NywxNDA1OTgsMTQwNTk5LDE0MDYwMCwxNDA2MDEsMTQwNjE2LDE0MDYxOCwxNDA3MzYsMTQwNzM4LDE0MDczOSwxNDA3NDAsMTQwNzQxLDE0MDc0MiwxNDA3NDMsMTQwNzQ0LDE0MDc0NSwxNDA3NDYsMTQwNzQ3LDE0MDc0OCwxNDA3NDksMTQwNzUwLDE0MDc1MSwxNDA3NTIsMTQwNzU0LDE0MDc1NSwxNDA3NTYsMTQwNzU3LDE0MDc1OCwxNDA3NTksMTQwNzYwLDE0MDc2MSwxNDA3NjIsMTQwNzYzLDE0MDc2NCwxNDA3ODksMTQwNzkxLDE0MDc5MiwxNDA3OTMsMTQwNzk0LDE0MDc5NSwxNDA3OTYsMTQwNzk3LDE0MDc5OCwxNDA3OTksMTQwODAwLDE0MDgwMSwxNDA4MDIsMTQwODAzLDE0MDgwNCwxNDA4MDUsMTQwODA2LDE0MDgwNywxNDA4MDksMTQwODEyLDE0MDgxMywxNDA4MTQsMTQwODE1LDE0MDgxNiwxNDA4MTcsMTQwODE5LDE0MDgyMCwxNDA4MjEsMTQwODIyLDE0MDgyMywxNDA4MjUsMTQwODI2LDE0MDgyNywxNDA4MjgsMTQwODI5LDE0MDgzMCwxNDA4MzEsMTQwODMyLDE0MDgzMywxNDA4MzQsMTQwODM2LDE0MDgzNywxNDA4MzgsMTQwODM5LDE0MDg0MCwxNDA4NDEsMTQwODQyLDE0MDg0MywxNDA4NDQsMTQwODQ1LDE0MDg0NiwxNDA4NDcsMTQwODQ4LDE0MDg0OSwxNDA4NTAsMTQwODUxLDE0MDg1MiwxNDA4NTMsMTQwODU0LDE0MDg1NSwxNDA4NjcsMTQwODY5LDE0MDg3MCwxNDA4NzEsMTQwODcyLDE0MDg3MywxNDA4NzQsMTQwODc1LDE0MDg3NiwxNDA4NzcsMTQwODc4LDE0MDkwMiwxNDA5MDMsMTQwOTA0LDE0MDkwNSwxNDA5MDYsMTQwOTA3LDE0MDkxMCwxNDA5MTEsMTQwOTEyLDE0MDkxMywxNDA5MTQsMTQxMDg0LDE0MTA4NSwxNDEwODYsMTQxMDg3LDE0MTA4OCwxNDEwODldfSxcImtleVwiOlwiV3JpdGVTaGFyZWRDYXJ0UGVybWlzc2lvblBsdWdpblwiLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOm51bGwsXCJjb25maWd1cmF0aW9uX3NpZ25hdHVyZVwiOltdLFwiaWRfY29tcGFueV9yb2xlXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9zaG9wcGluZ19saXN0X2NvbGxlY3Rpb25cIjpbMiwzLDE5XX0sXCJrZXlcIjpcIlJlYWRTaG9wcGluZ0xpc3RQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6bnVsbCxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOlsyLDMsMTldfSxcImtleVwiOlwiV3JpdGVTaG9wcGluZ0xpc3RQZXJtaXNzaW9uUGx1Z2luXCIsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfV19fSIsInNjb3BlcyI6WyJjdXN0b21lciJdfQ.StElBqrIP4rX84Go5pmabe_hg7EUISw2j3_9Tr9QaKQEH_zUwPrYxRrMV6xNKMffMqDMv60Prv-jcVrQOYpRMb5PrHkzsSrkXq9P8cuXIe2SQR1LgKrfi9z9T_zyISwDmG9QevdtQ41zxnq8jxOdrgm_LAE6NNK-OnEEUwTtnWHQT1B4qkTLIa0REtAwwrQqaUA8mydXhfy5C8y19NmwhzGQib7TN-76cquJ5_y6tTPt9gxVp-85UNMIz9o-2U_bbopPGOiBMRIrBqNkp7S1YF2qr2WXSuBd9oLbnuWysP_8tgF3lerVfZwQaSuOMgBQsSAqJgSL8GnAUNU6JMJEHA';

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