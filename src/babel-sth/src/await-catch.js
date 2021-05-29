const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');
const core = require('@babel/core')

const sourceCode = `async function test(){
 await Promise.reject({message: error})
}`

// const sourceCode = `async function test () {
//   try{
//   await Promise.reject('err')
//   }catch(e){
//   	console.log(e)
//   }
// }`

const consoleCode = "(e)=> console.log(`catch error: ${e}`)"

const ast = parser.parse(sourceCode)
const catchNode = parser.parse(consoleCode).program.body

traverse(ast, {
  AwaitExpression(path) {
    console.log("🚀 ~ file: await-catch.js ~ line 26 ~ AwaitExpression ~ path", path.parentPath.parentPath.parentPath.node)
    if (types.isTryStatement(path.parentPath.parentPath.parentPath.node)) {
      console.log('here')
      return
    } else {
      console.log('out')
      let tryCatchAst = types.tryStatement(
        types.blockStatement([
          types.expressionStatement(path.node)
        ]),
        types.catchClause(
          types.identifier('e'),
          types.blockStatement(catchNode)
        )
      );
      console.log(tryCatchAst, 'tryCatchAst')
      path.replaceWithMultiple([tryCatchAst]);
      return
    }
  }
})
const a = core.transformFromAstSync(ast).code
console.log("🚀 ~ file: await-catch.js ~ line 37 ~ a", a)
// const { code, map } = generate(ast);
// console.log(code);