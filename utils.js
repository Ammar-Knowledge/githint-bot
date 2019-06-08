const request = require('request-promise-native');
const vm = require('vm');

module.exports = {
  async getPrlintFile(owner, repo, branch) {
    try {
      let data = await request({
        url: `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/.prlint`,
        method: 'GET'
      });
      return { data: JSON.parse(data) };
    } catch (error) {
      return { error };
    }
  },
  async runScript(source, scope) {
    try {
      const script = new vm.Script(`(function(){${source}})()`);
      const context = new vm.createContext(scope);
      let data = script.runInContext(context);
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
