import { Application, TSConfigReader, TypeDocReader, ContainerReflection, ProjectReflection } from 'typedoc'

interface Option {
  entryFile: string,
  tsconfig: string
}

export function getTypeProject (option: Option) {
    const { entryFile, tsconfig } = option
    const app = new Application();

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TSConfigReader());
    app.options.addReader(new TypeDocReader());

    app.bootstrap({
        // typedoc options here
        entryPoints: [entryFile],
        entryPointStrategy: 'resolve',
        tsconfig,
    });

    const project = app.convert();
    return {
      app,
      project,
    }
}