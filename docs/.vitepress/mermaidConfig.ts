const mermaidThemeVariables = {
  background: 'transparent',
  primaryColor: '#fff8ec',
  primaryTextColor: '#20242c',
  primaryBorderColor: '#f39c12',
  secondaryColor: '#ffffff',
  secondaryTextColor: '#20242c',
  secondaryBorderColor: '#aeb7c4',
  tertiaryColor: '#ffffff',
  tertiaryTextColor: '#20242c',
  tertiaryBorderColor: '#aeb7c4',
  lineColor: '#b96f06',
  textColor: '#20242c',
  mainBkg: '#fff8ec',
  nodeBorder: '#f39c12',
  edgeLabelBackground: '#fff8ec',
  labelTextColor: '#20242c',
  labelBoxBkgColor: '#fff8ec',
  labelBoxBorderColor: '#f39c12',
  clusterBkg: '#f8fafc',
  clusterBorder: '#d3dae4',
  titleColor: '#20242c',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
}

export const mermaidDarkThemeVariables = {
  clusterBkg: '#22252c',
  clusterBorder: '#4b5563',
  titleColor: '#edede8',
}

export const mermaidConfig = {
  securityLevel: 'loose',
  startOnLoad: false,
  theme: 'base',
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    curve: 'basis',
    diagramPadding: 12,
    nodeSpacing: 36,
    rankSpacing: 38,
  },
  themeVariables: mermaidThemeVariables,
}
