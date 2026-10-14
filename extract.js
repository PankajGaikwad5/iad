const fs = require('fs');
const content = fs.readFileSync('C:\\projects\\iad\\Studio Ia.D (1).html', 'utf-8');
const script = content.substring(content.lastIndexOf('<script>'));
const cleanScript = script.replace(/"data:image\/jpeg;base64[^"]+"/g, '"IMAGE"').replace(/"data:image\/png;base64[^"]+"/g, '"IMAGE"');
fs.writeFileSync('C:\\projects\\iad\\studio-iad\\extracted_script.js', cleanScript);
