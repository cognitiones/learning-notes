import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "learning-notes",
  description: "learning-notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'typescript', link: '/typescript/question-bank' }
    ],

    sidebar: [
      {
        text: 'learn-typescript',
        items: [
          { text: '题库', link: '/typescript/question-bank' },
          { text: '简单', link: '/typescript/easy' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
