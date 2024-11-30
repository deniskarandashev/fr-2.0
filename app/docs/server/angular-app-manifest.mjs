
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  routes: undefined,
  assets: new Map([
['index.csr.html', {size: 14672, hash: '71f92af88a440e6a62f09e92978c6c0ad353a95a569b7315be5c130783fa1f09', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)}], 
['index.server.html', {size: 8246, hash: '2519dd2b016966256272ef993ddabdb4034bbf49e4889ee20f6404cc4dca42b8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}], 
['styles-CXQUZ3PB.css', {size: 6979, hash: 'mYIPdabeAag', text: () => import('./assets-chunks/styles-CXQUZ3PB_css.mjs').then(m => m.default)}]
]),
  locale: undefined,
};
