/* eslint-disable */
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import mdKatex from '@traptitech/markdown-it-katex'

function highlightBlock (str: string, lang?: string): string {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${ lang ?? '' }</span></div><code class="hljs code-block-body ${ lang ?? '' }">${ str }</code></pre>`
}

const mdi = new MarkdownIt({
  linkify: true,
  highlight (code, language) {
    const validLang = (language && (hljs.getLanguage(language) != null)) as boolean
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  }
})
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

export default mdi
