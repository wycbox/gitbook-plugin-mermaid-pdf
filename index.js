const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');
var os = require('os');
var isWin = /^win/.test(process.platform);
const binPath = isWin ? path.join(__dirname, "../.bin/mmdc.cmd") : path.join(__dirname, "../.bin/mmdc");

function _string2svgAsync(mmdString) {
  const filename = 'foo' + crypto.randomBytes(4).readUInt32LE(0) + 'bar';
  const tmpFile = path.join(os.tmpdir(), filename);
  return new Promise((resolve, reject) => {
    fs.writeFile(tmpFile, mmdString, function (err) {
      if (err) {
        return console.error(err);
      }
      childProcess.execFile(binPath, ['-t', 'forest', '-i', tmpFile], function (err, stdout, stderr) {
        if (err || stderr) {
          console.error("err=");
          console.error(err || stderr);
          fs.unlinkSync(tmpFile);
          reject(err || stderr);
        } else {
          const text = fs.readFileSync(tmpFile + '.svg', 'utf8');
          fs.unlinkSync(tmpFile);
          fs.unlinkSync(tmpFile + '.svg');
          var trim = text.trim();
          resolve("\n<!--mermaid-->\n<div>\n" + trim + "\n</div>\n<!--endmermaid-->\n\n");
        }
      });
    });
  });
}

module.exports = {
  string2svgAsync: _string2svgAsync,
  blocks: {
    mermaid: {
      process: function (block) {
        var body = block.body;
        var src = block.kwargs.src;
        if (src) {
          var relativeSrcPath = url.resolve(this.ctx.file.path, src);
          var absoluteSrcPath = decodeURI(path.resolve(this.book.root, relativeSrcPath));
          body = fs.readFileSync(absoluteSrcPath, 'utf8');
        }
        return _string2svgAsync(body);
      }
    }
  }, hooks: {
    // from gitbook-plugin-mermaid-gb3
    'page:before': async function processMermaidBlockList(page) {
      var mermaidRegex = /^(\s*)```mermaid((.*[\r\n]+)+?)?(\s*)```$/im;
      var match;

      while ((match = mermaidRegex.exec(page.content))) {
        var rawBlock = match[0];
        var mermaidContent_1 = match[1];
        var mermaidContent_2 = match[2];
        var mermaidContent_4 = match[4];
        const processed = mermaidContent_1 + "{% mermaid %}\n" + mermaidContent_2 + mermaidContent_4 + "{% endmermaid %}\n";
        page.content = page.content.replace(rawBlock, processed);
      }
      return page;
    }
  }
};