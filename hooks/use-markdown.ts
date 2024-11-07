import markdownit from 'markdown-it'


const md = markdownit()


export default function useMarkdown (content : string) {
    const html = md.render(content);

    return html
}