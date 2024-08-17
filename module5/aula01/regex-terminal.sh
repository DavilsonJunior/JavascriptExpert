# a partir da pasta raiz
find . -name *.test.js
find . -name *test.js -not -path '*node_modules**'
find . -name *.js -not -path '*node_modules**'

npm i -g ipt
find . -name *.js -not -path '*node_modules**' | ipt

# volta para a pasta do modulo05
cp -r ../../modulo01/aula05-tdd-desafio-resolvido

CONTENT="'use strict';"
find . -name *.js -not -páth -path '*node_modules**' \
| ipt -0 \
| xargs -I '{file}' sed -i "" -e '1s/^/\'$CONTENT'\
/g' {file}
