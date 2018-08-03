# Mermaid plugin for GitBook

Plugin for [GitBook](https://github.com/GitbookIO/gitbook) 3 which renders [Mermaid](https://github.com/knsv/mermaid) diagrams and flow charts detected in the book markdown.

## How to install it

```bash
npm install -g mermaid.cli
```

And use it for your book with in the book.json:

```json
{
  "plugins": ["mermaid-flow"]
}
```

## How to use it

Just put the code into fenced code block and tag it **mermaid** key word like this:

    ```mermaid
    graph TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
    ```
