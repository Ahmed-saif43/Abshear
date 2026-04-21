window.Import = async funcarg=>{
    for (let arg of funcarg) {
        let collector = 0
          , IntialFunc = parentfunctionName.filter(val=>{
            val.funcname == arg.moduleName && (collector = 1)
        }
        );
        0 == collector && (parentfunctionName.push(arg),
        myparent.push(JSON.parse(JSON.stringify(arg))));
        const moduleRoot = new URL(`../assets/${module}${arg.moduleName}/`, import.meta.url)
          , path = new URL(`${arg.moduleName}.js?v=${moduleVersion}`, moduleRoot)
          , absolutePath = moduleRoot.href;
        try {
            const {default: defaultImport} = await import(path.href);
            defaultImport(arg.moduleName, arg.param, absolutePath, arg.json, arg.action)
        } catch (error) {
            console.warn(`Module "${arg.moduleName}" could not be loaded locally.`, error);
        }
    }
}
,
window.func = async funcarg=>{
    let IntialFunc = parentfunctionName.filter((val,index)=>{
        funcarg.moduleName == val.moduleName && (parentfunctionName.splice(index, 1),
        parentfunctionName.push(funcarg))
    }
    )
      , f = JSON.parse(JSON.stringify(funcarg));
    const moduleRoot = new URL(`../assets/${module}${f.moduleName}/`, import.meta.url)
      , path = new URL(`${f.moduleName}.js?v=${moduleVersion}`, moduleRoot)
      , absolutePath = moduleRoot.href;
    try {
        const {default: defaultImport} = await import(path.href);
        defaultImport(f.moduleName, f.param, absolutePath, f.json, f.action, "rebuild")
    } catch (error) {
        console.warn(`Module "${f.moduleName}" rebuild was skipped in local preview.`, error);
    }
}
;
