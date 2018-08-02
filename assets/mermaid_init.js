function mermaid_init() {
  mermaid.initialize({
    theme: 'neutral',
    logLevel: 3,
    flowchart: { curve: 'linear' },
    gantt: { axisFormat: '%m/%d/%Y' },
    sequence: { actorMargin: 50 },
  });
  mermaid.init();
}

mermaid_init();
