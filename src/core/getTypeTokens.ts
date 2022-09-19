import { readFile, rm } from 'fs/promises';
import { Application, TSConfigReader, TypeDocReader, ContainerReflection } from 'typedoc'

interface Option {
  entryFile: string,
  tsconfig: string
}
export async function getTypeTokens (option: Option): Promise<ContainerReflection | null> {
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

    if (project) {
        const outputFileName = 'typeToken.json'
        await app.generateJson(project, outputFileName);
        return import(outputFileName)
          .then((result) => {
            rm(outputFileName)
            return JSON.parse(result.toString())
          })
    }
    return null
}