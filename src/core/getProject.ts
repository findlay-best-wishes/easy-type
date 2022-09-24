import { Application, TSConfigReader, TypeDocReader } from 'typedoc'

export interface ProjectOption {
  entryFile: string
  tsconfig: string
}

export function getTypeProject(option: ProjectOption) {
	const { entryFile, tsconfig } = option
	const app = new Application()

	// If you want TypeDoc to load tsconfig.json / typedoc.json files
	app.options.addReader(new TSConfigReader())
	app.options.addReader(new TypeDocReader())

	app.bootstrap({
		// typedoc options here
		entryPoints: [entryFile],
		entryPointStrategy: 'resolve',
		tsconfig,
	})

	const project = app.convert()
	return {
		app,
		project,
	}
}
