import { readFile, rm } from 'fs/promises';
import TypeDoc, { ContainerReflection } from 'typedoc'

interface Option {
  entryFile: string
}
export async function getTypeTokens (option: Option): Promise<ContainerReflection | null> {
    const { entryFile } = option
    const app = new TypeDoc.Application();

    // If you want TypeDoc to load tsconfig.json / typedoc.json files
    app.options.addReader(new TypeDoc.TSConfigReader());
    app.options.addReader(new TypeDoc.TypeDocReader());

    app.bootstrap({
        // typedoc options here
        entryPoints: [entryFile],
        entryPointStrategy: 'resolve'
    });

    const project = app.convert();

    if (project) {
        const outputFileName = 'typeToken.json'
        await app.generateJson(project, outputFileName);
        return readFile(outputFileName)
          .then((result) => {
            rm(outputFileName)
            return JSON.parse(result.toString())
          })
    }
    return null
}