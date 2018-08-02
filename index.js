// var Mermaid = require("mermaid");
module.exports = {
  book: {
    assets: './assets',
    js: [
      'mermaid.min.js',
      'mermaid_init.js'
    ],
  },
  blocks: {
    code: function (block) {
      var lang = block.kwargs.language;
      if (lang === 'mermaid') {
        console.warn(block.body);
        body = '<div class="mermaid">\n' + block.body + '</div>';
        console.warn(body);
        return body;
      }
      return block.body;
    }
  },
  hooks: {
    'page': function (page) {
      var _js = `
      <script>
        var tag_init_timeout = '';
        function mermaid_init_timetou() {
          try {
            mermaid_init();
            clearTimeout(tag_init_timeout);
          } catch (e) {
            tag_init_timeout = setTimeout('mermaid_init_timetou();', 1000);
          }
        }
        mermaid_init_timetou();
      </script>`;
      page.content = page.content + _js;
      return page;
    }
  }
};
