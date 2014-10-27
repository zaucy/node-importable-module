var Module = module.constructor;

function ImportableModule() {}
ImportableModule.prototype = Object.create(Module.prototype);
ImportableModule.prototype.imports = {};
ImportableModule.prototype._compile = function(src, filename) {
	if(this.imports) {
		var preSrc = [], name;
		for(name in this.imports)
			preSrc.push(name+"=module.imports."+name);
		
		if(preSrc.length > 0)
			src = "var " + preSrc.join() + ";" + src;
	}
	
	Module.prototype._compile.call(this, src, filename);
};

module.exports = ImportableModule;